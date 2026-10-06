# Default design system export

Portable styling from this project's **default** skin (Plus Jakarta Sans, navy/purple, sky-periwinkle — not Disney+/Southwest).

## Where this lives

| Location | Purpose |
|----------|---------|
| `exports/default-design-system/` | In this repo — copy into any new project |
| `~/.cursor/skills/search-exp-default-style/` | Personal Cursor skill — agent can apply it in any chat |

## Contents

| File | Use when |
|------|----------|
| `tokens.css` | Any project — plain CSS variables + Google Font import |
| `tailwind-theme.css` | Tailwind v4 — `@theme` utilities (`text-navy`, `rounded-card`, etc.) |
| `designTokens.json` | JS/TS apps — import tokens programmatically |
| `style-guide.html` | Browser preview of swatches + component CSS snippets |
| `SKILL.md` | Cursor Agent instructions for matching this look |

## Use in a new Cursor project

**Option A — drop files in**

```bash
cp -R exports/default-design-system/* /path/to/new-project/styles/design-system/
```

Then in the new app:

```css
@import "./styles/design-system/tokens.css";
/* optional Tailwind v4: */
@import "./styles/design-system/tailwind-theme.css";
```

**Option B — tell the agent**

If the personal skill is installed (`~/.cursor/skills/search-exp-default-style/`), say:

> Use the search-exp-default-style design system

**Option C — project skill**

```bash
mkdir -p /path/to/new-project/.cursor/skills/search-exp-default-style
cp exports/default-design-system/SKILL.md \
   exports/default-design-system/tokens.css \
   exports/default-design-system/designTokens.json \
   /path/to/new-project/.cursor/skills/search-exp-default-style/
```

## Source of truth in this repo

- `src/app/designTokens.json`
- `src/styles/theme.css` (`@theme` block)
- Components: `cardStyles.ts`, `AiAssistCard`, `SearchFirstPromptBar`, `AiNudgeChips`
