#!/usr/bin/env bash
# portfolio の {{...}} プレースホルダを実URLに置換して dist/ を作る
# 使い方:
#   bash replace-placeholders.sh
# 先に .env を書いておく:
#   PORTFOLIO_URL=https://shizuku.vercel.app
#   OSHI_LOG_URL=https://oshi-log.vercel.app
#   OSHI_LOG_REPO=https://github.com/saitoh19990720-art/oshi-log
#   CROWDWORKS_URL=https://crowdworks.jp/public/employees/xxxx
#   LANCERS_URL=https://www.lancers.jp/client/xxxx
#   GITHUB_URL=https://github.com/saitoh19990720-art
#   OG_IMAGE_URL=https://shizuku.vercel.app/og.png

set -euo pipefail

cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "Error: .env が見つかりません。portfolio/.env を作ってURLを記載してください。"
  exit 1
fi

# .env 読み込み
set -a
source .env
set +a

# dist/ を作って置換
rm -rf dist
mkdir -p dist
cp index.html style.css dist/

for VAR in PORTFOLIO_URL OSHI_LOG_URL OSHI_LOG_REPO CROWDWORKS_URL LANCERS_URL GITHUB_URL OG_IMAGE_URL; do
  VALUE="${!VAR:-}"
  if [ -z "$VALUE" ]; then
    echo "Warning: $VAR が未設定です（空文字に置換されます）"
  fi
  # sedの区切り文字に # を使う（URLに / が入るため）
  sed -i "s#{{${VAR}}}#${VALUE}#g" dist/index.html
done

# 残ったプレースホルダ確認
REMAINING=$(grep -c "{{" dist/index.html || true)
if [ "$REMAINING" -gt 0 ]; then
  echo "注意: dist/index.html に未置換のプレースホルダが $REMAINING 件残っています:"
  grep -n "{{" dist/index.html
else
  echo "OK: 全プレースホルダを置換しました → dist/"
fi
