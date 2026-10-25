# AI Usage Report – Assignment 2

**Student:** Abdulaziz Alkhatib (202372090)
**Course:** SWE 363 – Assignment 2: Interactive Features

## 1. Tools used

| Tool | Model | How I used it |
|---|---|---|
| Claude Code (VS Code extension) | Claude Opus 5.5 (`claude-opus-5-5`) | See the list below |

How I used Claude Code:

- It read the assignment brief and my Assignment 1 code, then proposed a plan.
- It explained CSS concepts I asked about (`translateY`, `@keyframes`).
- It generated the code one feature at a time, tested each feature in headless Chrome, and drafted the documentation.

The starting code from Assignment 1 was also AI-assisted; that use is declared in the Assignment 1 report.

## 2. Usage log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|----------------|------------------------------------------|
| C01 | Claude Code (Claude Opus 5.5) | 2026-10-19 | First attempt at the whole assignment: features, tests, docs | None in the final repository | I did not keep this attempt. I re-cloned the repository on 2026-10-25 and started over in C02. No code from C01 was copied into this repository. |
| C02 | Claude Code (Claude Opus 5.5) | 2026-10-25 | Plan, explanations, implementation of all Assignment 2 features, tests, documentation | `index.html`, `css/styles.css`, `js/script.js`, `assets/images/*`, `README.md`, `docs/*`, `.gitignore` | I read the plan and the JavaScript before approving, asked for explanations of `translateY` and `@keyframes`, and changed the hover lift from 4px to 6px. The AI tested each feature in headless Chrome and ran Lighthouse (section 3). **TODO (Abdulaziz): add your own edits and manual testing here.** |
| A01 | Claude Code (Claude Opus 5.5) | 2026-10-25 | Implementation plan (`artifacts/A01-plan.md`) | – (planning only) | I reviewed it before any code was written. I changed the hover lift from 4px to 6px. |
| A02 | Claude Code (Claude Opus 5.5) | 2026-10-25 | The AI-generated code and docs before my edits (`artifacts/A02-ai-generated.patch`), commits `e0cf7bf` to the docs commit on branch `feature/interactive-features` | Same as C02 | **TODO (Abdulaziz): list what you changed after reviewing.** My own edits are in separate commits after the AI commits. |
| A03 | Claude Code (Claude Opus 5.5) | 2026-10-25 | Browser test scripts (Puppeteer) and Lighthouse reports (`artifacts/A03-tests/`) | None (kept outside the repository) | The AI ran them and all checks passed. **TODO (Abdulaziz): note anything you ran or checked yourself.** |

Each commit with AI-assisted code ends with `Assisted-by: Claude Code (Claude Opus 5.5)`.

## 3. How the AI output was verified

- **Automated browser tests** (headless Chrome through Puppeteer) for every feature:
  - filter and search
  - all six states of the GitHub request: loading, success, empty, rate limit, server error, offline + retry
  - every form rule and the focus behaviour
  - theme with storage blocked
  - reduced motion
  - no console errors

  The full list is in `technical-documentation.md`, section 7.
- **Lighthouse:** 100 in Performance, Accessibility, Best Practices and SEO, on both mobile and desktop.
- **Contrast:** ratios calculated for both themes. All are 4.5:1 or higher.
- **Screenshots** at 375 px and 1280 px, in light and dark.

**Problems found during testing:**

- One test failed because it assumed light mode while the computer was in dark mode. The page was correct, and the test was fixed.
- The screenshots showed that on phones, the sticky header covered section headings after a nav link was clicked. This bug was already in Assignment 1. It was fixed with `scroll-margin-top` and re-tested at six screen widths.
- The contrast check showed that white button text in dark mode was only 2.5:1. It was fixed with a new `--on-accent` color.

## 4. What I changed and why

**TODO (Abdulaziz):** describe the edits you made to the AI output, in your own words. For example:

- what you changed after reviewing the code
- the real project content you added in place of the placeholders
- styling you adjusted
- anything you rewrote to understand it better

Changes made so far:

- Hover lift changed from `translateY(-4px)` to `translateY(-6px)`, because it looked better.

## 5. Benefits and challenges

**TODO (Abdulaziz):** your own experience. Some points to consider:

- How the plan-first approach helped you check the work before any code existed.
- Which parts you needed explained, and why.
- What the AI could not do. It could not test in Safari or Firefox for you, and it cannot know your real projects.

## 6. Learning outcomes

**TODO (Abdulaziz):** what you learned, in your own words.

Concepts covered in this assignment:

- `transform: translateY()` and `@keyframes` (both explained in C02)
- `fetch` with `async/await`, and loading/error/empty states
- why `textContent` is safer than `innerHTML` for API data
- `IntersectionObserver`
- ARIA attributes for form errors (`aria-invalid`, `aria-describedby`, `role="status"`)
- `prefers-reduced-motion`

## 7. Evidence

The AI Evidence ZIP `202372090-AbdulazizAlkhatib-assignment2-ai-evidence.zip` is submitted on Blackboard and not committed here. It contains:

- `conversations/`: the complete, unedited Claude Code transcripts of C01 and C02, as the original `.jsonl` files plus readable `.md` copies.
- `artifacts/`: A01 (plan), A02 (AI-generated code before my edits) and A03 (test scripts and Lighthouse reports).

## 8. Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Abdulaziz Alkhatib
**ID:** 202372090
**Date:** _TODO: sign and date before submitting_
