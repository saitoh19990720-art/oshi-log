// Oshi-Log Template Generator — Figma Plugin (TypeScript)
// Build: tsc code.ts --target es2017 --lib es2017,dom --out code.js
// Wire via manifest.json (main: "code.js", ui: "ui.html").

type ExportProfile = "A5" | "GoodNotes" | "BOOTH";

interface Preset {
  id: string;
  label: string;
  name: string;
  birthday: string;
  palette: [string, string, string];
  tone: string;
  tags: string[];
  exportProfile: ExportProfile;
}

interface GenerateMessage {
  type: "generate";
  preset: Preset;
  variants: number;
}

figma.showUI(__html__, { width: 360, height: 520 });

figma.ui.onmessage = async (msg: GenerateMessage | { type: "cancel" }) => {
  if (msg.type === "cancel") {
    figma.closePlugin();
    return;
  }
  if (msg.type === "generate") {
    try {
      const created = await generateOshiLog(msg.preset, Math.max(1, Math.min(msg.variants, 5)));
      figma.viewport.scrollAndZoomIntoView(created);
      figma.notify(`Oshi-Log: ${created.length} frame(s) created`);
    } catch (e) {
      figma.notify(`failed: ${(e as Error).message}`, { error: true });
    }
  }
};

const A5 = { w: 1240, h: 1754 }; // ~A5 @ 200dpi-ish, ratio is what matters

async function generateOshiLog(preset: Preset, variants: number): Promise<FrameNode[]> {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const frames: FrameNode[] = [];
  for (let i = 0; i < variants; i++) {
    const palette = rotatePalette(preset.palette, i);
    const frame = buildFrame(preset, palette, i + 1);
    figma.currentPage.appendChild(frame);
    frame.x = i * (A5.w + 80);
    frame.y = 0;
    frames.push(frame);
  }
  figma.currentPage.selection = frames;
  return frames;
}

function buildFrame(preset: Preset, palette: [string, string, string], index: number): FrameNode {
  const frame = figma.createFrame();
  frame.name = `Oshi-Log/${preset.exportProfile}/v${index}`;
  frame.resize(A5.w, A5.h);
  frame.fills = [{ type: "SOLID", color: hexToRgb(palette[0]) }];
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisSizingMode = "FIXED";
  frame.counterAxisSizingMode = "FIXED";
  frame.paddingTop = 96;
  frame.paddingBottom = 96;
  frame.paddingLeft = 80;
  frame.paddingRight = 80;
  frame.itemSpacing = 32;

  frame.appendChild(buildHero(preset, palette));
  frame.appendChild(buildStats(preset, palette));
  frame.appendChild(buildChecklist(palette));
  frame.appendChild(buildNotes(palette));
  frame.appendChild(buildMeta(preset, palette));

  // Export settings
  frame.exportSettings = exportSettingsFor(preset.exportProfile);
  return frame;
}

function buildHero(preset: Preset, palette: [string, string, string]): FrameNode {
  const f = autoColumn("Hero", palette[1], 12);
  const name = text(preset.name || "—", 64, "Bold", palette[2]);
  const sub = text(captionFor(preset.tone), 22, "Regular", palette[2]);
  sub.opacity = 0.7;
  f.appendChild(name);
  f.appendChild(sub);
  return f;
}

function buildStats(preset: Preset, palette: [string, string, string]): FrameNode {
  const f = autoColumn("Stats", palette[1], 8);
  f.appendChild(text(`Birthday: ${preset.birthday || "—"}`, 20, "Regular", palette[2]));
  f.appendChild(text(`Tone: ${preset.tone}`, 20, "Regular", palette[2]));
  f.appendChild(text(`Tags: ${preset.tags.join(" ") || "—"}`, 20, "Regular", palette[2]));
  return f;
}

function buildChecklist(palette: [string, string, string]): FrameNode {
  const f = autoColumn("Checklist", palette[1], 6);
  for (const label of ["□ 現場", "□ 配信", "□ 物販", "□ チェキ"]) {
    f.appendChild(text(label, 22, "Regular", palette[2]));
  }
  return f;
}

function buildNotes(palette: [string, string, string]): FrameNode {
  const f = autoColumn("Notes", palette[1], 4);
  const lineFill: SolidPaint = { type: "SOLID", color: hexToRgb(palette[2]), opacity: 0.18 };
  for (let i = 0; i < 14; i++) {
    const line = figma.createRectangle();
    line.resize(A5.w - 160, 1);
    line.fills = [lineFill];
    f.appendChild(line);
    if (i < 13) {
      const spacer = figma.createFrame();
      spacer.resize(1, 24);
      spacer.fills = [];
      f.appendChild(spacer);
    }
  }
  return f;
}

function buildMeta(preset: Preset, palette: [string, string, string]): TextNode {
  const yaml = [
    "type: oshi-log",
    "version: 1",
    `name: "${preset.name}"`,
    `birthday: "${preset.birthday}"`,
    `tone: "${preset.tone}"`,
    `tags: [${preset.tags.map((t) => `"${t}"`).join(", ")}]`,
    `palette:`,
    ...palette.map((c) => `  - "${c}"`),
    `exportProfile: "${preset.exportProfile}"`,
    `generatedAt: "${new Date().toISOString()}"`
  ].join("\n");
  const t = text(yaml, 10, "Regular", palette[2]);
  t.name = ".meta";
  t.opacity = 0;
  t.locked = true;
  return t;
}

function autoColumn(name: string, _accent: string, gap: number): FrameNode {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = "VERTICAL";
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = gap;
  f.fills = [];
  return f;
}

function text(value: string, size: number, weight: "Regular" | "Bold", hex: string): TextNode {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: weight };
  t.fontSize = size;
  t.characters = value;
  t.fills = [{ type: "SOLID", color: hexToRgb(hex) }];
  return t;
}

function captionFor(tone: string): string {
  switch (tone) {
    case "毒舌": return "今日も解像度を上げにいく。";
    case "ふんわり": return "今日のきらきらを残しておくよ ✿";
    default: return "今日の推し活ログ";
  }
}

function rotatePalette(p: [string, string, string], i: number): [string, string, string] {
  if (i === 0) return p;
  const tones: Array<[string, string, string]> = [
    [shift(p[0], 6), p[1], p[2]],
    [shift(p[0], -6), p[1], p[2]],
    [p[0], p[1], shift(p[2], -10)],
    [shift(p[0], 12), p[1], shift(p[2], 6)]
  ];
  return tones[(i - 1) % tones.length];
}

function shift(hex: string, delta: number): string {
  const { r, g, b } = hexToRgb(hex);
  const adj = (v: number) => Math.max(0, Math.min(1, v + delta / 100));
  return rgbToHex({ r: adj(r), g: adj(g), b: adj(b) });
}

function hexToRgb(hex: string): RGB {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return { r: 1, g: 1, b: 1 };
  const v = parseInt(m[1], 16);
  return { r: ((v >> 16) & 255) / 255, g: ((v >> 8) & 255) / 255, b: (v & 255) / 255 };
}

function rgbToHex(c: RGB): string {
  const to = (n: number) => Math.round(n * 255).toString(16).padStart(2, "0");
  return `#${to(c.r)}${to(c.g)}${to(c.b)}`;
}

function exportSettingsFor(profile: ExportProfile): ExportSettings[] {
  if (profile === "GoodNotes") return [{ format: "PDF" }];
  if (profile === "BOOTH") return [{ format: "PNG", constraint: { type: "SCALE", value: 3 } }, { format: "PDF" }];
  return [{ format: "PNG", constraint: { type: "SCALE", value: 2 } }];
}
