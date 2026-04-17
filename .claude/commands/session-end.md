セッション終了時の定型まとめコマンド。URL確認リスト・作業ログ・次アクションを一括出力する。

## 手順
1. このセッションでやったことを3行以内にまとめる
2. 確認URLリストを出力する
3. 次にやること（手動タスク）を1行で示す
4. /daily-log に渡せる3行ログも末尾に添える

## 出力フォーマット

```
## やったこと
- [作業1]
- [作業2]
- [作業3（3件まで）]

## 確認URL
| 用途 | URL |
|---|---|
| ポートフォリオ | https://shizuku-portfolio.vercel.app |
| oshi-log デモ | https://oshi-log-shizuku.vercel.app |
| Stillwater デモ | https://lp-demo-shizuku.vercel.app |
| Lumière デモ | https://salon-demo-shizuku.vercel.app |
| バナーデモ | https://banner-demo-shizuku.vercel.app |
| GitHub | https://github.com/saitoh19990720-art |

## 次アクション
[手動でやること1つだけ]

---
やった: [1行]
学び: [1行]
次やる: [1行]
```

## 制約
- やったことは3件まで（多ければ代表的なものを選ぶ）
- 次アクションは1つだけ
- URL一覧は固定（変更があればこのファイルを更新する）
