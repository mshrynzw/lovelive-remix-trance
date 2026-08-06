# WATER BLUE NEW WORLD — LoveLive! Remix Trance

Uplifting Trance リミックスアルバムの世界観を届ける、Next.js 製の音楽配信サイトです。

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## 本番ビルド

```bash
npm run build
npm run start
```

## 差し替えが必要な箇所

- `lib/tracks.ts` — 6 曲のタイトル・BPM・Key・再生時間・YouTube リンク（現在は仮データ）
- `public/audio/` — mp3 ファイル本体（`public/audio/README.txt` 参照）
- `components/footer.tsx` — YouTube / TikTok の実リンク
- `app/layout.tsx` — `siteUrl`（本番ドメイン）、OGP・SEO 情報
- `app/sitemap.ts` / `app/robots.ts` — 同上の `siteUrl`
- `public/images/jacket.webp` ほか — 追加のジャケット/ビジュアル素材（`components/next-up.tsx` の配列で発表予定ジャケットを差し替え）

## 技術構成

- Next.js 14 (App Router) / TypeScript
- Tailwind CSS（オーロラ配色のデザイントークンを `tailwind.config.ts` に定義）
- Framer Motion（フェードイン・スライド・パララックス・スクロール連動アニメーション）
- lucide-react（アイコン）
- Canvas による星空パーティクル（`components/starfield.tsx`、外部ライブラリなし）
- HTML5 Audio ベースの自作ミュージックプレイヤー（`components/providers/player-provider.tsx`）

## アクセシビリティ

- スキップリンク、フォーカスリング、aria-label / aria-live を主要インタラクションに設定
- `prefers-reduced-motion` に対応（アニメーションを自動的に抑制）
- キーボードのみで Lightbox の開閉・前後移動が可能（Esc / ← / →）
