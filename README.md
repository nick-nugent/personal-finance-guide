# Personal Finance Guide

A Next.js App Router project that will guide users through building a personal finance plan. The initial release provides the foundational UI, styling, and testing setup for future features.

## Getting started

1. Install dependencies:
   ```bash
   pnpm install
   ```
   > If you prefer npm, run `npm install` instead.
2. Start the development server:
   ```bash
   pnpm dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server. |
| `pnpm build` | Create an optimized production build. |
| `pnpm start` | Run the production server after building. |
| `pnpm lint` | Run ESLint using Next.js configuration. |
| `pnpm format` | Format the project with Prettier. |
| `pnpm check-types` | Run the TypeScript compiler in no-emit mode. |
| `pnpm test:e2e` | Execute Playwright smoke tests. |

## Testing

End-to-end tests are implemented with Playwright. To run them locally, ensure the development server is running (`pnpm dev`) and execute:

```bash
pnpm exec playwright test
```

The smoke test verifies that the homepage renders correctly, the call-to-action button is visible, and that navigating to `/flowchart` currently returns a 404 as a placeholder.
