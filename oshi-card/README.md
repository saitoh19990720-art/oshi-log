# oshi-card (A5 print-ready)

推しログ用 A5 印刷カード。HTML/CSS/JSのみ・依存なし。

## 使い方

1. `index.html` をブラウザで開く
2. テーマ選択（mono / soft / deep）
3. 各項目入力 + 写真スロットをクリックで写真追加
4. 「印刷 / PDF保存」ボタン → ブラウザ印刷ダイアログで「PDFとして保存」

## ファイル

- `index.html` — A5レイアウト本体
- `styles.css` — テーマ + 印刷CSS（@page A5 portrait）
- `script.js` — 写真ピッカー（1:1 crop）+ テーマ切替

## 編集ポイント

- 色: `styles.css` の `:root` / `.theme-*`
- レイアウト: `.oshi-log` の grid
- 余白: `@page { margin }` を 10〜12mm で調整
- ブリード3mm: プリンタ側設定 + `@page` margin を縮小

## PDF出力

ブラウザ印刷 → 「PDFとして保存」を推奨（ヘッドレスPDFツールなしで完結）。
