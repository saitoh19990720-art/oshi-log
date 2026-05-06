# Chrome拡張 公開チェックリスト（MV3・1枚配布版）

## 用語ミニ解説

- **Manifest v3**: 拡張の設定ファイル。`service_worker`（常駐スクリプトの代替）が必須。
- **権限（permissions）**: 何にアクセスするか。最小に。
- **ストア掲載情報**: タイトル/説明/スクショ/アイコン/プライバシーポリシーなど。

## 1) 事前準備（Pre-publish）

- [ ] `manifest.json` を v3 に：`"manifest_version": 3`、`"background": { "service_worker": "bg.js" }`
- [ ] アイコン：16/32/48/128px PNG を `/icons` に配置
- [ ] バージョン：`"version": "0.1.0"`（セマンティック推奨）
- [ ] 権限の最小化：`permissions` / `host_permissions` を必要最小限に
- [ ] アクション定義：`action`（ポップアップUIなら `default_popup`）
- [ ] プライバシー/連絡先：`homepage_url` or サポート用メール/サイト用意
- [ ] 読み込みテスト：Chrome → 拡張機能 → デベロッパーモード → 「パッケージ化されていない拡張機能を読み込む」

### 6つのクイックQA
1. インストール/アンインストールが問題なく行える
2. activeTab フロー：ボタン押下→現在タブにだけ実行される
3. CSV/JSONエクスポート：想定フォーマットでダウンロードできる
4. 間違ったページでの挙動：対象外URLでは丁寧にメッセージ表示
5. オフラインfallback：最低限のUI/キャッシュ動作
6. 権限プロンプト：初回要求が明確かつ最小で怖くない文面

- [ ] エラー確認：DevTools / `chrome.runtime.lastError` / Service Workerログ
- [ ] ライセンス/クレジット：外部ライブラリがあれば表記

## 2) パッケージ & ストア公開

- [ ] ZIP化：ビルド成果物フォルダ（`manifest.json` が直下）をZIPに
- [ ] Developer Dashboard へアップロード（1回$5の登録済み前提）
- [ ] ストア掲載情報を入力
  - タイトル/短文説明/詳細説明（価値→使い方→安全性）
  - 1280×800 のスクリーンショット（3〜5枚）
  - アイコン（128×128）
  - プライバシーポリシーURL（Notion/自サイト可）
  - カテゴリ・対象（個人/教育など）
- [ ] テスト配布：限定公開（Unlisted） or 限定テスト（グループ）
- [ ] 段階的ロールアウト：Managed rollout（10%→50%→100%）
- [ ] 審査メモ：レビュアー向けに主要機能とテスト手順を簡潔に
- [ ] 公開後の監視：クラッシュ/レビュー/問い合わせ対応の導線を用意

## 付録A｜父に渡す1行README

> Chromeに入れて、拡張アイコンを押して「今開いてるページで実行」をタップするだけ。

## 付録B｜最小プライバシーポリシー雛形（要修正）

- 本拡張はユーザーの個人情報をサーバーへ送信しません。
- 処理はブラウザ内で完結します（例外があれば具体的に記載）。
- 連絡先：you@example.com

## 付録C｜ストア用 リリースノート（テンプレ）

```
v0.1.0 (2026-05-06)
- 初回リリース：対象ページでのワンクリック抽出とCSV保存に対応
- activeTab の最小権限化、対象外ページでの案内メッセージ追加
既知の制限：オフライン時は履歴閲覧のみ
```

## 付録D｜最小の manifest.json 例（MV3）

```json
{
  "manifest_version": 3,
  "name": "One-Click Exporter",
  "version": "0.1.0",
  "description": "開いているページから必要データを抽出してCSV保存します。",
  "action": { "default_title": "実行" },
  "permissions": ["activeTab"],
  "host_permissions": ["https://example.com/*"],
  "icons": {
    "16": "icons/16.png",
    "32": "icons/32.png",
    "48": "icons/48.png",
    "128": "icons/128.png"
  },
  "background": { "service_worker": "bg.js" }
}
```

## 付録E｜6枚スクショ計画

1. アイコン付きポップアップUI
2. 実行前の対象ページ
3. 実行後のトースト/完了表示
4. CSVがダウンロードされた瞬間
5. 対象外ページでの丁寧な案内
6. オフライン時の軽量UI

## 運用ミニSOP（週1ループ）

- レビューを3件読む → 改善1点決める
- バージョン+リリースノート更新 → 限定配布10%で様子見
- 問い合わせテンプレ更新（Q&A 1件追加）

---

# 追加機能：サスペクションスコア＆CSV

## A. サスペクション（疑わしさ）スコア・ピル（0–5）

- UI：色付きの小さなピル（0–5）＋ホバー時ツールチップ
  - ツールチップ内容：最終チェック時刻、根拠メモ（出品者アカウント年齢／相場との差／フィードバック件数・評価）
- 表示位置：各カード/行の右上
- 色：0=ニュートラル、5=赤寄り
- 最小データ：`sellerAgeDays`, `priceDeltaPct`, `feedbackScore`, `feedbackCount`, `lastCheckedAt`

## B. ワンクリックCSVエクスポート

- UI：Download CSV ボタン（現在のフィルタ＆並び順の表示中データだけ）
- 仕様：UTF-8 / ヘッダあり / ブラウザで即ダウンロード

## 権限設計

```json
{
  "manifest_version": 3,
  "name": "Suspicion & CSV",
  "permissions": ["activeTab"],
  "optional_host_permissions": ["https://example.com/*"],
  "background": { "service_worker": "sw.js" },
  "action": { "default_popup": "popup.html" },
  "content_scripts": [{ "matches": ["<all_urls>"], "js": ["content.js"], "run_at": "document_idle" }]
}
```

ホストアクセスはオプショナル権限に移動し、ユーザーが「チェック」ボタンを押したときだけ `chrome.permissions.request()` で付与を求める。

## スコア正規化（0–5）

```js
export function computeSuspicionScore({ sellerAgeDays, priceDeltaPct, feedbackScore, feedbackCount }) {
  const ageRisk = Math.max(0, 1 - Math.min(sellerAgeDays / 180, 1));
  const priceRisk = Math.min(Math.max((-priceDeltaPct) / 30, 0), 1);
  const fbQuality = 1 - Math.min(feedbackScore / 5, 1);
  const fbSparse  = Math.max(0, 1 - Math.min(Math.log10(Math.max(feedbackCount,1)) / 2, 1));
  const w = { age: 0.3, price: 0.4, quality: 0.2, sparse: 0.1 };
  const risk01 = (ageRisk*w.age) + (priceRisk*w.price) + (fbQuality*w.quality) + (fbSparse*w.sparse);
  return Math.round(risk01 * 5);
}
```

## CSVダウンロード

```js
export function downloadCsv(filename, rows) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const esc = (v) => `"${String(v ?? "").replace(/"/g,'""')}"`;
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => esc(r[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}
```

## UIメモ（デザイン最小ルール）

- ピル：`min-width: 36px; padding: 2px 8px; border-radius: 999px; font-weight: 600;`
- 色：0–1=灰/青, 2–3=黄/橙, 4–5=赤（WCAG視認性を確保）
- ツールチップ：`lastCheckedAt` と根拠（例：`AccAge: 42d / -18% vs avg / 4.2★(38)`）
