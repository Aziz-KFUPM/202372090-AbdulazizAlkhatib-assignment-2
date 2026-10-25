# Abdulaziz Alkhatib – Portfolio (SWE 363, Assignment 2)

A personal portfolio website built with plain HTML, CSS and JavaScript, with no frameworks, libraries or build tools. Assignment 2 builds on [Assignment 1](https://github.com/Aziz-KFUPM/202372090-Abdulaziz-assignment1) by adding interactive features, live data from the GitHub API, animations and clear feedback messages.

**Live demo:** _not deployed yet._ See [Deploying to GitHub Pages](#deploying-to-github-pages-optional).

## Features

### New in Assignment 2

| Feature | What you do | What happens |
|---|---|---|
| Project filter | Click **All / Web / Design / Tools** | Only the projects in that category are shown |
| Live search | Type in **Search projects** | Projects filter while you type. If nothing matches: "No projects found" |
| GitHub repositories | Open the page | Your latest public repositories load from the GitHub API. A spinner shows while loading. If loading fails, a friendly message and a **Try again** button appear |
| Contact form feedback | Click **Send** | Each invalid field shows its own message and a red border, and the cursor jumps to the first problem. A success message slides in when everything is valid |
| Animations | Scroll and hover | Sections fade in, project cards lift on hover, and theme colors fade smoothly |
| Accessibility | Keyboard or "reduce motion" setting | Visible focus outlines, screen-reader labels for errors and status messages, and no animations when the operating system asks for reduced motion |

### From Assignment 1 (kept and improved)

- A greeting that changes with the time of day
- A dark/light theme saved in `localStorage`. It now follows the operating system setting until you pick one
- A responsive, mobile-first layout using Flexbox and Grid

## Run it locally

You only need a modern browser. Python is only needed for option B.

1. Clone the repository:
   ```bash
   git clone https://github.com/Aziz-KFUPM/202372090-AbdulazizAlkhatib-assignment-2.git
   cd 202372090-AbdulazizAlkhatib-assignment-2
   ```
2. Open the site in one of two ways:
   - **Option A:** double-click `index.html`.
   - **Option B (recommended):** start a small local server, then open <http://localhost:8000>:
     ```bash
     python3 -m http.server 8000
     ```
     The VS Code **Live Server** extension also works.
3. The **Latest on GitHub** section needs an internet connection. Without one, it shows an error message and a **Try again** button, and the rest of the page still works.

## How to use the site

- **Projects:** type in the search box or click a category button. Click **All** and clear the search box to see everything again.
- **Latest on GitHub:** loads by itself. If you see an error, wait a moment and click **Try again**.
- **Contact:** the form does not send email, because there is no backend. It checks your input and confirms when everything is valid.
- **Theme:** the button in the top-right corner switches between dark and light, and your choice is remembered.

## Project structure

```
├── index.html                       Page structure
├── css/styles.css                   Theme colors, layout, animations, responsive rules
├── js/script.js                     All interactivity
├── assets/images/                   Project placeholders and favicon (SVG)
├── docs/
│   ├── ai-usage-report.md           AI tools, usage log and declaration
│   └── technical-documentation.md   How each feature works, testing, compatibility
└── README.md
```

## Quality checks

- **Lighthouse** (mobile and desktop): Performance 100, Accessibility 100, Best Practices 100, SEO 100.
- **Contrast:** every text color meets WCAG AA (4.5:1 or more) in both themes.
- **Tested in** Chrome at 320, 375, 600, 768 and 1280 px wide.
- **Not yet tested:** Safari and Firefox (manual check still to do).

Details are in [docs/technical-documentation.md](docs/technical-documentation.md).

## Deploying to GitHub Pages (optional)

1. On GitHub, open **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**, then branch `main` and folder `/ (root)`, and save.
3. After about a minute, the site is live at `https://aziz-kfupm.github.io/202372090-AbdulazizAlkhatib-assignment-2/`.

## AI use

I used **Claude Code (Claude Opus 5.5)** for:

- planning the features
- generating a first version of the code, one feature at a time
- testing it in a headless browser
- drafting this documentation

I reviewed, tested and edited the result. Commits that contain AI-assisted code say so with an `Assisted-by:` line. The full usage log and declaration are in [docs/ai-usage-report.md](docs/ai-usage-report.md).

## Author

Abdulaziz Alkhatib, 202372090, SWE 363, KFUPM
