// 出品リスクスコアリング (draft)
// inputs: 出品者の年齢/評価/取引数 + 価格と相場
// output: 0-5のリスクスコアと上位理由3件

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export function riskScore(p: {
  seller_age_days: number;
  rating: number;
  deals: number;
  price: number;
  median: number;
}) {
  const newSeller = clamp01(30 / (p.seller_age_days + 1));
  const lowRating = clamp01((3.5 - p.rating) / 3.5);
  const thinHist = clamp01(5 / (p.deals + 1));
  const priceGap = clamp01((p.median - p.price) / p.median);

  const w = { a: 0.30, b: 0.25, c: 0.15, d: 0.30 };
  const risk = 5 * (w.a * newSeller + w.b * lowRating + w.c * thinHist + w.d * priceGap);
  const score = Math.round(risk);

  const topReasons = Object.entries({
    "新規出品者": newSeller,
    "評価が低い": lowRating,
    "取引履歴が少ない": thinHist,
    "相場より安い": priceGap,
  })
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, v]) => `${k} (${Math.round(v * 100)}%)`);

  return { score, reasons: topReasons };
}
