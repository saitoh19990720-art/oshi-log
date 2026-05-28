#!/usr/bin/env node
// Safe-publish payload validator. Exit 0 on pass, 1 on fail.
// Usage: node publish/validate.mjs <payload.json> [schema.json]
import fs from "node:fs";
import path from "node:path";

const [, , payloadPath, schemaPath = "publish/schema.json"] = process.argv;
if (!payloadPath) {
  console.error("usage: node publish/validate.mjs <payload.json>");
  process.exit(2);
}

const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

const errors = [];

function fail(msg) { errors.push(msg); }

function checkType(value, type) {
  if (type === "array") return Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  return typeof value === type;
}

function validate(node, sch, where = "$") {
  if (sch.type && !checkType(node, sch.type)) {
    fail(`${where}: expected ${sch.type}, got ${Array.isArray(node) ? "array" : typeof node}`);
    return;
  }
  if (sch.enum && !sch.enum.includes(node)) {
    fail(`${where}: must be one of ${JSON.stringify(sch.enum)}`);
  }
  if (sch.const !== undefined && node !== sch.const) {
    fail(`${where}: must equal ${JSON.stringify(sch.const)}`);
  }
  if (sch.pattern && typeof node === "string" && !new RegExp(sch.pattern).test(node)) {
    fail(`${where}: does not match /${sch.pattern}/`);
  }
  if (sch.minLength != null && typeof node === "string" && node.length < sch.minLength) {
    fail(`${where}: minLength ${sch.minLength}`);
  }
  if (sch.maxLength != null && typeof node === "string" && node.length > sch.maxLength) {
    fail(`${where}: maxLength ${sch.maxLength}`);
  }
  if (sch.minimum != null && typeof node === "number" && node < sch.minimum) {
    fail(`${where}: minimum ${sch.minimum}`);
  }
  if (sch.maximum != null && typeof node === "number" && node > sch.maximum) {
    fail(`${where}: maximum ${sch.maximum}`);
  }
  if (sch.minItems != null && Array.isArray(node) && node.length < sch.minItems) {
    fail(`${where}: minItems ${sch.minItems}`);
  }
  if (sch.type === "object") {
    for (const r of sch.required ?? []) {
      if (!(r in node)) fail(`${where}: missing required key "${r}"`);
    }
    if (sch.additionalProperties === false && sch.properties) {
      for (const k of Object.keys(node)) {
        if (!(k in sch.properties)) fail(`${where}: unexpected key "${k}"`);
      }
    }
    for (const [k, sub] of Object.entries(sch.properties ?? {})) {
      if (k in node) validate(node[k], resolveRef(sub), `${where}.${k}`);
    }
  }
  if (sch.type === "array" && sch.items) {
    node.forEach((v, i) => validate(v, resolveRef(sch.items), `${where}[${i}]`));
  }
  if (sch.allOf) {
    for (const sub of sch.allOf) {
      if (sub.if) {
        const matches = nodeMatches(node, sub.if);
        if (matches && sub.then) validate(node, sub.then, where);
        if (!matches && sub.else) validate(node, sub.else, where);
      } else {
        validate(node, sub, where);
      }
    }
  }
}

function resolveRef(sch) {
  if (sch.$ref) {
    const key = sch.$ref.replace("#/$defs/", "");
    return schema.$defs?.[key] ?? {};
  }
  return sch;
}

function nodeMatches(node, ifSch) {
  for (const r of ifSch.required ?? []) {
    if (!(r in node)) return false;
  }
  for (const [k, sub] of Object.entries(ifSch.properties ?? {})) {
    if (sub.const !== undefined && node[k] !== sub.const) return false;
  }
  return true;
}

// Schema check
validate(payload, schema);

// Business rules
if (payload.confirm_required === false && !payload.signature) {
  fail("$.signature: required when confirm_required=false");
}
if (payload.confirm_required === true && payload.signature) {
  fail("$.signature: must NOT be set while confirm_required=true (signing happens only after human approval)");
}
const seen = new Set();
for (const [i, a] of (payload.asset_manifest ?? []).entries()) {
  if (seen.has(a.asset_id)) fail(`$.asset_manifest[${i}].asset_id: duplicate "${a.asset_id}"`);
  seen.add(a.asset_id);
}

if (errors.length) {
  console.error("Publish payload INVALID:");
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log(`Publish payload OK: ${path.basename(payloadPath)}`);
