# April Yanko Portfolio — CLAUDE.md

## Overview
React + Vite SPA portfolio site for actor/writer April Yanko. Built with a sophisticated artistic design system featuring bokeh backgrounds, frosted glass cards, and pill-shaped UI elements.

## Tech Stack
- **Framework:** React 19 + Vite 8
- **Routing:** React Router DOM v7 (BrowserRouter)
- **Styling:** CSS Modules + global CSS custom properties
- **Font:** Raleway (400, 500, 700, 900) via Google Fonts CDN
- **Icons:** Font Awesome 6.5 via CDN

## Color Palette
Defined in two places (keep in sync):
- **CSS custom properties:** `src/index.css` (`:root` vars like `--deep-purple`)
- **JS constants:** `src/constants/colors.js` (exported `colors` object)

| Name | Hex | Usage |
|------|-----|-------|
| Deep Purple | `#2a1f3d` | Backgrounds, footer, nav solid mode |
| Dusty Blue | `#A1C3D1` | Bokeh blobs, accents |
| Soft Lavender | `#B39BC8` | Labels, borders, bokeh blobs |
| Hot Pink | `#E64398` | Primary accent, active states, CTAs |
| Brand Pink | `#c64191` | Secondary accent, hover states |
| Page Bg | `#faf8fc` | Page background |

## Design System

### Bokeh Background
Full-page fixed layer of large blurred gradient blobs at z-index 0. Component: `src/components/BokehBackground/`. All content sits at z-index 1+.

### Frosted Glass Cards
CSS class `.frosted-card` in `index.css`: semi-transparent white bg, backdrop blur, rounded corners, subtle lavender border.

### Pill Buttons
CSS class `.pill-btn` in `index.css`: border-radius 999px, hover lift + pink shadow.

### Pill Inputs
CSS class `.pill-input` in `index.css`: rounded 20px, subtle border, focus highlight.

### Section Dividers
Component: `src/components/SectionDivider/`. Centered gradient line using all palette colors, fades to transparent on edges.

## Project Structure
```
index.html              — Entry HTML (Raleway + Font Awesome CDN)
vite.config.js          — Vite + React plugin
src/
  main.jsx              — React root, BrowserRouter wrapping App
  App.jsx               — All routes + ScrollToTop utility
  index.css             — CSS custom properties, resets, utility classes
  constants/
    colors.js           — Exported color palette object
  components/
    BokehBackground/    — Full-page ambient blurred blobs
    Hero/               — Video background hero (home page only)
    Nav/                — 7-item nav, 3 dropdowns, mobile hamburger
    Footer/             — 3-column: socials | mailchimp | flat nav
    PageLayout/         — Standard page wrapper (Bokeh + Nav + Footer)
    SectionDivider/     — Gradient line divider
    FilmModal/          — Dark frosted glass modal for film details
  pages/
    HomePage/           — Full scrolling homepage (5 sections)
    PlaceholderPage/    — Generic "coming soon" for unbuilt pages
public/
  images/               — All static assets (photos, videos, PDFs, audio)
```

## Routing
All routes defined in `src/App.jsx`:
- `/` — HomePage (hero + 5 sections)
- `/films` — All Films grid (shared FilmModal component)
- `/reels` — Reels (placeholder — content pending)
- `/vo` — Voiceover (placeholder — content pending)
- `*` — unknown routes fall back to HomePage

Top-level site surfaces are intentionally minimal: **Filmmaking, Reels,
Voiceover, Substack**. Substack is an external link (opens
`https://ferretwithaknife.substack.com` in a new tab) — not a route on
this site. The previous Acting / Writing / Press / Contact placeholder
pages were removed; individual film routes are also gone (all film detail
renders through `FilmModal`, fed from `src/data/films.js`).

## Nav Behavior
- `transparent={true}` (home only): frosted glass bg, dark text
- `transparent={false}` (all other pages): solid #2a1f3d bg, white text
- Active page: #E64398 color + 1.5px underline
- No dropdowns — every item is a single top-level link
- Nav items support `external: true` + `href` for links that open in a new tab (Substack)

## How to Add a New Page
1. Create `src/pages/YourPage/YourPage.jsx` and `YourPage.module.css`
2. Wrap content in `<PageLayout>` (or `<PageLayout transparentNav={true}>` for hero pages)
3. Add route in `src/App.jsx`: `<Route path="/yourpath" element={<YourPage />} />`
4. Add nav link in `src/components/Nav/Nav.jsx` `navItems` array
5. Add footer link in `src/components/Footer/Footer.jsx` `footerNav` array

## External Services
- **Mailchimp:** Still used in the HomePage Contact section form. Action URL: `https://aprilyanko.us12.list-manage.com/subscribe/post?u=a77f48c271656e6046f2833df&id=1cd0d2c44e&f_id=00b2b7e0f0`. Includes hidden bot trap field.
- **Substack:** Blog at `https://ferretwithaknife.substack.com`.
  - Homepage right column: live feed (2 most recent posts) via Cloudflare Worker proxy at `https://substack-rss-proxy.justwested.workers.dev/`. Worker source: `workers/substack-proxy/`. Component: `src/components/SubstackFeed/`.
  - Subscribe widget (homepage right column + footer): `src/components/SubstackSubscribe/` — styled native form that opens Substack's subscribe page with the email prefilled. Replaces the old Mailchimp footer form.
- **YouTube:** Filmmaker reel on homepage (`kvPVf9H4TUM`) and film trailers. All use `src/components/YouTubePlayer/` — thumbnail-click-to-play, matches the FilmModal video styling.

## Reusable Components
- `YouTubePlayer` — thumbnail click → autoplay iframe, pink play button, optional label badge
- `SubstackFeed` — RSS feed parser; props: `count`
- `SubstackSubscribe` — inline email form; props: `variant: 'light' | 'dark'`
- `FilmModal` — shared modal for all films

## Remaining Work
- Reels page content
- Voiceover page content
- Fill in real film modal content (loglines, full credits, watch links) for remaining films
- Swap placeholder photos (`/images/hero.webp`) for actual photos where noted

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build
