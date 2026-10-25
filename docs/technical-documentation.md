# Technical Documentation

## Overview
A static single-page portfolio. No frameworks, no backend, no build tools.

## Files
- `index.html` – page structure and semantic sections (`header`, `main`, `section`, `footer`).
- `css/styles.css` – styling, theme variables, responsive rules.
- `js/script.js` – interactivity.
- `assets/images/` – SVG placeholder images for projects.

## Responsive Design
- Mobile-first CSS. The projects grid is one column by default and two columns at `min-width: 600px`.
- The navigation uses Flexbox with wrapping so it fits small screens.
- Images use `width: 100%; height: auto`.

## Theming
Colors are CSS variables on `:root`. The `[data-theme="dark"]` attribute on `<html>` overrides them. The choice is stored in `localStorage`.

## JavaScript Features
1. **Greeting** – picks morning/afternoon/evening from `new Date().getHours()`.
2. **Theme toggle** – switches `data-theme` and saves it.
3. **Form validation** – checks for empty fields and a valid email pattern; shows a status message. Nothing is sent anywhere.
4. **Smooth scrolling** – `scroll-behavior: smooth` in CSS.

## Browser Support
Tested design targets current Chrome, Firefox, Safari and Edge.
