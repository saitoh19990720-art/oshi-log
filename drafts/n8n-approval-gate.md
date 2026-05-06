# n8n × Notion ヒューマン承認ゲート

## 前提

2025〜26年にかけて n8n で高～クリティカルの脆弱性が複数報告（RCE 等）。
v1.65〜1.120 系や一部ノード周辺などで、アップデート推奨。
運用上も「人の最終承認」を入れるのが安全策。

## 実行順（Figma→Claude Code→n8n→Notion フローに直挿し）

1. **Figma Export → n8n Webhook**（生データ受信）
2. **n8n → Claude（Executor）**
   - 「変更提案」を生成させるが、必ず `confirm_required: true` を付けて停止
   - 返却JSON例:

```json
{
  "summary": "LPヒーロー差し替え",
  "actions": [
    {"type":"notion.update","pageId":"xxx","patch":{}},
    {"type":"deploy","site":"figma-sites","env":"prod"}
  ],
  "confirm_required": true,
  "diff_hash": "abc123"
}
```

3. **n8n → Notion（Approval DB）**
   - 「提案ページ」を作成：`status: "pending"` / `requester: "figma-bot"` / `diff_hash` / `suggested_actions` / `timestamp`
   - ページ本文に人向け要約・差分リンク・承認用 Resume Webhook URL を記載

4. **人が承認**（Notion で `approved` に変更 or 承認ボタン＝Resume URL 実行）
   - n8n 側で `diff_hash` と承認者を照合
   - 実行直前にヘルスチェック
   - 問題なければ `actions[]` を順次実行 → Notion に書き戻し（監査ログ）

## 承認API呼び出し例

```
POST https://n8n.example/webhook/resume-approval
Body: { "diff_hash":"abc123", "approver":"shizuku", "token":"<short-lived>" }
```

## 運用ルール

- 承認者：指定オーナー1名以上のみ
- TTL：例 24h。期限切れは自動 `rejected`
- 監査：Notion ページに「承認者／時刻／IP」を必ず残す

## n8n ノード設計

- **Trigger**: Webhook（Figma から受信）
- **Function/Code**: Claude 呼び出し → `confirm_required:true` を保証（なければ強制付与）
- **DB**: Notion（提案ページ作成・ステータス管理）
- **Gate**: Wait → Resume Webhook（承認時に再開）
- **Preflight**: 実行直前に
  - `GET /rest/system/status` 相当のヘルス
  - 実行対象ノードが既知の脆弱パスに該当しないかチェック
- **Executor**: `actions[]` を type 別に安全実行（失敗時は Notion に反映＆ロールバック）

## 5分チェックリスト

- [ ] バージョン確認＆更新（1.123.17/2.x 系推奨事例あり）
- [ ] 公開エンドポイント最小化（不要な Webhook/Form を一旦停止・制限）
- [ ] 承認DB（Notion）を用意（プロパティ：status / diff_hash / requester / approver / ttl / log）
- [ ] Wait/Resume を組み込み、`confirm_required` が false のジョブは強制失敗に
- [ ] 監査ログを Notion に必ず書く（誰が、いつ、どの差分を承認したか）

## 失敗しやすいポイント

- 「Claude からの返りに `confirm_required:true` が付かない」→ n8n 側で付与して止める
- 「承認URLが第三者に漏れる」→ 短命トークン＋`diff_hash` 照合＋IP 記録
- 「既知CVEのノードを踏む」→ 実行直前のPreflightでバージョン/ノード照査
