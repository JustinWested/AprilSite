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
- `/` — HomePage (transparent nav, hero, 5 sections)
- `/vo` — Voice Over (placeholder)
- `/acting` — Acting (placeholder, supports #reels, #resumes, #photos anchors)
- `/films` — All Films (placeholder)
- `/buttstuff` — Butt Stuff film page (placeholder)
- `/pullingplugmom` — Pulling the Plug on Mom (placeholder)
- `/thisisagarden` — This Is a Garden (placeholder)
- `/norman` — Norman (placeholder)
- `/murder` — Murder is on the Table (placeholder)
- `/biteme` — Bite Me (placeholder)
- `/writing` — Writing (placeholder, supports #blog, #screenplays anchors)
- `/press` — Press & Podcasts (placeholder)
- `/contact` — Contact (placeholder)

## Nav Behavior
- `transparent={true}` (home only): frosted glass bg, dark text
- `transparent={false}` (all other pages): solid #2a1f3d bg, white text
- Active page: #E64398 color + 1.5px underline
- Dropdowns: Acting, Filmmaking, Writing — open on click (desktop), inline sub-items (mobile)

## How to Add a New Page
1. Create `src/pages/YourPage/YourPage.jsx` and `YourPage.module.css`
2. Wrap content in `<PageLayout>` (or `<PageLayout transparentNav={true}>` for hero pages)
3. Add route in `src/App.jsx`: `<Route path="/yourpath" element={<YourPage />} />`
4. Add nav link in `src/components/Nav/Nav.jsx` `navItems` array
5. Add footer link in `src/components/Footer/Footer.jsx` `footerNav` array

## External Services
- **Mailchimp:** Newsletter signup in Footer + Contact form. Action URL: `https://aprilyanko.us12.list-manage.com/subscribe/post?u=a77f48c271656e6046f2833df&id=1cd0d2c44e&f_id=00b2b7e0f0`. Includes hidden bot trap field.
- **YouTube:** Filmmaker reel embed on homepage: `https://www.youtube.com/embed/kvPVf9H4TUM`
- **Substack:** Blog at `https://ferretwithaknife.substack.com` — placeholder cards for now, RSS integration planned via Cloudflare Worker in a later stage.

## Remaining Work (Stage 3+)
- Voice Over page
- Acting page (PDF resume handling, reels, headshot gallery)
- Individual film pages (full content for each film)
- Writing page (Substack RSS via Cloudflare Worker)
- Press & Podcasts page
- Contact standalone page
- Wire up real Substack RSS feed on homepage
- Fill in real film modal content (loglines, full credits, watch links)
- Swap placeholder photos (`/images/hero.webp`) for actual photos where noted

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build
