---
sessionId: session-261105-220455-1qtb
---

# Project Audit

# Resumind — Complete Project Audit

## 1. Pages (Routes)

| Route | File | Description |
|-------|------|-------------|
| `/` (Home) | `app/routes/home.tsx` | Resume gallery — lists all previously analyzed resumes as cards. Auth guard redirects to `/auth`. |
| `/auth` | `app/routes/auth.tsx` | Login/logout page using Puter.js auth. Redirects to the original page after auth. |
| `/upload` | `app/routes/upload.tsx` | Upload form — company name, job title, job description, PDF file. Triggers AI analysis. |
| `/resume/:id` | `app/routes/resume.tsx` | Detailed resume review — shows resume image, Summary, ATS, and Details components. |
| `/wipe` | `app/routes/wipe.tsx` | Debug utility — lists and deletes all stored files + flushes KV store. |

## 2. Reusable Components

| Component | File | Purpose |
|-----------|------|---------|
| **Navbar** | `app/components/Navbar.tsx` | Top navigation bar with "REUSMIND" brand link and "Upload Resume" button. |
| **ResumeCard** | `app/components/ResumeCard.tsx` | Card for each resume on the home page — shows company, job title, score circle, and image preview. |
| **FileUploader** | `app/components/FileUploader.tsx` | Drag-and-drop PDF uploader with file preview and size display. |
| **Summary** | `app/components/Summary.tsx` | Overall resume score with ScoreGauge + 4 category rows (Tone & Style, Content, Structure, Skills). |
| **ScoreGauge** | `app/components/ScoreGauge.tsx` | Semi-circular SVG gauge showing overall score. |
| **ScoreCircle** | `app/components/ScoreCircle.tsx` | Circular SVG progress ring for resume card scores. |
| **ScoreBadge** | `app/components/ScoreBadge.tsx` | Pill-shaped badge (green/yellow/red) with label ("Strong", "Good Start", "Needs Work"). |
| **ATS** | `app/components/ATS.tsx` | ATS compatibility card with gradient background, icon, score, and suggestions list. |
| **Details** | `app/components/Details.tsx` | Accordion-based detailed feedback with 4 sections, each containing tips and explanations. |
| **Accordion** | `app/components/Accordion.tsx` | Reusable accordion primitive (Accordion, AccordionItem, AccordionHeader, AccordionContent). |

## 3. Business Logic (Do Not Modify)

| File | Purpose |
|------|---------|
| `app/lib/puter.ts` | Zustand store wrapping Puter.js SDK — auth, file system, AI, and KV operations. |
| `app/lib/pdf2image.ts` | PDF-to-image conversion using pdfjs-dist (renders page 1 to canvas at 4x scale). |
| `app/lib/utils.ts` | Utility functions: `cn()` (class merging via clsx + tailwind-merge), `generateUUID()`. |
| `constants/index.ts` | AI response format schema, `prepareInstructions()` prompt builder, and sample resume data. |
| `types/index.d.ts` | Global TypeScript interfaces: `Resume`, `Feedback`, `Job`. |

## 4. Styling & Configuration

### Global Styles (`app/app.css`)
- **Font**: Mona Sans (Google Fonts), with Inter as preconnect.
- **Tailwind CSS v4** with `@import "tailwindcss"` and `tw-animate-css`.
- **Custom theme variables**: `--color-dark-200`, `--color-light-blue-100/200`, `--color-badge-green/red/yellow` (and text variants).
- **Global element styles**: `main`, `h1`, `h2`, `label`, `input`, `textarea`, `form` — all with Tailwind `@apply`.
- **Component-level classes** (`@layer components`): `.text-gradient`, `.gradient-border`, `.primary-button`, `.resume-nav`, `.resume-summary`, `.back-button`, `.auth-button`, `.main-section`, `.page-heading`, `.resumes-section`, `.resume-card`, `.resume-card-header`, `.feedback-section`, `.navbar`, `.score-badge`, `.form-div`, `.uplader-drag-area`, `.uploader-selected-file`.
- **Custom utilities** (`@utility`): `bg-gradient`, `text-gradient`, `gradient-hover`, `primary-gradient`, `primary-gradient-hover`, `inset-shadow`.
- **Keyframe**: `fadeIn` animation.

### Branding
- **App name**: "Resumind" (meta title), "REUSMIND" (navbar logo — note: typo in Navbar).
- **Tagline**: "Smart feedback for your dream job!" (meta description).
- **Favicon**: `public/favicon.ico`.
- **Color scheme**: Purple gradient (`#8e98ff` → `#606beb`), pink accents (`#fa7185`), light blue tints.
- **Background images**: `bg-main.svg` (home, upload, auth), `bg-small.svg` (resume page).

### Static Assets (`public/`)
- **Icons** (10 SVGs): `ats-good`, `ats-warning`, `ats-bad`, `back`, `check`, `cross`, `info`, `pin`, `warning`.
- **Images**: `pdf.png`, `resume-scan.gif`, `resume-scan-2.gif`, `resume_01-03.png`.
- **Backgrounds**: `bg-main.svg`, `bg-auth.svg`, `bg-small.svg`.
- **Worker**: `pdf.worker.min.mjs` (no longer referenced, can be removed).

## 5. Architecture Overview

```
root.tsx (Layout + Puter init + Puter.js SDK)
├── routes/home.tsx → Navbar, ResumeCard (→ ScoreCircle)
├── routes/auth.tsx
├── routes/upload.tsx → Navbar, FileUploader
├── routes/resume.tsx → Summary (→ ScoreGauge, ScoreBadge), ATS, Details (→ Accordion*)
└── routes/wipe.tsx

Lib layer (shared):
├── puter.ts (Zustand store: auth, fs, ai, kv)
├── pdf2image.ts (PDF → image conversion)
└── utils.ts (cn, generateUUID)
```

## 6. Files Safe to Modify for Redesign

These files contain **only UI/presentation code** and can be freely restyled:

| File | What Can Change |
|------|----------------|
| `app/app.css` | All custom classes, utilities, theme variables, global element styles, animations. |
| `app/root.tsx` | Layout wrapper, fonts, body structure, error boundary styling. |
| `app/components/Navbar.tsx` | Layout, styling, branding text. |
| `app/components/ResumeCard.tsx` | Card layout, styling, image display. |
| `app/components/FileUploader.tsx` | Dropzone styling, file preview UI. |
| `app/components/Summary.tsx` | Score display layout, category rows. |
| `app/components/ScoreGauge.tsx` | SVG gauge appearance, colors, size. |
| `app/components/ScoreCircle.tsx` | SVG circle appearance, colors, size. |
| `app/components/ScoreBadge.tsx` | Badge colors, shape, text. |
| `app/components/ATS.tsx` | Card layout, gradient, icons, text styling. |
| `app/components/Details.tsx` | Accordion layout, tip display, explanation boxes. |
| `app/components/Accordion.tsx` | Accordion styling, animations, icons. |
| `app/routes/home.tsx` | Page layout, section arrangement, empty/loading states. |
| `app/routes/auth.tsx` | Auth page layout, button styling, background. |
| `app/routes/upload.tsx` | Form layout, field styling, processing UI. |
| `app/routes/resume.tsx` | Page layout, image display, feedback section arrangement. |
| `app/routes/wipe.tsx` | Debug page styling. |
| `public/` assets | Icons, images, backgrounds, favicon. |

## 7. Files That Must NOT Be Modified

| File | Reason |
|------|--------|
| `app/lib/puter.ts` | Core business logic — auth, file system, AI, KV operations. |
| `app/lib/pdf2image.ts` | PDF processing logic. |
| `app/lib/utils.ts` | Shared utilities (`cn`, `generateUUID`). |
| `constants/index.ts` | AI prompt templates, response format schema. |
| `types/index.d.ts` | TypeScript type definitions. |
| `app/routes.ts` | Route configuration. |
| `package.json` | Dependencies. |
| `vite.config.ts`, `tsconfig.json`, `react-router.config.ts` | Build configuration. |

## 8. Potential Risks

1. **Custom class dependencies**: Many components rely on custom CSS classes defined in `app.css` (e.g., `.gradient-border`, `.primary-button`, `.main-section`). Removing or renaming these classes without updating the components will break styling.

2. **Global element styles**: `h1`, `h2`, `input`, `textarea`, `form`, and `label` have global Tailwind `@apply` styles in `app.css`. Changing these will affect all pages.

3. **Background images**: Routes reference background images from `/public/images/`. Removing or renaming these files will cause broken image references.

4. **Icon assets**: Components reference SVG icons from `/public/icons/`. Removing or renaming will break icon display.

5. **Typo in Navbar**: The navbar displays "REUSMIND" instead of "RESUMIND" — this is a branding inconsistency worth fixing during redesign.

6. **`public/pdf.worker.min.mjs`**: No longer referenced by the code (worker is now loaded from `pdfjs-dist` package). Safe to remove.

7. **ScoreBadge duplication**: Two separate `ScoreBadge` implementations exist — one in `app/components/ScoreBadge.tsx` (used in Summary) and one inside `app/components/Details.tsx` (inline helper). They have different color thresholds and styling. A redesign could consolidate them.

8. **`constants/index.ts` sample data**: The `resumes` array exported from constants is not currently used by any route (home.tsx fetches from KV). It may be dead code or used for prototyping.

# Delivery Steps

###   Step 1: Complete project audit and deliver report
Analyze the entire codebase and deliver a comprehensive audit report covering all pages, components, styling, branding, business logic boundaries, and risks. This is a read-only analysis — no code changes are made.