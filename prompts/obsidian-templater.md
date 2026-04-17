# Obsidian Templater｜夜タスク完成版

> Daily Noteにそのまま入れて使う。Templater記法つき。

**作成日：** 2026-04-17
**格納先：** `prompts/obsidian-templater.md`

---

## 使い方

1. Obsidian の `Templates/` フォルダに保存
2. Templater プラグインを有効にする
3. Daily Note または新規ノートに適用

---

## 💎 フルテンプレ（Templater記法つき）

````markdown
---
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - 夜タスク
  - ShizukuOS
aliases:
  - 夜タスク_<% tp.date.now("YYYYMMDD") %>
---

# 夜タスク｜<% tp.date.now("YYYY-MM-DD (ddd)") %>

## 0. 今日の1文結論
> 今日やることは：

---

## 1. モード選択
- [ ] A：思考整理から入る → ChatGPTへ
- [ ] B：そのまま実装する → Claude Codeへ
- [ ] C：軽い修正だけやる → Codexへ

---

## 2. ChatGPT（決める）

> 使う条件：何を決めるか迷っている・比較したい・優先順位が必要

決めたいこと：
条件：
出力形式：結論＋要点のみ

結論：

---

## 3. Claude Code（作る）

> 使う条件：実装・構造作成・バグ修正・複数ファイル変更

目的：
範囲：
出力：
制約：この範囲だけ / 必要最小限 / ここで止める

結果：

---

## 4. Codex（整える）

> 使う条件：微修正・差分だけ・1行変更

対象：
出力：差分のみ
制約：最小コード・説明不要

結果：

---

## 5. 実行フロー
- [ ] ① ChatGPTで「何をやるか」確定
- [ ] ② Claude Codeで形にする
- [ ] ③ Codexで整える
- [ ] ④ ここで終了

---

## 6. やらないこと（今日）
- [ ] 新しい案を増やさない
- [ ] 別案件に飛ばない
- [ ] 全部やろうとしない

---

## 7. 完了条件
- [ ] 1つ決まった
- [ ] 1つ動いた
- [ ] 1つ整った

---

## 8. 3行ログ

やった：
学び：
次やる：

---

<% tp.date.now("HH:mm") %> 終了
````

---

## 🫧 超圧縮版（毎日使う用）

````markdown
---
date: <% tp.date.now("YYYY-MM-DD") %>
tags: [夜タスク]
---

# <% tp.date.now("MM/DD") %> 夜タスク

今日やること：

## ChatGPT
決めること：

## Claude Code
目的：
範囲：
制約：この範囲だけ・ここで止める

## Codex
対象：

## 3行ログ
やった：
学び：
次やる：
````

---

## ⚙️ Templater設定メモ

| 設定 | 値 |
|---|---|
| Template folder | `Templates/` |
| Trigger on new file creation | ON |
| Auto-jump cursor | ON |

Daily Note設定：

```
Format: YYYY-MM-DD
Template file: Templates/夜タスク.md
```

---

## 💧 運用ルール

```
CLAUDE.md       = 性格設定（恒常）
.claude/rules/  = 現場ルール（局所）
.claude/skills/ = 作業手順（必要時）
このテンプレ    = 毎日の実行指示
```
