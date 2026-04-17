# AGENTS.md

## Role
Codex agent for Shizuku OS. Handles tiny diffs and local repairs only.

## Scope
- small code edits (under 20 lines changed)
- rename / move / delete single files
- fix lint errors, typos, broken imports
- do NOT redesign, do NOT add features

## Output
- minimal diff only
- no explanation unless asked
- stop after the requested change

## Do NOT
- read files not mentioned in the task
- suggest refactors
- expand scope
- continue after task is complete
