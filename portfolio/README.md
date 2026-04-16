# portfolio

しずくさんの母艦ポートフォリオLP（1枚もの）。

## 公開前に差し替えるプレースホルダー

`index.html` 内の以下を実URLに置換：

| プレースホルダー | 置換内容 |
|---|---|
| `{{OSHI_LOG_URL}}` | oshi-log のVercel公開URL |
| `{{OSHI_LOG_REPO}}` | oshi-log のGitHubリポジトリURL |
| `{{CROWDWORKS_URL}}` | CrowdWorks プロフィールURL |
| `{{LANCERS_URL}}` | Lancers プロフィールURL |
| `{{GITHUB_URL}}` | GitHub プロフィールURL |

一括置換例（bash）:
```bash
sed -i 's|{{OSHI_LOG_URL}}|https://oshi-log.vercel.app|g' index.html
```

## ローカル確認

```bash
# このディレクトリで
npx serve .
```

## デプロイ

独立プロジェクトとしてVercelに出す場合は、この `portfolio/` を別リポジトリに切り出してconnectするのが一番シンプル。

同一リポジトリで分けたい場合は、Vercelの「Root Directory」を `portfolio` に指定。

## 構成

- `index.html` — 1枚構成（Hero / 対応範囲 / 実績 / 進め方 / 連絡先）
- `style.css` — oshi-log のダークトークンシステムを継承（`--accent-color` はくすみブルー系に調整）
