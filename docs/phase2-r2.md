# Phase 2: 音源を Cloudflare R2 へ移す

Phase 1 ではサイトを Cloudflare Workers（OpenNext）に載せ、音源は `public/audio/` から配信している。  
聴く人が増えたら **音源だけ R2** に移し、Workers の転送負担を下げる。

関連:

- 短い Cursor ルール: `.cursor/rules/phase2-r2-audio.mdc`
- 概要: `README.md` の「ホスティング方針」「Phase 2」

## 現状（Phase 1 完了時のメモ）

| 項目 | 値 |
| --- | --- |
| 本番 URL | `https://lovelive-trance.com` / `https://www.lovelive-trance.com` |
| Worker 名 | `lovelive-trance` |
| レジストラ | お名前.com（NS は Cloudflare: 例 `brit.ns.cloudflare.com` / `jaxson.ns.cloudflare.com`） |
| 音源 | `public/audio/*.m4a` → `lib/tracks.ts` の `audioSrc` |
| デプロイ | `pnpm run deploy`（`pnpm deploy` ではない） |

### DNS でハマったこと（再発防止）

- ゾーンを Cloudflare に入れただけではサイトは開かない。Worker の **Domains → Add Domain** が必要。
- ルート／`www` に残ったお名前.com 由来の **A / NS** があるとカスタムドメイン追加や `www` 接続が失敗する。
- 特に `www` 向け **NS → dns1/dns2.onamae.com** は削除が必要だった（Worker レコードは残す）。

## いつ Phase 2 に進むか

次のどれかに当てはまったら検討する。

- 再生数が増え、Workers / 帯域の利用や制限が気になり始めた
- 音源追加でデプロイ成果物や Git が大きくなりすぎた
- プレビュー・デプロイが重い

## 手順チェックリスト

### 1. R2 バケット作成

- [ ] Cloudflare Dashboard → **R2** → バケット作成（例: `lovelive-trance-audio`）
- [ ] 音源用バケットと、将来の OpenNext キャッシュ用バケットは**別名**にする
- [ ] 公開読み取りの方法を決める（下記いずれか）
  - R2 カスタムドメイン（推奨・例: `audio.lovelive-trance.com`）
  - または R2 公開 URL / Workers 経由プロキシ

### 2. オブジェクトをアップロード

- [ ] `public/audio/` の各 m4a をバケットへアップロード（キーは分かりやすいパスに揃える）
- [ ] Content-Type を `audio/mp4`（m4a）など適切に設定
- [ ] ブラウザでオブジェクト URL を直接開き、再生できることを確認

### 3. CORS（必要な場合）

サイトオリジンから `<audio>` で読むため、問題が出たら R2 / カスタムドメイン側で CORS を許可する。

例（方針のメモ）:

- Allow Origins: `https://lovelive-trance.com`, `https://www.lovelive-trance.com`, 開発時は `http://localhost:3000`
- Allow Methods: `GET`, `HEAD`
- Allow Headers: 必要最小限（`Range` を使うプレイヤーなら Range 関連も確認）

### 4. アプリ側の変更

- [ ] `lib/tracks.ts` の各 `audioSrc` を R2 公開 URL に変更  
  例: `"/audio/foo.m4a"` → `"https://audio.lovelive-trance.com/foo.m4a"`
- [ ] ローカル `pnpm dev` と `pnpm run preview` で全曲再生を確認
- [ ] `pnpm run deploy` 後、本番でも再生確認

### 5. リポジトリの整理

- [ ] 大きな音源を `public/audio/` から削除（または Git LFS / 配布対象外に）
- [ ] `public/audio/README.txt` などに「本番は R2。ローカル用は各自配置」と追記
- [ ] README の Phase 1 / 2 表記を「Phase 2 運用中」に更新

### 6. （任意）OpenNext キャッシュ用 R2

音源移行とは別作業。

- [ ] キャッシュ用バケット作成
- [ ] `wrangler.jsonc` に `NEXT_INC_CACHE_R2_BUCKET` バインディング
- [ ] `open-next.config.ts` で `r2IncrementalCache` を有効化

詳細は [OpenNext Cloudflare Caching](https://opennext.js.org/cloudflare) を参照。

## 触るファイル（目安）

| ファイル | 変更内容 |
| --- | --- |
| `lib/tracks.ts` | `audioSrc` を R2 URL へ |
| `public/audio/` | 本番音源を削除またはローカル専用に |
| `wrangler.jsonc` | 音源は通常バインディング不要（公開 URL 方式）。キャッシュ用のみ binding |
| `open-next.config.ts` | キャッシュ導入時のみ |
| `README.md` | Phase 表記の更新 |

プレイヤー実装（`player-provider.tsx`）は URL 文字列を渡しているだけなので、**基本は `tracks.ts` の変更で足りる**。

## 完了条件

- [ ] `https://lovelive-trance.com` で全曲再生できる（音源は R2）
- [ ] `public/audio/` に本番用の大きなファイルを置いてデプロイしていない
- [ ] 必要なら `www` → apex のリダイレクトも整理済み
