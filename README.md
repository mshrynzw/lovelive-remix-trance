# Love Live! Trance — lovelive-trance.com

Uplifting Trance リミックスの世界観を届ける、Next.js 製の音楽配信サイトです。  
本番ドメインは **https://lovelive-trance.com**、ホスティングは **Cloudflare Workers（OpenNext）** です。

## セットアップ

```bash
pnpm install
pnpm dev
```

`http://localhost:3000` で確認できます。

## ホスティング方針（Phase 1 / Phase 2）

| フェーズ | 内容 |
| --- | --- |
| **Phase 1（現在）** | サイトを Cloudflare Workers にデプロイ。音源は当面 `public/audio/` から配信。ゴールは `https://lovelive-trance.com` で曲が聴けること。 |
| **Phase 2（後続）** | 音源を Cloudflare R2 へ移し、転送コストを抑える。`tracks.ts` の `audioSrc` を R2 の公開 URL に変更する。 |

「聴いてもらう」規模が増えるほど効くのはデプロイ先そのものより **音源の置き場** です。サイト本体は Workers、伸びたら音源だけ R2、という段階的な進め方にしています。

## Cloudflare へのデプロイ（Phase 1）

### 前提

- Cloudflare アカウント
- ドメイン `lovelive-trance.com` の DNS を Cloudflare に置く（ネームサーバーを Cloudflare にするのが最短）
- このリポジトリのルートで作業
- `.dev.vars` を用意（初回は `cp .dev.vars.example .dev.vars`）
- **Windows**: OpenNext は WSL 推奨。ネイティブ Windows では `pnpm` の `node-linker=hoisted`（`.npmrc`）を使っています。ビルドで `EPERM: symlink` が出る場合は [開発者モード](https://learn.microsoft.com/windows/apps/get-started/enable-your-device-for-development) を有効にするか、WSL 上で `pnpm preview` / `pnpm deploy` を実行してください

### 初回ログイン

```bash
pnpm exec wrangler login
```

ブラウザで Cloudflare に許可します。

### 本番相当のローカル確認

```bash
pnpm preview
```

OpenNext でビルドし、Workers ランタイム（`workerd`）上で起動します。再生・画像・OGP をここで確認してください。

### デプロイ

```bash
pnpm deploy
```

`*.workers.dev`（Worker 名: `lovelive-trance`）に公開されます。

### 独自ドメインの紐づけ

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → `lovelive-trance`
2. **Settings → Domains & Routes**（または Triggers）でカスタムドメインを追加
3. `lovelive-trance.com` を追加（必要なら `www.lovelive-trance.com` も追加し、apex へリダイレクト）
4. DNS が Cloudflare 配下なら、通常はレコードが自動で用意されます

サイト URL・OGP・sitemap 用の定数は `lib/site.ts` の `siteUrl`（`https://lovelive-trance.com`）です。ドメイン紐づけ後、ブラウザと OGP デバッガで表示を確認してください。

### CI（任意）

GitHub / GitLab を Workers Builds に接続する場合の目安:

- Build command: `npx @opennextjs/cloudflare build`（または `pnpm exec opennextjs-cloudflare build`）
- Deploy command: `npx @opennextjs/cloudflare deploy`

### よく使うスクリプト

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | Next.js 開発サーバー |
| `pnpm build` | Next.js 本番ビルドのみ |
| `pnpm preview` | OpenNext ビルド + Workers 相当でローカル確認 |
| `pnpm deploy` | OpenNext ビルド + Cloudflare へデプロイ |
| `pnpm upload` | デプロイせずバージョンだけアップロード（段階的リリース用） |

## 本番ビルド（Node 単体・参考）

Cloudflare 経由ではなく Node で動かす場合:

```bash
pnpm build
pnpm start
```

本番公開は `pnpm deploy` を使ってください。

## 差し替えが必要な箇所（公開前チェック）

- `lib/tracks.ts` — 曲タイトル・BPM・Key・再生時間・YouTube リンク
- `public/audio/` — 音源ファイル本体（Phase 1）。Phase 2 で R2 へ移行予定
- `components/footer.tsx` — YouTube / TikTok の実リンク
- `lib/site.ts` — 本番 `siteUrl`（現状 `https://lovelive-trance.com`）
- `public/images/` / `components/next-up.tsx` — ジャケット・ビジュアル素材

## 技術構成

- Next.js 15 (App Router) / React 19 / TypeScript
- Cloudflare Workers + [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)（Wrangler）
- Tailwind CSS（オーロラ配色のデザイントークンを `tailwind.config.ts` に定義）
- Framer Motion（フェードイン・スライド・パララックス・スクロール連動アニメーション）
- lucide-react（アイコン）
- Canvas による星空パーティクル（`components/starfield.tsx`）
- HTML5 Audio ベースの自作ミュージックプレイヤー（`components/providers/player-provider.tsx`）

## アクセシビリティ

- スキップリンク、フォーカスリング、aria-label / aria-live を主要インタラクションに設定
- `prefers-reduced-motion` に対応（アニメーションを自動的に抑制）
- キーボードのみで Lightbox の開閉・前後移動が可能（Esc / ← / →）
