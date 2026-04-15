# CLAUDE.md — April Yanko Portfolio Site

## Project Overview

React 18 + Vite 5 portfolio site for actor/writer April Yanko. No TypeScript. CSS Modules for all component styles. React Router v6 for client-side routing.

**Live dev server:** `npm run dev` (port 5173 by default)
**Build:** `npm run build`

---

## Tech Stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 18 | No TypeScript |
| Vite | 5 | ESM, `@vitejs/plugin-react` |
| React Router | v6 | `BrowserRouter`, nested routes, `<Outlet>` |
| CSS Modules | — | All component styles scoped via `.module.css` |
| Font Awesome | 6.5.0 | Via CDN in `index.html`, NOT npm |
| Google Fonts | — | Raleway + Fredoka, loaded via CSS `@import` in `index.css` |

---

## Design System

### Color Palette

| Name | Hex | JS Constant | CSS Variable |
|------|-----|-------------|--------------|
| Pink | `#c64191` | `PINK` | `--color-pink` |
| Teal | `#1CB0A9` | `TEAL` | `--color-teal` |
| Yellow | `#FEC601` | `YELLOW` | `--color-yellow` |
| Off-White | `#F3F3F4` | `OFF_WHITE` | `--color-offwhite` |

JS constants live in `src/constants/colors.js`. CSS variables defined in `src/index.css` on `:root`.

### Typography

- **Body font:** `'Raleway', sans-serif` — set globally on `body` in `index.css`
- **Display/fun font:** `'Fredoka', sans-serif` — used for `bioHeadline` on home page and `PlaceholderPage` titles
- **Font Awesome icons:** `<i className="fa-solid fa-...">` — CDN, works globally

### Design Language

- **Border radius:** `999px` for pill shapes (nav items, buttons, arrows)
- **Active/hover highlight:** Yellow background `#FEC601` + dark text `#5a4500`
- **Primary accent:** Pink `#c64191`
- **Secondary accent:** Teal `#1CB0A9`
- **Dividers:** `linear-gradient(to right, transparent, #c64191, transparent)` at 1px height

---

## File / Folder Structure

```
AprilSiteNEWShiny/
├── index.html                      # FA CDN link, root div
├── vite.config.js
├── package.json
├── public/
│   └── images/
│       ├── headerlq.mp4            # Hero background video
│       ├── fallback.webp           # Hero video poster
│       ├── cat.webp                # Cat image (bottom of home page)
│       ├── hero.webp               # Headshot in footer
│       ├── actorsaccess.webp       # Social icon in footer
│       └── indeximages/
│           ├── image1.webp         # Carousel slides 1–8
│           ├── image4.webp
│           ├── image5.webp
│           ├── image6.webp
│           ├── image7.webp
│           ├── image8.webp
│           ├── image9.webp
│           └── image10.webp
└── src/
    ├── main.jsx                    # ReactDOM.createRoot
    ├── App.jsx                     # Router, Layout wrapper, all routes
    ├── index.css                   # Global reset, fonts, CSS custom properties
    ├── constants/
    │   └── colors.js               # Exported JS color constants
    ├── components/
    │   ├── Nav/
    │   │   ├── Nav.jsx
    │   │   └── Nav.module.css
    │   ├── Footer/
    │   │   ├── Footer.jsx
    │   │   └── Footer.module.css
    │   ├── PageLayout/
    │   │   ├── PageLayout.jsx      # Yellow gutter + scalloped white column
    │   │   └── PageLayout.module.css
    │   └── Carousel/
    │       ├── Carousel.jsx        # Reusable image carousel
    │       └── Carousel.module.css
    └── pages/
        ├── HomePage/
        │   ├── HomePage.jsx
        │   └── HomePage.module.css
        └── PlaceholderPage/
            ├── PlaceholderPage.jsx
            └── PlaceholderPage.module.css
```

---

## Routing (`src/App.jsx`)

All routes share a `Layout` wrapper (Nav + Outlet + Footer).

```jsx
function Layout() {
  return (
    <>
      <Nav transparent={false} />
      <Outlet />
      <Footer />
    </>
  );
}
```

**Nav is always solid pink** (`transparent={false}` always). The `transparent` prop exists on Nav but is currently always false.

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `HomePage` | Full home page with hero + body |
| `/vo` | `PlaceholderPage` | title="Voice Over" |
| `/acting` | `PlaceholderPage` | title="Acting" |
| `/films` | `PlaceholderPage` | title="Films" |
| `/buttstuff` | `PlaceholderPage` | title="Butt Stuff" |
| `/pullingplugmom` | `PlaceholderPage` | title="Pulling the Plug on Mom" |
| `/thisisagarden` | `PlaceholderPage` | title="This Is a Garden" |
| `/norman` | `PlaceholderPage` | title="Norman" |
| `/murder` | `PlaceholderPage` | title="Murder is on the Table" |
| `/writing` | `PlaceholderPage` | title="Writing" |
| `/press` | `PlaceholderPage` | title="Press & Podcasts" |
| `/contact` | `PlaceholderPage` | title="Contact" |
| `*` | `PlaceholderPage` | title="Page Not Found" |

---

## Component Inventory

### `Nav` (`src/components/Nav/`)

- Fixed pink bar, 64px tall, `z-index: 100`
- 7 top-level items: Voice Over, Acting (dropdown), Films (dropdown), Writing, Press & Podcasts, Contact, and a Home link (logo/name)
- Dropdowns: Acting → [Stage / Screen / Improv & Sketch], Films → [individual film pages], Writing → sub-items
- **Active detection:** `getActiveTop()` in Nav.jsx maps current pathname to the top-level nav item. Film sub-pages (`/buttstuff`, `/pullingplugmom`, etc.) all highlight `/films` as active
- **Dropdown behavior:** click to open, click outside to close (via `useEffect` + `document.addEventListener`). Clicking the same item again closes it.
- **Mobile (≤ 900px):** Hamburger menu. Acting/Films/Writing become links with sub-items always visible in mobile drawer
- **Active style:** `background: #FEC601; color: #5a4500; border-radius: 999px`
- **Dropdown item hover:** `background: #FEC601; color: #5a4500`
- **All nav text:** solid `#fff` (not rgba)

### `Footer` (`src/components/Footer/`)

- Teal background (`#1CB0A9`), 3-column grid layout
- **Left column:** Social icons row (Instagram, YouTube, IMDb, Actors Access image icon) + circular headshot below
- **Center column:** Back-to-top button + Mailchimp mailing list form (action is `#` placeholder — needs real Mailchimp URL)
- **Right column:** Flat nav list, active page highlighted in yellow
- **Headshot styling:** 120px circle, `border: 5px solid #FEC601; box-shadow: 0 0 0 4px #c64191` (yellow ring + pink outer ring)
- **3D text shadow** on social icons and "Join my mailing list!" label: stacked pink text-shadows (`1px 1px 0 #c64191, 2px 2px 0 #c64191, 3px 3px 0 #c64191`)
- **Active detection:** `isActivePath()` uses `pathname.startsWith()` so film sub-pages highlight Films in footer nav
- **Mobile (≤ 700px):** Collapses to single column

### `PageLayout` (`src/components/PageLayout/`)

Wraps the body content of every page (everything below the hero). Provides the yellow gutter + scalloped white column look.

```jsx
<PageLayout>
  {/* page content */}
</PageLayout>
```

**How the scallops work:**

CSS `mask` with three layers composited via default `add` mode:

1. **Middle fill** — solid opaque strip from `x = 2s` to `x = 100% - 2s`. Covers the column body.
2. **Left scallops** — `radial-gradient` circle at left edge of each `2s × 2s` tile. Inside circle = transparent (cutout), outside = opaque. Repeats vertically. The middle fill doesn't cover this zone, so the holes are genuine cutouts showing yellow behind.
3. **Right scallops** — mirror of #2 on the right edge.

The `--s` custom property (`18px`) controls scallop size. Both `-webkit-mask` and `mask` are set for compatibility.

**Mobile (≤ 768px):** Column goes `width: 100%`, `mask: none` (scallops removed).

**Content padding:** `3rem 2.5rem 4rem` desktop, `2rem 1.25rem 3rem` mobile.

### `Carousel` (`src/components/Carousel/`)

Reusable component. Accepts a `slides` prop.

**Slide shape:**
```js
{
  image: '/images/indeximages/image1.webp',  // path from public/
  title: 'Slide Title',
  html: 'Text with <a href="...">links</a>',  // rendered via dangerouslySetInnerHTML
}
```

**Features:**
- Auto-advances every 5s via `setInterval`
- Pauses on `mouseenter`, resumes on `mouseleave`
- Manual nav via arrows or thumbnail click resets the interval
- Fade transition: `opacity 0.35s ease` via `.fading` class added during `goTo()`
- Thumbnail strip scrolls horizontally (single row, `flex-wrap: nowrap`), scrollbar hidden visually. Active thumb gets pink `border-color: #c64191`
- Thumbnail strip auto-scrolls to keep active thumb visible via manual `strip.scrollLeft` calculation (does NOT use `scrollIntoView` — that caused the whole page to scroll)

**Layout:** Capsule wrapper (`border-radius: 14px; overflow: hidden`) with image on top (16:9 aspect ratio) and teal info panel below. Arrow buttons overlay the image. Max-width `660px` (set in Carousel.module.css directly).

**Link styling:** Links inside `slideText` are pink (`#c64191`), bold, no underline, underline on hover.

**Do NOT add `scrollIntoView` to any Carousel useEffect** — this breaks page scroll behavior.

---

## Page Layout Pattern

Every real page follows this pattern:

```jsx
import PageLayout from '../../components/PageLayout/PageLayout';
import styles from './MyPage.module.css';

export default function MyPage() {
  return (
    <PageLayout>
      {/* page content */}
    </PageLayout>
  );
}
```

If the page has a full-width hero (like HomePage), it goes **outside** `<PageLayout>`:

```jsx
export default function MyPage() {
  return (
    <>
      <section className={styles.hero}>
        {/* full-width hero */}
      </section>
      <PageLayout>
        {/* body content */}
      </PageLayout>
    </>
  );
}
```

The `.narrow` utility class (defined in `HomePage.module.css`) caps content at 660px centered. Copy it into new page CSS files if needed:
```css
.narrow {
  max-width: 660px;
  margin-left: auto;
  margin-right: auto;
}
```

---

## How to Add a New Page

1. Create `src/pages/MyPage/MyPage.jsx` and `MyPage.module.css`
2. Wrap content in `<PageLayout>`
3. Import and add a `<Route>` in `src/App.jsx`
4. Remove or replace the `PlaceholderPage` entry for that route

Example:
```jsx
// src/pages/MyPage/MyPage.jsx
import PageLayout from '../../components/PageLayout/PageLayout';
import styles from './MyPage.module.css';

export default function MyPage() {
  return (
    <PageLayout>
      <h1 className={styles.title}>My Page</h1>
    </PageLayout>
  );
}
```

```jsx
// src/App.jsx — add import and route
import MyPage from './pages/MyPage/MyPage';
// ...
<Route path="/mypage" element={<MyPage />} />
```

---

## `PlaceholderPage`

Used for all routes not yet implemented. Accepts a `title` prop.

```jsx
<Route path="/vo" element={<PlaceholderPage title="Voice Over" />} />
```

Renders: pink Fredoka title + "Coming soon — check back later!" inside `PageLayout`.

---

## Known TODOs / Pending Work

- **Mailchimp URL:** Footer form `action` is `#` — needs real Mailchimp embed URL
- **Social media URLs:** Footer social icons use generic platform URLs, not April's real profile URLs
- **Stage 3+ pages:** All non-home routes are PlaceholderPage. Pages to build: Voice Over, Acting, Films (index + individual film pages), Writing, Press & Podcasts, Contact
- **Individual film pages** (`/buttstuff`, `/pullingplugmom`, `/thisisagarden`, `/norman`, `/murder`) — currently PlaceholderPage, will each get real content
- **`transparent` Nav prop** — wired up but currently always `false`. Could be used for a future page with a full-bleed hero that needs a transparent nav overlay

---

## Conventions

- **No TypeScript** — plain `.jsx` and `.js`
- **CSS Modules only** — no Tailwind, no inline styles (except minor one-offs)
- **No default exports from `constants/`** — all named exports
- **Images in `public/images/`** — referenced as `/images/...` (no import needed)
- **External links:** always include `target="_blank" rel="noopener noreferrer"`
- **Font Awesome:** `<i className="fa-solid fa-icon-name" />` — loaded via CDN, no npm package
- **No `scrollIntoView` in Carousel** — causes page scroll; use manual `strip.scrollLeft` instead
- **`dangerouslySetInnerHTML`** in Carousel for slide HTML — allows inline links in slide descriptions
