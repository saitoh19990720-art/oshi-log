# 推し活A5チェキ帳テンプレ｜即日リリースパッケージ

## バリアント

### Variant A（トライアル低価格）
- 価格：Gumroad $6 / BOOTH ¥700
- 同梱物（ZIP）：figma.fig / print_A5.pdf / sticker_pack.png / README.md
- 追加：Figmaコミュニティ無料プレビュー（サムネ＋1ページ試閲）

### Variant B（バンドル高価格）
- 価格：Gumroad $15 / BOOTH ¥1,500
- 含むもの：A すべて＋
  - 完全ソースFigma（コンポーネント化済）
  - Tailwind/HTMLスニペット（LP/説明欄に貼れるミニコード）

## Gumroadワンライナー

> 推し活A5チェキ帳テンプレ — すぐ使えるFigma + 印刷用PDF・ステッカーパック付き。即ダウンロードしてカスタム可能。

## 計測指標（最小トラッキング）

- FigmaプレビューCTR（コミュニティ→商品遷移）
- Gumroad購入率（ビュー→購入）
- BOOTH国内流入（検索/タグ経由の閲覧数）

## 出品ファイル構成

```
/release_today.zip
  ├─ figma.fig
  ├─ print_A5.pdf
  ├─ sticker_pack.png
  ├─ README.md
  └─ license.txt（個人利用/商用可・再配布不可）
```

## README.md（テンプレ）

```markdown
# 推し活A5チェキ帳テンプレ
- 使い方: Figmaで色/テキストを編集→PDFを書き出し→A5で印刷
- GoodNotes: print_A5.pdf を読み込み、手書きでカスタムOK
- 同梱: figma.fig / print_A5.pdf / sticker_pack.png
- 問い合わせ: （あなたの連絡先）
```

## BOOTH商品説明（短文）

> 推し活A5チェキ帳テンプレ。Figma編集＋印刷用PDF＋ステッカーパック同梱。
> すぐに使えて、色や文字を自分好みにカスタム可能。GoodNotes対応。
> 【内容】figma.fig / print_A5.pdf / sticker_pack.png / README
> 【利用範囲】個人・商用可（再配布・転売不可）

## Tailwind/HTML（Variant B抜粋）

```html
<section class="mx-auto max-w-xl p-6">
  <h1 class="text-2xl font-semibold">推し活A5チェキ帳テンプレ</h1>
  <p class="mt-2">Figma編集＋印刷用PDF＋ステッカーパック。同人/記録/ギフトにも。</p>
  <ul class="mt-3 list-disc pl-5">
    <li>Figma編集可（カラー/テキスト）</li>
    <li>GoodNotes対応PDF</li>
    <li>透明PNGステッカー</li>
  </ul>
  <a href="#" class="mt-4 inline-block rounded px-4 py-2 border">今すぐダウンロード</a>
</section>
```

## 今日出せるチェックリスト

### データ準備（30–60分）
- [ ] Figmaファイル最終チェック（A5サイズ・余白・フォント）
- [ ] print_A5.pdfを書き出し（300dpi相当／塗り足し3mm）
- [ ] sticker_pack.png（2048px以上・透過）
- [ ] README.md & license.txt を入れる
- [ ] ZIP化（release_today.zip）

### Figmaコミュニティ
- [ ] 表紙サムネ（1280×800推奨）
- [ ] 無料プレビュー（1ページ公開）＋商品リンク

### Gumroad
- [ ] 商品ページ作成：タイトル／ワンライナー／画像3〜5枚
- [ ] 価格設定：A=$6、B=$15
- [ ] ファイルアップロード：release_today.zip
- [ ] 公開→URL取得

### BOOTH
- [ ] 商品ページ作成：タイトル/説明/タグ（"推し活""デジタルノート""Figma"）
- [ ] 価格設定：A=¥700、B=¥1,500
- [ ] ファイルアップロード→公開

### 最初の計測＆導線
- [ ] Figmaコミュ→Gumroad/BOOTHのリンク確認
- [ ] X告知ポスト：「推し活A5チェキ帳テンプレ公開しました。Figmaで色替え→即印刷OK。GoodNotes対応。」
- [ ] 1週間：CTR/購入率/流入を記録

## サムネ文言

- タイトル：推し活A5チェキ帳テンプレ
- サブ："色替え→印刷→すぐ使える" / GoodNotes対応 / Figma編集OK
- バッジ：PDF同梱 / Sticker付属 / 即DL

## 次の一手（明日の改善）

- 低価格Aで母数→CV見えたら、Bのコンポーネント化ソースを強調したLPに差し替え
- BOOTHはタグ最適化（"手帳""チェキ""ジャーナル""テンプレート"）
- Figmaプレビューは色違い3パターンを追記→CTR上げ
