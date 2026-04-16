# Purpose

このリポジトリの現在の用途。

## 構成

- **ルート**: 押印（oshi-log）— 推し活観測ログのWebアプリ（Vanilla JS + CSS + localStorage）
- **`portfolio/`**: 母艦ポートフォリオLP（案件応募に貼る公開URLの素材）

## 目的

個人プロダクト（oshi-log）を実績として公開しつつ、同じリポ内でフリーランス向け母艦ポートフォリオも運用する。両方をVercelで公開することで、応募文に即貼れる状態を常に保つ。

## 方針

- 作り込みよりも「公開できる状態」を優先する（Ne Stop Mode）
- UIトークン（CSS変数）は portfolio 側も oshi-log の設計を継承する
- 応募導線は `~/work/templates/proposals/` の雛形を使って10分以内で応募できる状態を維持する
