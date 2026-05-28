# publish/ — Safe-publish workflow

有料アセットの公開（Figmaキット販売、BOOTH更新、予約投稿の有料解放など）を
**人間承認なしで本番に届かない**ように止めるためのスキーマ＋CIガード。

## ファイル
- `schema.json` — `PublishRequest` の JSON Schema (Draft 2020-12)
- `validate.mjs` — Node標準モジュールのみで動くバリデータ
- `sample.json` — 通る例（draft段階：`confirm_required:true`）
- `sample.invalid.json` — 落ちる例（CIで弾かれることの確認用）
- `n8n-safe-publish.json` — n8nワークフロー雛形（Webhook→HMAC→Draft→Wait→Publish）

## 設計の3行まとめ
1. `confirm_required:true` の draft しか自動で作らない
2. 人間が `resume_url` を踏み、承認後にサーバ側で `confirm_required:false` + `signature` を付ける
3. CIは「`confirm_required:false` なのに `signature` が無い」「`diff_hash` が不正」を機械的に拒否

## ローカル確認
```bash
node publish/validate.mjs publish/sample.json          # → OK
node publish/validate.mjs publish/sample.invalid.json  # → 1で終了
```

## CI
`.github/workflows/publish-guard.yml` が `publish/**` 配下の `*.json` を全部検証する。
新しい公開ペイロードを足すときは `publish/payloads/<run_id>.json` に置けば自動で対象になる。
