# Oshi-Log Template Generator (Figma Plugin)

A5サイズの「推し活ログ」テンプレを、プリセット選択→ボタン1発で生成する最小プラグイン。

## 同梱
- `manifest.json` — Figmaに読み込ませる定義
- `code.ts` — プラグイン本体（TypeScript）
- `ui.html` — 3パネルUI（プリセット / 入力 / アクション）
- `presets/oshi.json` — 初期プリセット3種（ピンク / スカイ / 毒舌モノクロ）

## ビルド
```bash
npm i -g typescript
tsc figma-plugin/oshi-log/code.ts --target es2017 --lib es2017,dom --out figma-plugin/oshi-log/code.js
```

## Figmaへの取り込み
1. Figmaデスクトップ → Plugins → Development → Import plugin from manifest
2. `figma-plugin/oshi-log/manifest.json` を選択
3. デザインファイルで Run

## 生成されるもの
- フレーム `Oshi-Log/<profile>/v<n>` を `variants` 個ぶん横並びで配置
- 構成：Hero / Stats / Checklist / Notes / `.meta`（YAML、非表示&ロック）
- exportProfile に応じた exportSettings を自動付与（A5=PNG@2x / GoodNotes=PDF / BOOTH=PNG@3x+PDF）

## 拡張ポイント
- `presets/oshi.json` を増やすだけでチップが増える
- `code.ts` の `captionFor(tone)` を差し替えれば tone別キャプション自動生成
- 後で「Claude Codeで tone別キャプション生成」と接続するときは `.meta` の `caption` に書き戻す形にする
