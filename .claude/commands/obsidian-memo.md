Obsidian保存用にテキストを整形する。YAMLフロントマター付きで出す。

## 使い方

保存したい内容を貼る。ノートの種類（ログ / 判断基準 / 案件メモ / 学び）を添えると精度が上がる。

---

## 出力フォーマット

```yaml
---
title: [タイトル]
date: YYYY-MM-DD
tags: [タグ1, タグ2]
type: [log / decision / case / learning]
---

# [タイトル]

[本文：H2/H3で構造化・箇条書き中心]
```

---

## タイプ別タグ候補

| type | tags例 |
|---|---|
| log | daily, session, work |
| decision | strategy, rule, design |
| case | crowdworks, lancers, portfolio |
| learning | claude, n8n, figma, css |

---

## 制約

- フロントマターは最小限（title / date / tags / type の4項目のみ）
- 本文は元の意味を変えない
- 整形後のMarkdownのみ出力（説明コメント不要）
