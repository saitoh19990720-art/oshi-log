# Deploy — 案件応募に必要な公開URLを揃える

**ゴール:** 30分以内に oshi-log とポートフォリオを両方公開して、応募文に貼れる状態にする。

## 0. 事前準備（初回のみ）

```bash
winget install --id GitHub.cli        # PR作成用
npm i -g vercel                       # デプロイ用
gh auth login
vercel login
```

## 1. oshi-log をデプロイ

```bash
# リポジトリルートで
vercel --prod
```

- プロジェクト名は `oshi-log` 推奨
- フレームワーク検出 → `Other`
- 出力ディレクトリ → `./`（デフォルト）
- 完了後の URL をメモ（例: `https://oshi-log.vercel.app`）

## 2. ポートフォリオに URL を差し込む

```bash
cd portfolio
cp .env.example .env
# .env を編集して実URLを書く（Vim/VSCode等）
bash replace-placeholders.sh
```

`dist/` に置換済みファイルが生成される。

## 3. ポートフォリオをデプロイ

```bash
cd dist
vercel --prod
```

- プロジェクト名は `shizuku-portfolio` 等
- 完了後の URL をメモ

## 4. 応募文テンプレに URL を反映

`~/work/templates/proposals/` の `{{PORTFOLIO_URL}}` / `{{OSHI_LOG_URL}}` を実URLに置換（sedでもエディタでも可）。

```bash
cd ~/work/templates/proposals
for f in *.md; do
  sed -i "s|{{PORTFOLIO_URL}}|https://shizuku-portfolio.vercel.app|g" "$f"
  sed -i "s|{{OSHI_LOG_URL}}|https://oshi-log.vercel.app|g" "$f"
done
```

## 5. 応募1件出す（検証）

CrowdWorks で LP コーディング案件を1件開く → `lp-coding.md` をコピペ → `{{案件名}}` と `{{具体的な一致点}}` だけ差し替え → 投稿。

**目標:** 開始から投稿まで10分以内。

## トラブル時

| 症状 | 対処 |
|---|---|
| `vercel` コマンドが通らない | `npm root -g` のパスを確認、Git Bashを再起動 |
| Vercel の本番URLが `-git-main.vercel.app` になる | ダッシュボードで Production Branch を `main` に設定 |
| 置換スクリプトで `{{` が残る | `.env` の変数名スペルをチェック |
| CrowdWorks プロフィールURLがわからない | マイページ右上のアイコン → プロフィールを見る → そのURL |
