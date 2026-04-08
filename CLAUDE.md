# CLAUDE.md — AprilSite Reference Guide

Actor portfolio site for April Yanko. Pure HTML/CSS/JS — no build system, no framework, no package manager. Hosted on Cloudflare Pages.

---

## Table of Contents
1. [File Inventory](#file-inventory)
2. [Design System](#design-system)
3. [Header Patterns](#header-patterns)
4. [Navigation](#navigation)
5. [Footer](#footer)
6. [CSS Conventions](#css-conventions)
7. [JavaScript API](#javascript-api)
8. [Film Page Template](#film-page-template)
9. [films.html Listing Entry](#filmshtml-listing-entry)
10. [Known Bugs](#known-bugs)
11. [Improvement Suggestions](#improvement-suggestions)

---

## File Inventory

| File | Purpose |
|------|---------|
| `index.html` | Homepage: bio, fun facts, news carousel with descriptions |
| `contact.html` | Mailchimp contact form + talent agent info |
| `press.html` | Press mentions, podcast appearances, external links |
| `oncam.html` | Acting reels (YouTube embeds) + PDF resumes |
| `photos.html` | Headshots, candid, production photos (masonry + lightbox) |
| `vo.html` | Voice over audio samples + testimonial + videos |
| `writing.html` | Sketch, sketch-a-day, articles — external links |
| `films.html` | All films listing page (poster + short description per film) |
| `buttstuff.html` | Film page: *Butt Stuff* |
| `murder.html` | Film page: *Murder is on the Table* |
| `norman.html` | Film page: *Norman* |
| `pullingplugmom.html` | Film page: *Pulling the Plug on Mom* |
| `thisisagarden.html` | Film page: *this is a garden* |
| `css/reset.css` | Meyer CSS reset (do not edit) |
| `css/style.css` | All site styles (2,356 lines) |
| `js/main.js` | All interactivity: gallery, scroll, lightbox, nav |
| `_headers` | Cloudflare Pages security + cache headers |

**Asset directories under `images/`:**
- `indeximages/` — 10 homepage carousel images (`image1.webp`–`image11.webp`)
- `headshot/` — 12 professional headshots
- `candid/` — 11 behind-the-scenes/candid photos
- `production/` — 31 general production stills
- `films/` — film posters, headers, and sub-folders per film:
  - `buttprod/`, `murderprod/`, `normprod/`, `plugprod/`, `gardenprod/`
- `audio/` — 3 MP3 voice over demos
- Root: `Headerlq.mp4` (hero video), `hero.webp`, `fallback.webp`, `AprilYankosmall.webp`, resume PDFs

---

## Design System

### CSS Variables (defined in `style.css :root`)
```css
--pink-color:      #c64191   /* Primary: header bar, buttons, accents */
--teal-color:      #1CB0A9   /* Secondary: footer background */
--yellow-color:    #FEC601   /* Body background (visible in gutters) */
--darkgreen-color: #1A5E63   /* Dark text/accent (sparingly used) */
--offwhite-color:  #F3F3F4   /* Main content background */
```

### Typography
- Font: **Raleway** via Google Fonts
- Weights loaded: 100, 300, 400, 500, 700, 900
- Base size: `1rem` on `body`
- All links: `text-decoration: none; color: black` by default

### Layout
- Main container: `.middle-container` — `width: 1100px; margin: 0 auto`
- `main` element background: `var(--offwhite-color)`
- Body background (gutters): `var(--yellow-color)`
- Box sizing: `border-box` on all elements

### External Dependencies (CDN)
All pages include:
```html
<!-- Google Fonts: Raleway -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<script src="https://kit.fontawesome.com/21695ac8bb.js" crossorigin="anonymous"></script>
```

Film pages additionally include:
```html
<!-- Flickity carousel -->
<link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
<!-- (Flickity JS loaded at bottom of <main>, before </main>) -->
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
```

---

## Header Patterns

There are **two header variants**. Use the correct one per page type.

### Homepage Header (`index.html` only)
Full-height (550px) with background video and fallback image.
```html
<header>
  <!-- fallback image sits behind video -->
  <img class="fallbackImage" src="images/fallback.webp" alt="...">
  <video class="head-vid" autoplay muted loop playsinline poster="images/hero.webp">
    <source src="images/Headerlq.mp4" type="video/mp4">
  </video>
  <!-- navigation goes here (see Navigation section) -->
  <h1>APRIL YANKO</h1>
  <span>Actor | Writer | Overall Weirdo</span>
</header>
```

### Sub-page Header (all other pages)
Compact pink bar (74px). **This is what you'll use for any new page.**
```html
<header class="sub-page-header">
  <!-- navigation goes here (see Navigation section) -->
</header>
```

---

## Navigation

The nav is **identical** on every page. Copy this block verbatim into both the homepage header and the sub-page header. The only thing that changes per page is the `class="current-page"` in the footer nav (not the header nav).

```html
<!-- HAMBURGER MENU (mobile) -->
<button class="hamburger-menu">
  <nav>
    <i class="fa-solid fa-bars fa-lg" style="color: #F3F3F4;"></i>
    <ul class="menu">
      <li><a href="index.html">Home</a></li>
      <li><a href="vo.html">Voice Over</a></li>
      <li><a href="oncam.html#reels-section">Acting</a></li>
        <ul class="mobile-dropdown">
          <li><a href="/oncam.html#reels-section">Reels</a></li>
          <li><a href="/oncam.html#acting-resume">Resumes</a></li>
          <li><a href="photos.html">Photos</a></li>
        </ul>
      <li><a href="films.html">Films</a></li>
        <ul class="mobile-dropdown">
          <li><a href="films.html">All Films</a></li>
          <li><a href="buttstuff.html">Butt Stuff</a></li>
          <li><a href="pullingplugmom.html">Pulling the Plug on Mom</a></li>
          <li><a href="thisisagarden.html">this is a garden</a></li>
          <li><a href="norman.html">Norman</a></li>
          <li><a href="murder.html">Murder is on the Table</a></li>
          <!-- ADD NEW FILM HERE -->
        </ul>
      <li><a href="writing.html">Writing</a></li>
        <ul class="mobile-dropdown">
          <li><a href="films.html">Films</a></li>
          <li><a href="/oncam.html#writing-resume">Writing Resume</a></li>
          <li><a href="writing.html">Sketch</a></li>
          <li><a href="/writing.html#articles">Articles</a></li>
        </ul>
      <li><a href="press.html">Press &amp; Podcasts</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
</button>

<!-- DESKTOP DROPDOWN NAV -->
<nav>
  <ul class="menu">
    <li><a href="index.html">Home</a></li>
    <li><a href="vo.html">Voice Over</a></li>
    <li class="dropdown">
      <a>Acting</a>
      <ul class="dropdown-menu">
        <li><a href="/oncam.html#reels-section">Reels</a></li>
        <li><a href="/oncam.html#acting-resume">Resumes</a></li>
        <li><a href="photos.html">Photos</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a>Films</a>
      <ul class="dropdown-menu">
        <li><a href="films.html">All Films</a></li>
        <li><a href="buttstuff.html">Butt Stuff</a></li>
        <li><a href="pullingplugmom.html">Pulling the Plug on Mom</a></li>
        <li><a href="thisisagarden.html">this is a garden</a></li>
        <li><a href="norman.html">Norman</a></li>
        <li><a href="murder.html">Murder is on the Table</a></li>
        <!-- ADD NEW FILM HERE -->
      </ul>
    </li>
    <li class="dropdown">
      <a>Writing</a>
      <ul class="dropdown-menu">
        <li><a href="films.html">Films</a></li>
        <li><a href="/oncam.html#writing-resume">Writing Resume</a></li>
        <li><a href="writing.html">Sketch</a></li>
        <li><a href="/writing.html#articles">Articles</a></li>
      </ul>
    </li>
    <li><a href="press.html">Press &amp; Podcasts</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

> **When adding a new film:** Add a `<li>` entry to both the mobile-dropdown and the desktop dropdown-menu Films lists in **every HTML file** (all 13 pages). This is the primary maintenance burden of the current architecture — see Improvement Suggestions.

---

## Footer

The footer is **identical** on every page. The only change per page is the `class="current-page"` on the active nav link in `.foot-nav`.

```html
<footer>
  <section class="footer-content">

    <section class="footer-left">
      <ul class="social-icons">
        <li><a href="https://www.imdb.me/aprilyanko" target="_blank"><i class="fab fa-imdb"></i></a></li>
        <li><a href="https://twitter.com/post_march" target="_blank"><i class="fab fa-x-twitter"></i></a></li>
        <li><a href="https://www.instagram.com/post.march/" target="_blank"><i class="fab fa-instagram"></i></a></li>
        <li><a href="https://www.youtube.com/@postmarch/videos" target="_blank"><i class="fab fa-youtube"></i></a></li>
        <li><a href="https://resumes.actorsaccess.com/aprilyanko" target="_blank"><img src="images/actoraccess.webp"></a></li>
      </ul>
      <img src="/images/AprilYankosmall.webp" alt="Small Photo of April Yanko looking super cute and quirky">
    </section>

    <section class="footer-center">
      <a href="#top"><i class="fa-regular fa-circle-up" style="color: #ffffff;"></i></a>
      <!-- Mailchimp signup form — copy from any existing page, do not modify the action URL -->
      <!-- BEGIN MAILCHIMP EMBED (copy verbatim from existing page) -->
    </section>

    <section class="footer-right">
      <ul class="foot-nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="vo.html">Voice Over</a></li>
        <li><a href="oncam.html">Acting</a></li>
        <!-- Set class="current-page" on the link matching the current page -->
        <li><a href="films.html">Films</a></li>
        <li><a href="writing.html">Writing</a></li>
        <li><a href="press.html">Press &amp; Podcasts</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </section>

  </section>
</footer>
```

**Footer grid:** 25% | 50% | 25%, height 270px, background `var(--teal-color)`.

---

## CSS Conventions

### Naming Patterns
- Page-level main classes: `[page]-main` (e.g., `contact-main`, `film-main`, `writing-main`)
- Film pages use a two-class system: `butt-main` (shared base) + `[film]-main` (film-specific overrides)
- Film sections follow `[film]-[section]` (e.g., `butt-hero-container`, `plug-about`, `garden-stills`)
- Gallery IDs: `[film]-thumbs`, `current-[film]-image`, `scroll-[film]-left`, `scroll-[film]-right`

### Utility Classes
| Class | Behavior |
|-------|----------|
| `.hidden` | `display: none` — used to show/hide lightbox, description overlay |
| `.show` | Toggled by JS to display mobile menu |
| `.fade-in` / `.fade-out` | CSS transitions for gallery image cycling |
| `.current-page` | Marks active nav link in footer |
| `.clearfix` | Float-clearing hack |

### Section Structure Pattern
Most content sections follow:
```html
<section class="[section-name]">
  <h4>Section Title</h4>
  <!-- content -->
</section>
```

Film page section headings use `<h4>`. The about section uses `<h1>` for the film title and `<h3>` for "Film Details". Credits use `<h6>` for role labels.

---

## JavaScript API

All JS lives in `js/main.js`. The script tag goes **inside `<main>`, just before `</main>`**:
```html
<script type="text/javascript" src="js/main.js"></script>
```

For film pages, also add Flickity after that:
```html
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
```

### `createImageGallery()`
Creates a thumbnail strip + main image display with optional descriptions and auto-cycling.

```js
createImageGallery(
  thumbsContainerId,    // string: ID of the empty <div> where thumbnails get injected
  currentImageId,       // string: ID of the <img> that shows the current large image
  descriptionId,        // string: ID of the description overlay element (pass "description" even if unused)
  imageFiles,           // string[]: array of image paths
  includeDescriptions,  // boolean: true = show hover description overlay (index page only)
  autoCycle             // boolean: true = auto-cycle every 7 seconds
);
```

**Notes:**
- Descriptions are hard-coded as an array inside `main.js` (the `descriptions[]` array at the top of the function). Film pages pass `false` for `includeDescriptions` so descriptions don't show.
- The `descriptionId` parameter is still required even when `includeDescriptions` is `false` — pass `"description"` as a placeholder.
- Must be called inside `document.addEventListener("DOMContentLoaded", () => { ... })`.

**Example (film stills, no descriptions, with auto-cycle):**
```js
document.addEventListener("DOMContentLoaded", () => {
  createImageGallery(
    "slug-thumbs",           // matches id="slug-thumbs" in HTML
    "current-slug-image",    // matches id="current-slug-image" in HTML
    "description",
    [
      "images/films/slugprod/image1.webp",
      "images/films/slugprod/image2.webp",
      // ...
    ],
    false,  // no descriptions
    true    // auto-cycle
  );
});
```

### `createScrollFunctionality()`
Adds left/right scroll arrows to a thumbnail strip.

```js
createScrollFunctionality(
  scrollLeftId,     // string: ID of the left arrow <i> element
  scrollRightId,    // string: ID of the right arrow <i> element
  thumbContainerId  // string: ID of the thumbnails container (same as thumbsContainerId above)
);
```

**Example:**
```js
document.addEventListener("DOMContentLoaded", () => {
  createScrollFunctionality("scroll-slug-left", "scroll-slug-right", "slug-thumbs");
});
```

> **Important:** When adding a new film gallery, you must add both `createImageGallery()` and `createScrollFunctionality()` calls to `main.js`. There is no auto-discovery.

---

## Film Page Template

Use this scaffold for any new film page. Replace all `{{PLACEHOLDERS}}` and review all `<!-- NOTES -->`.

**Required assets before starting:**
- `images/films/{{SLUG}}head.webp` — wide hero/header image
- `images/films/{{SLUG}}title.webp` — title treatment image (or use an `<h1>` if no graphic title exists)
- `images/films/{{SLUG}}Poster.webp` — film poster
- `images/films/{{SLUG}}prod/` — folder of production stills (`.webp`)
- Add gallery calls to `js/main.js` (see JS API section above)

**Naming convention for `{{SLUG}}`:** Short lowercase word used as the prefix for all IDs and classes on this page (e.g., `butt`, `norm`, `garden`, `plug`, `murder`). Keep it short — it appears in 6+ places.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="{{FILM_TITLE}} — a film by April Yanko">
    <meta name="keywords" content="April Yanko, film, {{FILM_TITLE}}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{FILM_TITLE}} by April Yanko</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">

    <script src="https://kit.fontawesome.com/21695ac8bb.js" crossorigin="anonymous"></script>
  </head>
  <body>

    <!-- =============================================
         SUB-PAGE HEADER + NAVIGATION
         Copy nav verbatim; add new film to Films
         dropdowns in both mobile and desktop navs
         ============================================= -->
    <header class="sub-page-header">
      <!-- PASTE FULL NAVIGATION BLOCK HERE (see Navigation section of CLAUDE.md) -->
      <!-- Remember to add {{FILM_TITLE}} to the Films dropdown in EVERY html file -->
    </header>

    <div class="middle-container">
      <main class="butt-main {{SLUG}}-main">
        <!-- =============================================
             HERO SECTION
             Large banner image + title + watch link
             ============================================= -->
        <section class="{{SLUG}}-hero-container">
          <!-- Wide atmospheric header image — typically a production still or key art -->
          <img class="{{SLUG}}head" src="/images/films/{{SLUG}}head.webp" alt="{{FILM_TITLE}}">
          <!-- Graphic title treatment image. If none exists, replace with: <h1>{{FILM_TITLE}}</h1> -->
          <img class="{{SLUG}}title" src="/images/films/{{SLUG}}title.webp" alt="{{FILM_TITLE}} title">
          <!-- Link to trailer or watch page. Remove <span> entirely if no trailer exists yet. -->
          <span>
            <i class="fa-solid fa-eye fa-2xs" style="color: #000000;"></i>
            <a href="{{TRAILER_URL}}" target="_blank"> Watch the Trailer</a>
          </span>
          <!-- OPTIONAL: 48 Hour Film Project logo — include only if applicable -->
          <!-- <img class="forty-eight-logo" src="/images/films/48HourLogo.webp" alt="48 Hour Film Project"> -->
        </section>

        <!-- =============================================
             ABOUT / SYNOPSIS SECTION
             Poster + text details
             ============================================= -->
        <section class="film-about {{SLUG}}-about">
          <img src="/images/films/{{SLUG}}Poster.webp" alt="poster for {{FILM_TITLE}} by April Yanko">
          <aside class="about-text">
            <h1>About the Film</h1>
            <span>{{SYNOPSIS_ONE_OR_TWO_SENTENCES}}</span>
            <!-- OPTIONAL: link to crowdfunding, streaming, etc. Remove if not applicable. -->
            <!-- <a href="{{EXTERNAL_URL}}" target="_blank"><i class="fa-solid fa-angles-right"></i> {{LINK_LABEL}}</a> -->
            <h3>Film Details</h3>
            <ul>
              <li>{{GENRE}} | {{GENRE2}}</li>
              <li><i class="fa-solid fa-language fa-xs"></i> Language: {{LANGUAGE}}</li>
              <li><i class="fa-solid fa-people-group fa-xs"></i> Rating: {{RATING}}</li>
              <li><i class="fa-solid fa-piggy-bank fa-xs"></i> Production: {{PRODUCTION_COMPANY}}</li>
            </ul>
            <!-- OPTIONAL: availability note -->
            <!-- <span>({{FILM_TITLE}} is currently in its festival run and is not available for public viewing.)</span> -->
          </aside>
        </section>

        <!-- =============================================
             PRODUCTION STILLS GALLERY
             Requires createImageGallery() + createScrollFunctionality()
             calls in js/main.js using IDs below
             ============================================= -->
        <section class="stills {{SLUG}}-stills">
          <h4>Stills</h4>
          <section id="image-gallery">
            <div id="image-wrapper">
              <!-- src should match first image in the array passed to createImageGallery() -->
              <img id="current-{{SLUG}}-image" class="lightbox-image"
                   src="images/films/{{SLUG}}prod/{{FIRST_IMAGE}}.webp" alt="Image 1">
            </div>
            <div id="{{SLUG}}-thumbs-wrapper">
              <i id="scroll-{{SLUG}}-left" class="fa-solid fa-circle-left scroll-arrow" style="color: #f3f3f4"></i>
              <div id="{{SLUG}}-thumbs"></div>
              <i id="scroll-{{SLUG}}-right" class="fa-solid fa-circle-right scroll-arrow" style="color: #f3f3f4"></i>
            </div>
          </section>
        </section>

        <!-- =============================================
             BEHIND THE SCENES GALLERY (OPTIONAL)
             Include only if BTS photos exist.
             Requires a second createImageGallery() +
             createScrollFunctionality() call in main.js
             ============================================= -->
        <!--
        <section class="stills {{SLUG}}-bts-stills">
          <h4>Behind the Scenes</h4>
          <section id="image-gallery">
            <div id="image-wrapper">
              <img id="current-{{SLUG}}-bts-image" class="lightbox-image"
                   src="images/films/{{SLUG}}prod/{{FIRST_BTS_IMAGE}}.webp" alt="Image 1">
            </div>
            <div id="{{SLUG}}-bts-thumbs-wrapper">
              <i id="scroll-{{SLUG}}-bts-left" class="fa-solid fa-circle-left scroll-arrow" style="color: #1CB0A9"></i>
              <div id="{{SLUG}}-bts-thumbs"></div>
              <i id="scroll-{{SLUG}}-bts-right" class="fa-solid fa-circle-right scroll-arrow" style="color: #1CB0A9"></i>
            </div>
          </section>
        </section>
        -->

        <!-- Lightbox — required for .lightbox-image click-to-expand to work -->
        <div id="lightbox" class="lightbox hidden">
          <img id="lightbox-img" src="" alt="">
        </div>

        <!-- =============================================
             ACCOLADES (OPTIONAL)
             Include only if there are reviews or nominations.
             Add/remove .accolades-element blocks as needed.
             ============================================= -->
        <!--
        <section class="accolades">
          <h4>Accolades</h4>
          <div class="accolades-container">

            <section class="articles accolades-element">
              <h6>Articles</h6>
              <a href="{{ARTICLE_URL}}">{{PUBLICATION_NAME}}</a><br>
            </section>

            <section class="nominations accolades-element">
              <h6>{{FESTIVAL_NAME}}</h6>
              <span>Nominated for {{AWARD}}</span>
              <span>Winner {{AWARD}}</span>
            </section>

            <section class="nominations accolades-element">
              <h6>Official Acceptance</h6>
              <span>{{FESTIVAL_NAME}}</span>
            </section>

          </div>
        </section>
        -->

        <!-- =============================================
             Q&A / FAQ SECTION (OPTIONAL)
             Used on buttstuff.html. Include if there are
             common audience questions worth addressing.
             ============================================= -->
        <!--
        <section class="faq">
          <h4>FAQs</h4>
          <span>{{QUESTION}}</span>
          <span>{{ANSWER}}</span>
        </section>
        -->

        <!-- =============================================
             CREDITS
             Add/remove <span> blocks for each role.
             <h6> = role label, text node = name(s)
             ============================================= -->
        <section class="credits">
          <h4>Credits</h4>
          <section class="credit-wrapper">
            <span><h6>Written and Directed by</h6>{{DIRECTOR}}</span>
            <span><h6>Produced by</h6>{{PRODUCERS}}</span>
            <span><h6>Starring</h6>{{CAST}}</span>
            <span><h6>Cinematography</h6>{{DP}}</span>
            <!-- Add additional credit spans as needed -->
          </section>
        </section>

        <!-- =============================================
             OTHER FILMS CAROUSEL
             List all OTHER films (not this one).
             Flickity is initialized automatically via
             the js-flickity class + data attribute.
             Posters are duplicated in the HTML to fill
             the carousel visually on wider screens.
             ============================================= -->
        <section class="other-films">
          <h4>Other Films</h4>
          <div class="main-gallery main-carousel js-flickity"
               data-flickity-options='{ "cellAlign": "left", "contain": true, "wrapAround": true, "pageDots": false, "imagesLoaded": true}'>
            <!-- Include all films EXCEPT the current one -->
            <!-- Posters are intentionally duplicated to fill wide viewports -->
            <a class="carousel-cell" href="buttstuff.html"><img src="/images/films/ButtStuffPoster.webp"></a>
            <a class="carousel-cell" href="murder.html"><img src="/images/films/MurderPoster.webp"></a>
            <a class="carousel-cell" href="thisisagarden.html"><img src="/images/films/GardenPoster.webp"></a>
            <a class="carousel-cell" href="pullingplugmom.html"><img src="/images/films/MomPoster.webp"></a>
            <a class="carousel-cell" href="norman.html"><img src="/images/films/NormanPoster.webp"></a>
            <!-- Duplicate set for visual fill -->
            <a class="carousel-cell" href="buttstuff.html"><img src="/images/films/ButtStuffPoster.webp"></a>
            <a class="carousel-cell" href="murder.html"><img src="/images/films/MurderPoster.webp"></a>
            <a class="carousel-cell" href="thisisagarden.html"><img src="/images/films/GardenPoster.webp"></a>
            <a class="carousel-cell" href="pullingplugmom.html"><img src="/images/films/MomPoster.webp"></a>
            <a class="carousel-cell" href="norman.html"><img src="/images/films/NormanPoster.webp"></a>
          </div>
        </section>

        <!-- Scripts — must be inside <main>, before </main> -->
        <script type="text/javascript" src="js/main.js"></script>
        <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
      </main>
    </div>

    <!-- PASTE FULL FOOTER BLOCK HERE (see Footer section of CLAUDE.md) -->
    <!-- In footer-right .foot-nav, set class="current-page" on the Films link -->

  </body>
</html>
```

### Checklist for a New Film Page
- [ ] Create `{{SLUG}}.html` from template above
- [ ] Add hero image, title image, poster to `images/films/`
- [ ] Create `images/films/{{SLUG}}prod/` and add stills as `.webp`
- [ ] Add `createImageGallery()` call to `js/main.js`
- [ ] Add `createScrollFunctionality()` call to `js/main.js`
- [ ] Add film to Films dropdown nav in **every** `.html` file (13 files + new one = 14 edits)
- [ ] Add film to `films.html` listing (see section below)
- [ ] Add film poster to `other-films` carousel on all other film pages
- [ ] Set `class="current-page"` on Films link in footer nav

---

## films.html Listing Entry

Each film on `films.html` gets one `film-container` section. Add new films in release order (newest first or chronological — currently newest first is the pattern).

```html
<section class="film-container">
  <aside class="film-text">
    <h3>{{FILM_TITLE}}</h3>
    <span>{{ONE_SENTENCE_LOGLINE}}</span>
    <a href="{{SLUG}}.html">Learn More</a>
  </aside>
  <a href="{{SLUG}}.html">
    <img src="/images/films/{{SLUG}}Poster.webp" alt="poster for {{FILM_TITLE}} by April Yanko">
  </a>
</section>
```

---

## Known Bugs

### 1. Double-quote typo in nav `href` attributes
On `norman.html"` and `murder.html"` entries across most HTML files, there is an extra `"` at the end of the `href`:
```html
<!-- BUG (current state in most files): -->
<li><a href="norman.html"">Norman</a></li>
<li><a href="murder.html"">Murder is on the Table</a></li>

<!-- CORRECT: -->
<li><a href="norman.html">Norman</a></li>
<li><a href="murder.html">Murder is on the Table</a></li>
```
Affects: `oncam.html`, `photos.html`, `films.html`, `buttstuff.html`, `murder.html`, `norman.html`, `pullingplugmom.html`, `thisisagarden.html`.

### 2. Hash sign in `id` attribute on `photos.html`
```html
<!-- BUG: -->
<section id="#headshots">
<!-- CORRECT: -->
<section id="headshots">
```
The `#` belongs in anchor *links* (`href="#headshots"`), not in the `id` itself.

### 3. `normalize.css` referenced but missing
All pages have `<link rel="stylesheet" href="css/normalize.css">` but the file does not exist in the repo. Either add the file or remove the link tag from all pages.

### 4. Mailchimp `<link>` tag inside `<body>`
Each page loads the Mailchimp CSS via a `<link>` tag placed inside `<footer>`, not in `<head>`. Technically invalid HTML. Should move to `<head>`.

### 5. PDF links on `oncam.html` may be broken
The resume PDFs (`AprilYankoActingResume.pdf`, `AprilYankoWritingResume.pdf`, `AYActorsAccessResume.pdf`) live in the `images/` directory. Verify that iframe `src` paths on `oncam.html` match exactly.

### 6. `image-gallery` ID duplicated within same page
`buttstuff.html` (and other film pages) uses `id="image-gallery"` on both the stills section and the BTS section. IDs must be unique per page. The stills wrapper divs (`image-wrapper`) are also duplicated. This works due to `querySelector` using the first match, but is invalid HTML.

---

## Improvement Suggestions

### High Priority

**1. Header/footer are copy-pasted across all 13 pages**
Adding a new film requires editing the Films dropdown in 13 separate HTML files. This is the single biggest maintenance burden. Solutions:
- Use a simple static site generator (Eleventy, Jekyll) with partials
- Use server-side includes if hosting allows
- At minimum, add a clear `<!-- ADD NEW FILM HERE -->` comment in the nav of every file to reduce the chance of missing one

**2. Fix the nav link typos (Bug #1)**
The double-quote on `norman.html""` and `murder.html""` creates invalid HTML. A browser will likely recover, but it could break in edge cases. Do a find-and-replace across all files.

**3. PDF links on oncam.html — verify and fix**
Confirm the iframe `src` paths match actual file locations, and consider adding `target="_blank"` or a direct download link as a fallback since PDF iframes are often blocked on mobile.

### Medium Priority

**4. Substack integration on `writing.html` and footer**
The Mailchimp newsletter in the footer could link to or be replaced by a Substack subscribe button/embed. At minimum, add a Substack link in `writing.html`.

**5. `films.html` visual upgrade**
The current layout (text aside + poster) is functional but plain. Consider:
- CSS hover overlay on poster showing the logline
- Converting to a CSS Grid layout so posters display in a 2-3 column grid
- Adding the genre tags and year to each card

**6. Mobile responsiveness gaps**
- `.middle-container` has a fixed `width: 1100px` — breaks below 1100px viewport width
- The homepage bio grid (25% | 50% | 25%) has no responsive breakpoint
- Some sections need `max-width: 100%; overflow-x: hidden` on smaller screens

**7. Film page hero class naming inconsistency**
Each film uses a different class convention for the head and title images (e.g., `butthead`/`butttitle` vs `plughead`/`plugtitle` vs `gardenhead`/`gardentitle`). Standardizing to `{{slug}}-hero-head` and `{{slug}}-hero-title` would make the CSS easier to reason about and the template cleaner to follow.

### Lower Priority

**8. Accessibility gaps**
- Hamburger `<button>` has no `aria-label` — screen readers can't identify it
- Dropdown `<a>` triggers have no `aria-expanded` or `aria-haspopup`
- Carousel doesn't have ARIA live regions
- Lightbox needs focus management (focus should move into the lightbox when opened)

**9. Duplicate `id="image-gallery"` and `id="image-wrapper"` (Bug #6)**
Both stills and BTS sections on film pages reuse these IDs. Rename to `id="{{slug}}-image-gallery"` and `id="{{slug}}-image-wrapper"` for valid, maintainable HTML.

**10. Other films carousel — manual duplication**
Each film's Other Films carousel duplicates the poster set to fill wide viewports. This means adding a new film requires editing every film's carousel. Consider using `wrapAround: true` (already set) and simply listing each film once — Flickity's wrap-around handles infinite looping.

**11. Mailchimp → Substack migration**
When ready, the newsletter form can be swapped for a Substack embed. The Mailchimp JS validation script (`mc-validate.js`) and inline `<style>` block in the footer would be removed at that point.
