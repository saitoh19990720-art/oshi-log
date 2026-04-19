しずく標準デザイントークンを出す。CSS変数・フォント・サイズスケール込み。Claudeへの実装指示にそのまま貼れる。

---

## CSS変数（コピペ用）

```css
:root {
  /* Background */
  --bg-main: #F8FBFF;
  --bg-sub: #FFFFFF;
  --bg-soft: #F1F6FB;

  /* Primary */
  --primary: #A9D6F5;
  --primary-soft: #D8EEFB;
  --primary-deep: #7FB8E6;

  /* Text */
  --text: #4B5563;
  --text-sub: #6B7280;
  --text-soft: #94A3B8;

  /* Border / Accent */
  --border: #E5EDF5;
  --accent: #8CBFE8;
  --accent-gray: #C9D8E6;

  /* Button */
  --btn-primary-bg: #A9D6F5;
  --btn-primary-text: #FFFFFF;
  --btn-secondary-bg: #FFFFFF;
  --btn-secondary-text: #4B5563;
  --btn-secondary-border: #D6E5F2;

  /* Font */
  --font-body: "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif;
  --font-accent: "Inter", "Noto Sans JP", sans-serif;

  /* Radius / Shadow */
  --radius: 12px;
  --shadow: 0 4px 20px rgba(169,214,245,0.12);
}
```

---

## Claudeへの実装指示テンプレ（色・フォント込み）

```md
デザインは以下を固定で使ってください。

背景: #F8FBFF / #FFFFFF / #F1F6FB
水色: #A9D6F5（メイン）/ #7FB8E6（深め）/ #D8EEFB（薄め）
文字: #4B5563（メイン）/ #6B7280（補助）/ #94A3B8（弱め）
境界線: #E5EDF5
フォント: "Noto Sans JP", "Hiragino Sans", sans-serif

方針：
- 余白重視・影は薄く・グラデ乱用なし
- SaaSテンプレ感を薄める
- スマホで読みやすく
```

---

## タイポグラフィスケール

```
Desktop: Hero 36px / Section 28px / Card 20px / Body 16px / Small 14px
Mobile:  Hero 28px / Section 22px / Card 18px / Body 15px / Small 13px
LineHeight: タイトル 1.4 / 本文 1.8 / 小文字 1.7
```

---

## 3派生カラーセット

### 仕事LP版（信頼感）
```
Primary: #7FB8E6（少し締める）
Background: #F5F8FC
Text: #374151
```

### 美容版（柔らかく）
```
Primary: #C4DCF0（さらに薄く）
Background: #FAFCFF
Accent: #E8D5E8（ラベンダー補助）
```

### 推し活版（少し彩度UP）
```
Primary: #90C8F0
Background: #F3F8FF
Accent: #B8D4F5
```

---

## Figmaスタイル名

```
Color/BG/Main  Color/BG/Sub  Color/BG/Soft
Color/Primary/Main  Color/Primary/Soft  Color/Primary/Deep
Color/Text/Main  Color/Text/Sub  Color/Text/Soft
Color/Border/Default
Text/Hero  Text/Section  Text/Card  Text/Body  Text/Small  Text/Button
```
