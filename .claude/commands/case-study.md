完了案件を実績カードに変換する。ポートフォリオ掲載用・Obsidian保存用。

## 使い方

完了した案件の情報を貼るだけ。最低限「何を作ったか」と「クライアントの許可状況」があればOK。

---

## 出力フォーマット

### ① ポートフォリオ掲載用（HTMLカード）

```html
<article class="card work-card">
  <div class="work-meta">
    <span class="work-tag">[タイプ: LP制作/Webアプリ/バナー等]</span>
    [受注案件の場合は work-tag-demo を外す]
  </div>
  <h3>[作品名]｜[一言説明]</h3>
  <p>[2〜3行の説明。想定ユーザー・工夫点・世界観を含める]</p>
  <ul class="work-spec">
    <li><span>想定</span>[ターゲット]</li>
    <li><span>担当</span>[担当範囲]</li>
    <li><span>技術</span>[使用技術]</li>
  </ul>
  <a class="work-link" href="[URL]" target="_blank" rel="noopener">サイトを見る →</a>
</article>
```

### ② Obsidian保存用（Markdown）

```markdown
## [案件名]
- 完了日: YYYY-MM-DD
- タイプ: [LP/バナー/修正/Figma/アプリ]
- クライアント: [非公開 or 業種だけ]
- 実績化: [可 / 匿名可 / 不可]
- 納品物: [HTMLファイル / FigmaURL / VercelURL]
- 技術: [使用スタック]
- 工夫点: [1〜2行]
- 次回への教訓: [1行]
```

---

## 聞くこと（情報が足りない場合）

1. 案件名・サービス名（仮名可）
2. 何を作ったか（LP/バナー/修正/Figma/アプリ）
3. クライアントの実績化許可（可 / 匿名可 / 不可 / 自主制作）
4. 公開URL（あれば）
5. 使った技術
6. 一番こだわった点（1つだけ）

---

## 制約

- クライアント名は書かない（業種のみ）
- 実績化「不可」の案件はObsidianのみ・ポートフォリオには載せない
- 工夫点は具体的に（「丁寧に作りました」は書かない）
