This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# ClipsHub

# ClipsHub

## Playback servers (no API keys)

Each title's watch page shows **Server 1 - N** buttons just above the player.
Every server is an independent, keyless source for the same title. All of the
embed hosts are plain iframes - the provider renders its own player:

| Button | Provider   | Kind          | Base URL (override)        |
| ------ | ---------- | ------------- | -------------------------- |
| Server 1 | VidSrc    | Player/embed  | `https://vidsrc.link/embed` (`VIDSRC_BASE_URL`)   |
| Server 2 | SuperEmbed| Player/embed  | `https://multiembed.mov` (`SUPEREMBED_BASE_URL`)  |
| Server 3 | VidKing   | Player/embed  | `https://www.vidking.net` (`VIDKING_BASE_URL`)    |
| Server 4 | VidCore   | Player/embed  | `https://vidcore.org` (`VIDCORE_BASE_URL`)        |
| Server 5 | YapGrid   | Player/embed  | `https://yapgrid.com` (`YAPGRID_BASE_URL`)        |
| Server 6 | VidBolt   | Player/embed  | `https://vidbolt.pro` (`VIDBOLT_BASE_URL`)        |
| Server 7 | 2Embed    | Player/embed  | `https://www.2embed.cc` (`TWOEMBED_BASE_URL`)     |
| Server 8 | ezvidapi  | JSON + HLS    | `https://api.ezvidapi.com` (`EZVIDAPI_BASE_URL`)  |

Requests are keyed by TMDB id (plus season/episode on TV pages):

- Most hosts: `/{embed/}{movie|tv}/{id}[/{season}/{episode}]` (VidSrc, VidKing,
  VidCore, YapGrid, 2Embed).
- SuperEmbed: `multiembed.mov/?video_id={id}&tmdb=1[&s={season}&e={episode}]`
  (redirects to the streamingnow player).
- VidBolt: `/{movie|tv}/{id}[/{season}/{episode}]` (no `/embed` prefix).
- ezvidapi: JSON API returning `stream_url` (`.m3u8`) played in our built-in
  `<video>` via hls.js. The lookup goes through the small `/api/upstream`
  same-origin helper because the API omits CORS headers.

Verified 2026-09 in-browser: VidSrc, SuperEmbed, VidKing, VidCore (artplayer),
YapGrid (plays, 720p) and 2Embed all load players. VidBolt loads but its source
requests were rate-limited during testing. ezvidapi's service was offline at
every endpoint checked (502/525); its button stays live and shows a friendly
error until the service returns. Set any `*_BASE_URL` override in `.env.local`
to point at a mirror. If you deploy publicly, lock `/api/upstream` down with
`UPSTREAM_ALLOW_HOSTS=...`.

> **Consumet** is a different architecture - a self-hosted resolver API that
> returns `{ sources: [{ url, quality, isM3U8 }] }` and needs provider-specific
> ids, not a TMDB-keyed iframe. Wire it in as a JSON server once you run your
> Consumet instance and pick a provider.
