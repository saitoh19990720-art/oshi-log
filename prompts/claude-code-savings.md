# Claude Code 節約ルール

> 切る、絞る、止める。

**作成日：** 2026-04-17
**格納先：** `prompts/claude-code-savings.md`

---

## 🎯 結論

Claude Codeの節約で効くのは次の3つ：

1. **長い会話を切る**（`/clear`）
2. **CLAUDE.mdを軽くする**
3. **重い手順はSkillに逃がす**

節約の本質は料金テクより **コンテキストを太らせない運用**。

---

## 📚 要約

- `/clear` で無関係な会話を切るのが基本。公式も長いセッションでの積極管理を推奨。
- `/compact` と `/context` で重い箇所を確認しつつ圧縮。`/cost` で使用統計。
- CLAUDE.mdに長い手順を直書きより、**Skill化** した方が普段ほぼ無料同然（使う時だけ読む）。
- `.claude/rules/` で必要なパスだけにルールを当てる → ノイズ＆コンテキスト削減。
- Routinesは通常セッションと同じく使用量を消費。節約月は回しすぎない。

---

## 💎 節約ルール（そのまま貼れる版）

````markdown
# Claude Code節約ルール

## 1. 基本方針
- Claude Codeは「重い実装」にだけ使う
- 軽い差分修正はCodexへ回す
- 思考整理はChatGPTで先に終わらせる

---

## 2. 会話節約
- 無関係な話題に移る前に `/clear`
- 長くなったら `/compact`
- 詰まったら `/context` で重い箇所を確認
- 必要なら `/cost` で使用量を見る

---

## 3. 入力節約
- 目的は1文で書く
- 対象ファイルは必要最小限
- 「この範囲だけ」と明記する
- 「ここまでで止める」と明記する

例：
目的：LPのヒーローセクションだけ実装
範囲：src/components/Hero.tsx と styles.css のみ
出力：動くコード
制約：この範囲だけ、説明不要、ここで止める

---

## 4. CLAUDE.md節約
- CLAUDE.mdには恒常ルールだけ書く
- 長い手順・チェックリストはSkillへ移す
- 人間向けメモはHTMLコメントで書く

---

## 5. ルール分割
- 共通ルールは `CLAUDE.md`
- ファイル別ルールは `.claude/rules/`
- 必要な場所だけ読み込ませる

---

## 6. 禁止
- 「全部やって」
- 大量ファイル一括読ませ
- 話題を変えても同じスレ継続
- 長い手順を全部CLAUDE.mdに直書き
- Routineの回しすぎ

---

## 7. 一文ルール
- 切る、絞る、止める
````

---

## 🫧 実務解釈

長いセッションは自動でcompactされるが、**無関係な履歴・ファイル・コマンドが増えると性能が落ちやすい**。
だから効くのはこの3つ：

| 施策 | 効果 |
|---|---|
| **`/clear` を案件・話題の切れ目で打つ** | 無駄な履歴を持ち越さない |
| **長い運用手順をSkillに移す** | 使う時だけ読み込まれる |
| **`.claude/rules/` で必要範囲だけに当てる** | 常時コンテキストを軽く |

補足：CLAUDE.md内の **HTMLコメントはコンテキスト注入時に剥がれる** ので、人間向けメモをそこに逃がすと少し得。

Routineは便利だが **通常セッションと同じく使用量を消費＋日次上限あり**。節約月は「常時自動化」より「必要時だけ」。

---

## 🔗 参考

- [Best Practices for Claude Code](https://code.claude.com/docs/en/best-practices)
- [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works)
- [Extend Claude with skills](https://docs.anthropic.com/en/docs/claude-code/skills)
- [How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Automate work with routines](https://docs.anthropic.com/en/docs/claude-code/routines)
- [組み込みコマンド](https://code.claude.com/docs/ja/commands)
