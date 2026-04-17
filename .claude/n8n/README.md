# n8n ワークフロー設定ガイド

## ワークフロー一覧

| ファイル | 内容 | トリガー |
|---|---|---|
| `freelance-feed.json` | CrowdWorks案件（LP/Figma/HTML）→ Discord | 毎時 22〜3時 |
| `info-feed.json` | Qiita/Zenn（AI/Figma/Claude）→ Discord | 毎時 22〜3時 |

---

## セットアップ手順

### 1. Discord Webhook を再生成

⚠️ JSONファイルに古い Webhook URL が含まれています。先にローテーションしてください。

```
Discord サーバー設定
→ 連携サービス → Webhook
→ 該当の Webhook → URL を再生成
→ 新しい URL をコピー
```

### 2. JSONを編集

`freelance-feed.json` と `info-feed.json` 内の Webhook URL を新しいものに差し替え：

```
"url": "https://discord.com/api/webhooks/YOUR_NEW_URL"
```

### 3. n8n にインポート

```
n8n を開く
→ ワークフロー → インポート
→ JSONファイルを選択
→ 保存 → 有効化
```

### 4. 動作確認

```
ワークフロー → 手動実行
→ Discord に通知が届くか確認
```

---

## 通知チャンネル分け（推奨）

| ワークフロー | Discord チャンネル |
|---|---|
| freelance-feed | `#案件通知` |
| info-feed | `#情報収集` |

---

## カスタマイズ

**キーワード追加（freelance-feed）:**
RSS URL の `keyword=` 部分を変更

例：
```
keyword=LP%E5%88%B6%E4%BD%9C  → LP制作
keyword=Figma               → Figma
keyword=WordPress           → WordPress（追加例）
```

**情報源追加（info-feed）:**
RSS ノードをコピーして URL を変更するだけ
