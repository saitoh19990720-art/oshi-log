---
tags: [母艦サイト, HTML, CSS, Vercel]
created: 2026-03-28
---

# 母艦サイトセット｜テキスト・配色・HTML/CSS・公開手順

---

## セクションテキスト一式

**Hero**
```
AI×デザインで
LPとWebページをつくる

Figmaで設計し、Claude Codeで実装。
非同期・テキスト中心で、
公開できる状態まで一気通貫で整えます。

CTA：できることを見る / 相談する
```

**Services**
```
LP制作：サービス紹介や導線設計を含めて、LPを形にします。Figmaでの設計から実装まで一気通貫で対応します。
Webページ制作：小規模なWebページや紹介ページを、非同期・テキスト中心で進めます。
AI×デザインの整備：Claude CodeやFigmaを使った制作フローを前提に、ページ制作や軽い整備を進めます。
```

**Flow**
```
1. 目的を整理する
2. 構成を決める
3. Figmaで画面を設計する
4. 実装する
5. 確認して整える
```

**About**
```
AI×デザインで、LPやWebページをつくる人です。
Figmaで設計し、Claude Codeを活用して実装まで進めています。
文章で整理しながら認識を揃えていく進め方が得意です。
```

**Contact**
```
LPやWebページ制作のご相談を受けています。
目的や作りたいものが分かる範囲で、お気軽にご連絡ください。
```

---

## 配色ルール

| 役割 | カラーコード |
|------|------------|
| 背景 | `#F8FBFF` |
| メイン文字 | `#1F2A37` |
| サブ文字 | `#5B6B7A` |
| 境界線 | `#D9E6F2` |
| アクセント | `#A9D6F5` |
| CTA | `#6FAFD6` |

余白：セクション上下 72〜96px / コンテンツ最大幅 960〜1040px / 行間 1.75

---

## index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shizuku | AI×デザインでLPとWebページをつくる</title>
  <meta name="description" content="Figmaで設計し、Claude Codeで実装。AI×デザインでLPやWebページを、非同期・テキスト中心で公開できる状態まで整えます。" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <div class="site-logo">Shizuku</div>
      <nav class="site-nav">
        <a href="#services">できること</a>
        <a href="#flow">制作の流れ</a>
        <a href="#about">について</a>
        <a href="#contact">相談</a>
      </nav>
    </div>
  </header>
  <main>
    <section class="hero">
      <div class="container hero-inner">
        <p class="eyebrow">AI × Design</p>
        <h1>AI×デザインで<br />LPとWebページをつくる</h1>
        <p class="hero-text">Figmaで設計し、Claude Codeで実装。<br />非同期・テキスト中心で、公開できる状態まで一気通貫で整えます。</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#services">できることを見る</a>
          <a class="btn btn-secondary" href="#contact">相談する</a>
        </div>
      </div>
    </section>
    <section id="services" class="section">
      <div class="container">
        <div class="section-heading"><p class="section-label">Services</p><h2>できること</h2></div>
        <div class="card-grid">
          <article class="card"><h3>LP制作</h3><p>サービス紹介や導線設計を含めて、LPを形にします。Figmaでの設計から実装まで、一気通貫で対応します。</p></article>
          <article class="card"><h3>Webページ制作</h3><p>小規模なWebページや紹介ページを、非同期・テキスト中心で進めます。まずは公開できる状態まで持っていきたい案件に向いています。</p></article>
          <article class="card"><h3>AI×デザインの整備</h3><p>Claude CodeやFigmaを使った制作フローを前提に、ページ制作や軽い整備を進めます。</p></article>
        </div>
      </div>
    </section>
    <section id="flow" class="section section-soft">
      <div class="container">
        <div class="section-heading"><p class="section-label">Flow</p><h2>制作の流れ</h2></div>
        <div class="flow-list">
          <article class="flow-item"><span class="flow-number">01</span><div><h3>目的を整理する</h3><p>何を伝えるページか、どこに導線を置くかを整理します。</p></div></article>
          <article class="flow-item"><span class="flow-number">02</span><div><h3>構成を決める</h3><p>必要なセクションや情報の順番をまとめます。</p></div></article>
          <article class="flow-item"><span class="flow-number">03</span><div><h3>画面を設計する</h3><p>Figmaで画面や見せ方を整えます。</p></div></article>
          <article class="flow-item"><span class="flow-number">04</span><div><h3>実装する</h3><p>Claude Codeを活用しながら、公開できる形まで進めます。</p></div></article>
          <article class="flow-item"><span class="flow-number">05</span><div><h3>確認して整える</h3><p>テキストベースで確認しながら、認識のズレを減らして仕上げます。</p></div></article>
        </div>
      </div>
    </section>
    <section id="about" class="section">
      <div class="container narrow">
        <div class="section-heading"><p class="section-label">About</p><h2>について</h2></div>
        <div class="about-box">
          <p>AI×デザインで、LPやWebページをつくる人です。</p>
          <p>Figmaで設計し、Claude Codeを活用して実装まで進めています。文章で整理しながら認識を揃えていく進め方が得意です。</p>
          <p>小さくても、公開できる状態まできちんと整えることを大事にしています。</p>
        </div>
      </div>
    </section>
    <section id="contact" class="section section-soft">
      <div class="container narrow">
        <div class="section-heading"><p class="section-label">Contact</p><h2>ご相談について</h2></div>
        <div class="contact-box">
          <p>LP制作、Webページ制作、構成整理などのご相談を受けています。</p>
          <p>目的や作りたいものが分かる範囲で送っていただければ大丈夫です。</p>
          <a class="btn btn-primary" href="mailto:yourmail@example.com">メールで相談する</a>
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-inner"><p>© Shizuku</p></div>
  </footer>
</body>
</html>
```

---

## style.css

```css
:root {
  --bg:#f8fbff;--surface:#fff;--text:#1f2a37;--muted:#5b6b7a;
  --line:#d9e6f2;--accent:#a9d6f5;--accent-strong:#6fafd6;
  --shadow:0 8px 24px rgba(31,42,55,.05);--radius:14px;--max-width:1040px;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic","Noto Sans JP",sans-serif;background:var(--bg);color:var(--text);line-height:1.75}
a{color:inherit;text-decoration:none}
.container{width:min(100% - 32px,var(--max-width));margin:0 auto}
.narrow{width:min(100% - 32px,800px)}
.site-header{position:sticky;top:0;z-index:20;background:rgba(248,251,255,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(217,230,242,.7)}
.header-inner{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.site-logo{font-size:.95rem;font-weight:700;letter-spacing:.06em}
.site-nav{display:flex;gap:20px;flex-wrap:wrap}
.site-nav a{font-size:.95rem;color:var(--muted)}
.hero{padding:96px 0 88px}
.hero-inner{max-width:760px}
.eyebrow,.section-label{display:inline-block;margin:0 0 16px;padding:6px 12px;border-radius:999px;background:rgba(169,214,245,.22);color:var(--accent-strong);font-size:.9rem;font-weight:600}
.hero h1{margin:0 0 20px;font-size:clamp(2rem,5vw,3.75rem);line-height:1.2;letter-spacing:-.02em}
.hero-text{margin:0;color:var(--muted);font-size:1.05rem}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:12px;border:1px solid var(--line);font-weight:600;transition:.2s ease}
.btn:hover{transform:translateY(-1px)}
.btn-primary{background:var(--accent-strong);border-color:var(--accent-strong);color:#fff}
.btn-secondary{background:var(--surface);color:var(--text)}
.section{padding:88px 0}
.section-soft{background:rgba(255,255,255,.55);border-top:1px solid rgba(217,230,242,.65);border-bottom:1px solid rgba(217,230,242,.65)}
.section-heading{margin-bottom:32px}
.section-heading h2{margin:0;font-size:clamp(1.5rem,3vw,2.3rem);line-height:1.3}
.card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.card,.about-box,.contact-box{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}
.card{padding:28px}
.card h3{margin:0 0 12px;font-size:1.1rem}
.card p{margin:0;color:var(--muted)}
.flow-list{display:grid;gap:16px}
.flow-item{display:flex;gap:18px;align-items:flex-start;padding:24px;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}
.flow-number{flex:0 0 auto;min-width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:rgba(169,214,245,.22);color:var(--accent-strong);font-weight:700}
.flow-item h3{margin:0 0 8px}
.flow-item p{margin:0;color:var(--muted)}
.about-box,.contact-box{padding:32px}
.about-box p,.contact-box p{margin:0 0 16px;color:var(--muted)}
.contact-box .btn{margin-top:24px}
.site-footer{padding:28px 0 40px}
.footer-inner{border-top:1px solid var(--line);padding-top:20px}
.footer-inner p{margin:0;color:var(--muted);font-size:.95rem}
@media(max-width:900px){.card-grid{grid-template-columns:1fr}.header-inner{align-items:flex-start;padding:16px 0;flex-direction:column}}
@media(max-width:640px){.hero,.section{padding:72px 0 64px}.flow-item,.card,.about-box,.contact-box{padding:22px}.hero-actions{flex-direction:column}.btn{width:100%}}
```

**差し替え箇所：** メールアドレス・サイト名（Shizuku）・descriptionテキスト

---

## Vercel公開 最小手順

```
1. GitHubにリポジトリを作る（名前：shizuku-portfolio）
2. index.html と style.css を push する
3. vercel.com でリポジトリを Import する
4. Framework Preset → Other / Build Command → 空
5. Deploy → vercel.app のURLで確認
```

**公開後チェック**
- [ ] URLが開ける・文字化けしていない
- [ ] スマホで崩れていない
- [ ] CTAリンクが動く
- [ ] 「何をする人か」が最初に伝わる
- [ ] 公開できる状態として一旦OKにする
