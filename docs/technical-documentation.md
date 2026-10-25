# Technical Documentation

## 1. Overview

The portfolio is a static single-page site with no frameworks, libraries, build step or backend. It has three source files:

| File | Lines | Role |
|---|---|---|
| `index.html` | 125 | Page structure: header/nav, About, Skills, Projects, Latest on GitHub, Contact, footer |
| `css/styles.css` | 401 | Theme variables, layout, animations, responsive and reduced-motion rules |
| `js/script.js` | 227 | Greeting, theme, project filter/search, GitHub API, form validation, scroll fade-in |

All files together, including images, come to about 44 KB. Every section uses the class `section`, which handles spacing, the scroll fade-in and the space it leaves for the sticky header.

The script is loaded at the end of `<body>`, so every element already exists when it runs.

## 2. JavaScript features

The sections below follow the order of `js/script.js`.

### 2.1 Greeting (from Assignment 1, unchanged)

The script reads `new Date().getHours()` and writes "Good morning", "Good afternoon" or "Good evening" into `#greeting`.

### 2.2 Dark/light theme

| Function | What it does |
|---|---|
| `applyTheme(theme)` | Sets `data-theme` on `<html>` and updates the button label |
| `getSavedTheme()` | Reads `localStorage`. Returns `null` if storage is blocked |
| `saveTheme(theme)` | Writes to `localStorage`. Does nothing if storage is blocked |

On startup the page uses the saved theme. If none is saved, it follows the operating system setting, read with `matchMedia("(prefers-color-scheme: dark)")`.

The `localStorage` calls are wrapped in `try/catch` because some browsers throw an error when storage is blocked, for example with strict privacy settings. Without the wrapper, that error would stop the rest of the script.

The CSS defines the colors as variables on `:root`, and `[data-theme="dark"]` overrides them.

### 2.3 Project filter and live search

| Element | Purpose |
|---|---|
| `#project-search` | Search box. The `input` event fires on every keystroke |
| `.filter-btn[data-filter]` | Category buttons. `aria-pressed` marks the active one |
| `.card[data-category]` | Project cards |
| `#projects-empty` | "No projects found" message |

The variable `activeFilter` stores the selected category. `updateProjects()` runs after every keystroke and every button click:

1. It reads the search text, trimmed and lowercased.
2. For each card it checks two conditions:
   - **matchesFilter:** the filter is `all`, or it equals the card's `data-category`.
   - **matchesSearch:** the card's whole text (title, tag and description) contains the search text.
3. It sets `card.hidden = !(matchesFilter && matchesSearch)`.
4. It shows `#projects-empty` only when no card is visible.

**Adding a project:** copy an `<article class="card" data-category="...">` block in `index.html`. No JavaScript change is needed.

**Adding a category:** add a button with a new `data-filter` value.

### 2.4 Latest GitHub repositories (public API)

**Endpoint:** `https://api.github.com/users/Aziz-KFUPM/repos?sort=updated&per_page=6`. It returns the 6 most recently updated public repositories.

`loadRepos()` is an `async` function and runs once on page load:

```
loadRepos()
  ├─ show "Loading repositories..." (class "loading" adds the CSS spinner)
  ├─ hide the Try again button and clear the list
  ├─ await fetch(...)
  │    ├─ response not ok  → throw Error("HTTP " + status)  → goes to catch
  │    ├─ empty array      → "No public repositories yet. Check back soon!"
  │    └─ repositories     → createRepoItem() for each one, then clear the status
  └─ catch
       ├─ HTTP 403 / 429   → rate-limit message
       ├─ anything else    → connection message (offline, server error, ...)
       └─ show the Try again button (clicking it calls loadRepos() again)
```

| State | Message shown | Try again button |
|---|---|---|
| Loading | Spinner + "Loading repositories..." | Hidden |
| Success | Repository list | Hidden |
| Empty | "No public repositories yet. Check back soon!" | Hidden |
| Rate limit (403/429) | "GitHub's request limit was reached. Wait a few minutes, then click Try again." | Shown |
| Offline / other error | "Couldn't load repositories right now. Check your internet connection, then click Try again." | Shown |

**Rate limit:** without a login, GitHub allows 60 requests per hour per IP address. That is plenty for a portfolio, but repeated reloads during development can reach it. This is why the rate limit has its own message.

**Safety:** `createRepoItem()` builds each item with `createElement` and `textContent`, never `innerHTML`. Text from the API, such as a repository description, is always shown as plain text and never run as HTML. External links use `target="_blank"` with `rel="noopener"`.

**Accessibility:** `#repos-status` has `role="status"`, so screen readers announce loading and error messages.

### 2.5 Contact form validation

The form has `novalidate`, which turns off the browser's built-in validation bubbles. The script shows its own messages instead, so they look the same in every browser.

`getError(field)` returns an error message, or `""` if the value is fine:

| Field | Rule (after trimming spaces) | Message |
|---|---|---|
| Name | At least 2 characters | "Please enter your name (at least 2 characters)." |
| Email | Matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | "Please enter a valid email, like name@example.com." |
| Message | At least 10 characters | "Please write a message of at least 10 characters." |

`showError(field, message)` writes the message into the `<small id="<field>-error">` under the field. It also sets `aria-invalid`, which the CSS uses to draw a red border. Each input points to its error element with `aria-describedby`, so screen readers read the error together with the field.

**On submit:**

1. The script checks all three fields.
2. If any field is invalid:
   - the status shows "Please fix the highlighted fields and try again."
   - focus moves to the first invalid field.
3. If every field is valid:
   - the status shows "Thanks, <name>! Your message was received."
   - the form is reset.

**While typing:** one `input` listener on the whole form re-checks a field, but only if that field is already marked invalid. Errors disappear as soon as they are fixed, and nobody sees an error halfway through typing for the first time.

**Replaying the animation:** `showFormStatus()` removes the class, reads `offsetWidth`, then adds the class back. Reading `offsetWidth` forces the browser to apply the removal first, so the slide-in animation plays again even when two submits in a row give the same result.

### 2.6 Fade-in on scroll

An `IntersectionObserver` watches every `.section`:

- When a section comes within 50 px of the bottom of the screen, the observer adds `.visible`.
- After that it stops watching the section, so each section animates only once.
- The JavaScript adds the `.reveal` class (the hidden starting state) itself. If JavaScript is off, or the browser has no `IntersectionObserver`, all content stays visible.

## 3. CSS

### 3.1 Theme colors and contrast

| Variable | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | `#ffffff` | `#0f172a` | Page background |
| `--text` | `#1f2933` | `#e2e8f0` | Body text |
| `--muted` | `#52606d` | `#94a3b8` | Secondary text, tags |
| `--accent` | `#2563eb` | `#60a5fa` | Links, buttons |
| `--on-accent` | `#ffffff` | `#0f172a` | Text on accent buttons |
| `--card` | `#f1f5f9` | `#1e293b` | Cards, inputs |
| `--border` | `#cbd5e1` | `#334155` | Borders |
| `--error` | `#b91c1c` | `#f87171` | Error text and borders |
| `--success` | `#15803d` | `#4ade80` | Success message |

Every text/background pair has a contrast ratio of at least 4.5:1 (WCAG AA) in both themes. The lowest pair is accent on card in light mode, at 4.7:1.

`--on-accent` is new in Assignment 2. In Assignment 1, button text was always white, which gave only 2.5:1 on the light-blue dark-mode accent.

### 3.2 Animations and transitions

| Effect | Technique | Selector |
|---|---|---|
| Card lift on hover | `transition` + `transform: translateY(-6px)` and a shadow | `.card:hover` |
| Card fade-in, including after filtering | `@keyframes fade-in`. It replays whenever a hidden card is shown again | `.card` |
| Section fade-in on scroll | `transition` on opacity/transform, `.reveal` → `.visible` | `.section` |
| Form message slide-in | `@keyframes slide-in` | `#form-status.success`, `.error` |
| Loading spinner | `@keyframes spin` on a `::before` circle | `#repos-status.loading` |
| Theme color fade | `transition` on background-color/color | `body`, header, inputs, cards |

Movement only animates `transform` and `opacity`. The browser can change these without recalculating the page layout, so the animations stay smooth on phones.

**Reduced motion:** when the operating system's "reduce motion" setting is on, `@media (prefers-reduced-motion: reduce)` turns off all animations, transitions, smooth scrolling and the hover lift.

### 3.3 Responsive layout

The CSS is mobile-first, with one breakpoint at `min-width: 600px`:

| | Below 600 px | 600 px and wider |
|---|---|---|
| Projects and repos grids | 1 column | 2 columns |
| `scroll-margin-top` on sections | `7rem` | `0` |

The scroll margin is needed because the sticky header wraps onto 3–4 rows on phones (173 px tall at 320 px wide). Without it, the nav links would scroll section headings underneath the header. This bug existed in Assignment 1 and is fixed here.

## 4. Accessibility

- Every input has a `<label>`. Field errors are linked with `aria-describedby` and flagged with `aria-invalid`.
- Status messages for the repositories and the form use `role="status"`, so screen readers announce them.
- Filter buttons use `aria-pressed`, and the button group has an `aria-label`.
- `:focus-visible` outlines show keyboard users where they are, without adding outlines on mouse clicks.
- Images have `alt` text, the page has `lang="en"`, and the colors meet WCAG AA (section 3.1).
- Reduced motion is respected (section 3.2).

## 5. Performance

- **No libraries or frameworks.** The only request after page load is the GitHub API call.
- **Images:** SVGs with `width`/`height` attributes, so nothing jumps while they load (layout shift = 0), plus `loading="lazy"`.
- **API:** limited to 6 repositories.
- **Search:** runs on every keystroke without a delay. That is fine for a few cards. For hundreds of projects, a short debounce would be better.

**Lighthouse 12.2.1 results** (local server, 2026-10-25):

| Preset | Performance | Accessibility | Best Practices | SEO | First Contentful Paint | Largest Contentful Paint | Layout Shift | Blocking Time |
|---|---|---|---|---|---|---|---|---|
| Mobile | 100 | 100 | 100 | 100 | 0.9 s | 1.0 s | 0 | 0 ms |
| Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0.3 s | 0 | 0 ms |

## 6. Browser compatibility

| Feature | Used for | Fallback |
|---|---|---|
| `fetch` + `async/await` | GitHub API | Error message and Try again button |
| `IntersectionObserver` | Scroll fade-in | Feature check: content just shows |
| `localStorage` | Saving the theme | `try/catch`: the theme works but is not remembered |
| `matchMedia` | OS dark mode | – |
| `:focus-visible` | Keyboard outlines | Browser's default focus outline |
| CSS variables, Grid, Flexbox | Theme and layout | – |

All of these work in current Chrome, Edge, Firefox and Safari, on desktop and mobile. The newest one is `:focus-visible`, which needs Safari 15.4 (2022) or later. Older browsers ignore that rule and show their default outline.

## 7. Testing

### 7.1 Automated checks during development

The checks used headless Chrome driven by Puppeteer. The test scripts are kept outside this repository and are included in the AI evidence as artifact A03.

- **Filter and search:**
  - each category
  - search combined with a filter
  - case-insensitive matching and trimming
  - searching by tag
  - empty state shown and hidden
  - `aria-pressed` updates
- **GitHub API** (responses simulated):
  - loading indicator
  - success
  - HTML in a description shown as plain text
  - empty list
  - 403 rate limit
  - 500 server error
  - offline
  - Try again after a failure
  - one run against the real API
- **Form:**
  - empty submit (three messages, focus on Name)
  - a name made only of spaces
  - bad email and short message (focus on Email)
  - live clearing of an error
  - no errors while typing before the first submit
  - success and reset
  - the slide-in animation replaying on repeated submits
- **Theme and polish:**
  - follows OS dark/light
  - the saved choice beats the OS setting after reload
  - works with `localStorage` blocked
  - scroll fade-in
  - 6 px hover lift
  - reduced motion turns animations off
  - no console errors and no 404s
- **Layout:**
  - no horizontal scrolling at 375 and 1280 px in both themes
  - nav links keep headings visible at 320, 375, 599, 600, 768 and 1280 px

### 7.2 Manual checklist

| Check | Chrome | Safari | Firefox | Phone |
|---|---|---|---|---|
| Filter buttons and search; "No projects found" | ✅ | ☐ | ☐ | ☐ |
| GitHub list loads; offline shows error + Try again | ✅ | ☐ | ☐ | ☐ |
| Form errors, focus, success message | ✅ | ☐ | ☐ | ☐ |
| Theme toggle remembered after reload | ✅ | ☐ | ☐ | ☐ |
| Sections fade in; cards lift on hover | ✅ | ☐ | ☐ | ☐ |
| Keyboard only: Tab through links, buttons, form | ☐ | ☐ | ☐ | – |

To test offline in Chrome: DevTools → Network → **Offline**, then reload.

## 8. Known limitations and next steps

- The contact form has no backend, so messages are not actually sent.
- The project cards are still placeholders.
- The GitHub list depends on the unauthenticated rate limit (60 requests per hour per IP).
- When the site moves to React in a later assignment, each feature maps cleanly to a component:
  - the filter and search become a `ProjectList` with state for the filter and query
  - the GitHub list becomes a `RepoList` that fetches inside `useEffect`
  - the form becomes a `ContactForm` with controlled inputs
