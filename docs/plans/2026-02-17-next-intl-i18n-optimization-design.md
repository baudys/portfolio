# Next-intl i18n + Codebase Optimization Design

Date: 2026-02-17
Project: baudys-portfolio
Status: Approved

## 1. Context
Current language handling is implemented with a client-side Zustand store and `?lang=` query param. This causes SEO inconsistency (static `html lang='en'`, mixed canonical behavior) and forces broad client rendering. We will migrate to `next-intl` with locale-based routing and optimize component boundaries.

## 2. Goals
- Implement i18n correctly with `next-intl` on Next.js App Router.
- Support locales: `cs`, `en`, `es`.
- Localize URL segments for top-level sections.
- Keep project detail slug stable across locales.
- Remove client-side language state and query-param language switching.
- Improve SEO (canonical/hreflang/sitemap/metadata) and reduce unnecessary client JS.

## 3. Confirmed Product Decisions
- Root `/` behavior: detect locale by cookie (`NEXT_LOCALE`) first, then `Accept-Language`, then fallback.
- Localized parent segments:
  - projects: `projects` / `projekty` / `proyectos`
  - gallery: `gallery` / `galerie` / `galeria`
  - contact: `contact` / `kontakt` / `contacto`
- Project detail slug remains unified in all locales (e.g. `myride`).

## 4. Approaches Considered

### A. `next-intl` routing + localized pathnames + server-first refactor (Selected)
Pros:
- Best SEO and canonical consistency.
- Typed navigation APIs and maintainable locale routing.
- Enables conversion back to server components.
Cons:
- Larger one-time migration.

### B. `next-intl` only for messages, custom route mapping
Pros:
- Faster initial migration.
Cons:
- Split architecture and higher long-term maintenance risk.

### C. Fully custom i18n without `next-intl` route abstractions
Pros:
- Full control.
Cons:
- Reinvents solved problems, worse DX, higher bug surface.

## 5. Target Architecture

### 5.1 Routing and i18n Foundation
- Add `i18n/routing.ts` (`defineRouting`) with locales and localized pathnames.
- Add `i18n/navigation.ts` (`createNavigation`) for typed `Link`, `redirect`, `useRouter`, `getPathname`.
- Add `i18n/request.ts` (`getRequestConfig`) to load locale messages.
- Add `middleware.ts` using `createMiddleware(routing)`.
- Move app routes under `app/[locale]/...` and provide locale-aware root layout.

### 5.2 Localized URL Strategy
- Home: `/cs`, `/en`, `/es`
- Projects listing: `/cs/projekty`, `/en/projects`, `/es/proyectos`
- Gallery listing: `/cs/galerie`, `/en/gallery`, `/es/galeria`
- Contact page: `/cs/kontakt`, `/en/contact`, `/es/contacto`
- Project detail examples:
  - `/cs/projekty/myride`
  - `/en/projects/myride`
  - `/es/proyectos/myride`

### 5.3 Translation Resources
- Create message namespaces in `messages/cs.json`, `messages/en.json`, `messages/es.json`.
- Replace inline conditionals (`language === 'en'`) with translation keys.
- Keep data-model localized text fields as transitional step where needed; add missing Spanish content and then progressively normalize.

### 5.4 Component Boundary Optimization
- Remove `store/use-language.ts`.
- Convert pages/layouts/metadata to server-first where possible.
- Keep client components only for interactivity (e.g. gallery filter UI, theme control, motion-specific behavior).
- Replace language switcher with locale-aware navigation that preserves current route.

## 6. SEO and Metadata
- Set `<html lang>` from current locale.
- Generate locale-specific metadata with `generateMetadata`.
- Add canonical per localized route.
- Add `alternates.languages` for `cs-CZ`, `en-US`, `es-ES`.
- Rebuild sitemap to include all locale variants (including project details).
- Update robots directives to localized sections.

## 7. Error Handling
- Localized `not-found` content via translations.
- Middleware fallback to default locale when detection is ambiguous.
- Safe handling for unknown slugs with locale-aware not-found UX.

## 8. Type Safety and Quality Rules
- No `any`; replace all implicit/explicit `any` with strict types.
- Introduce explicit types for locales, pathname mapping, and project lookups.
- Avoid runtime-only language branching in rendering where static translations are sufficient.

## 9. Validation Plan
- `bun run lint`
- `bun run build`
- Manual smoke checks (all locales):
  - Home, listing pages, project detail pages.
  - Locale switcher path preservation.
  - Canonical/hreflang correctness.
  - 404 localization and fallback behavior.

## 10. Risks and Mitigations
- Risk: route regressions during migration.
  - Mitigation: typed pathnames + targeted smoke tests per route/locale.
- Risk: incomplete Spanish strings.
  - Mitigation: enforce key parity across locale message files.
- Risk: metadata drift.
  - Mitigation: centralize metadata factories by locale.

## 11. Out of Scope
- Introducing additional locales beyond `cs`, `en`, `es` in this phase.
- Reworking visual design system unrelated to i18n migration.

