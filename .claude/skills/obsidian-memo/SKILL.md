---
name: obsidian-memo
description: 会話・作業結果・学びをObsidian保存用に整形するときに使う。frontmatter付きMarkdownで出力する。
---

# Obsidian Memo Skill

## 使い方
「obsidian-memo を使います」と言い、保存したい内容を貼るだけ。

## 出力フォーマット

```markdown
---
date: YYYY-MM-DD
tags: [タグ1, タグ2]
source: Claude
---

# タイトル

## 結論
（1文）

## 要点
-
-
-

## 補足
（必要時のみ）

## 次やる
-
```

## 制約
- 1ノート1テーマ
- タグは最大3個
- 結論は必ず1文
- 長文は要点5個以内に圧縮
- 装飾しすぎない
