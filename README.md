# Perfect Stitch — Marketing Web

Next.js 16 marketing site (public landing, about, contact). Lives in the monorepo under `marketing-web/`.

## Git branch

- **Branch:** `marketing-web` (based on `main`, one commit ahead with this folder)
- **Dedicated worktree:** `D:\Office\Moozz\Perfect-Stitch-marketing-web` — use this for marketing-only work without touching `webadmin` / mobile changes
- **Push:** `git push -u origin marketing-web` (from the worktree or main repo after `git checkout marketing-web`)

## Vercel (monorepo)

Import the repo, set **Root Directory** to `marketing-web`, framework Next.js. See `.env.example` for contact form env vars.

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
