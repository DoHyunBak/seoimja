# src Guide

## Entry
- `main.jsx` -> `app/App.jsx`

## Cat Portfolio Composition
- `pages/cat-portfolio/ui/CatPortfolioPage.jsx` composes all sections.
- Section widgets are in `widgets/cat-portfolio/ui`.
- Domain data is in `entities/cat/model/catPortfolioData.js`.

## Quick Add Rule
- New section UI: `widgets/cat-portfolio/ui/NewSection.jsx`
- New domain data: `entities/cat/model/*.js`
- New shared component/hook: `shared/ui` or `shared/hooks`
