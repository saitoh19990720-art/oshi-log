# Claude Code 安全運用 最小セット

## 1) 危険操作は人間の最終確認を必須

削除・課金・公開などの取り返しがつかない処理は、必ず承認ダイアログを要求。

```json
{
  "action": "delete-user-data",
  "confirm_required": true,
  "confirm_schema": {
    "actor": "string",
    "reason": "string",
    "expires_at": "ISO8601"
  },
  "retry_policy": { "max_retries": 0 }
}
```

- `confirm_required`: 人間承認を強制
- `confirm_schema`: 承認時に必須入力（誰が/なぜ/期限）
- `retry_policy.max_retries=0`: 勝手なリトライ禁止

## 2) トークン衝突を避ける環境変数ルール

プロジェクトごとに短命トークンを分け、実行時だけ明示指定。`/login`常用は避ける。

```bash
# プロジェクト固有の短命トークンをエクスポート
export ANTHROPIC_TOKEN_PROJECT_shizuku="<short-lived-token>"
# 実行時だけ明示トークンを渡す
ANTHROPIC_AUTH_TOKEN="$ANTHROPIC_TOKEN_PROJECT_shizuku" claude run
```

### よくあるエラーの即解

`Auth conflict: Both a token and an API key are set`

```bash
# どちらか一方に統一
unset ANTHROPIC_AUTH_TOKEN && claude /login <managed-key>
# もしくは /login を使わず、常に ANTHROPIC_AUTH_TOKEN を明示指定
```

## 3) しずくOS向けミニ運用チェックリスト

- [ ] 危険系Skill（削除・公開・請求）には必ず `confirm_required` を入れる
- [ ] プロジェクト別トークンを命名（`ANTHROPIC_TOKEN_PROJECT_*`）して使い分け
- [ ] CI/ローカルとも実行時にだけ `ANTHROPIC_AUTH_TOKEN` を渡す
- [ ] 「衝突」エラーが出たらまず `unset` → 片方に統一
- [ ] 期限付きトークンをデフォルトにして漏えい＆長期失効リスクを下げる
