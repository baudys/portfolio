# Next-intl I18n Migration and Route Localization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the portfolio to `next-intl` with `cs/en/es`, localized URL segments, locale-aware SEO metadata, and removal of the current client language store.

**Architecture:** Introduce a centralized i18n layer (`routing`, `navigation`, `request`, `middleware`), migrate routes to `app/[locale]`, and replace inline language conditionals with message keys. Preserve stable project slugs while localizing parent segments via pathname mapping. Prefer server components for pages/layout/metadata and keep client boundaries only where interaction is required.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, Tailwind CSS, next-intl, Bun, Vitest + React Testing Library.

---

References: @brainstorming, @frontend-design (for post-migration UI regression check only)

### Task 1: Add i18n + test infrastructure

**Files:**
- Modify: `package.json`
- Modify: `next.config.mjs`
- Modify: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `tests/i18n/smoke.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { routing } from '@/i18n/routing'

describe('i18n smoke', () => {
  it('exposes three locales', () => {
    expect(routing.locales).toEqual(['cs', 'en', 'es'])
  })
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/smoke.test.ts --run`
Expected: FAIL (`Cannot find module '@/i18n/routing'`)

**Step 3: Write minimal implementation**

```ts
// i18n/routing.ts (placeholder for now)
export const routing = { locales: ['cs', 'en', 'es'] as const }
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/smoke.test.ts --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint (no git commands run by agent).

### Task 2: Define locale types and routing map

**Files:**
- Create: `i18n/locales.ts`
- Modify: `i18n/routing.ts`
- Create: `i18n/navigation.ts`
- Test: `tests/i18n/routing.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { routing } from '@/i18n/routing'

describe('routing map', () => {
  it('maps localized parent segments', () => {
    expect(routing.pathnames['/projects']).toEqual({
      cs: '/projekty',
      en: '/projects',
      es: '/proyectos',
    })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/routing.test.ts --run`
Expected: FAIL (missing `pathnames` mapping)

**Step 3: Write minimal implementation**

```ts
// i18n/locales.ts
export const locales = ['cs', 'en', 'es'] as const
export type AppLocale = (typeof locales)[number]
export const defaultLocale: AppLocale = 'cs'

// i18n/routing.ts
import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './locales'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/projects': { cs: '/projekty', en: '/projects', es: '/proyectos' },
    '/projects/[slug]': { cs: '/projekty/[slug]', en: '/projects/[slug]', es: '/proyectos/[slug]' },
    '/gallery': { cs: '/galerie', en: '/gallery', es: '/galeria' },
    '/contact': { cs: '/kontakt', en: '/contact', es: '/contacto' },
  },
})

// i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/routing.test.ts --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 3: Add request config and middleware locale detection

**Files:**
- Create: `i18n/request.ts`
- Create: `middleware.ts`
- Create: `messages/cs.json`
- Create: `messages/en.json`
- Create: `messages/es.json`
- Test: `tests/i18n/messages.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import cs from '@/messages/cs.json'
import en from '@/messages/en.json'
import es from '@/messages/es.json'

describe('message parity', () => {
  it('has required navbar keys in all locales', () => {
    expect(cs.nav.projects).toBeTypeOf('string')
    expect(en.nav.projects).toBeTypeOf('string')
    expect(es.nav.projects).toBeTypeOf('string')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/messages.test.ts --run`
Expected: FAIL (missing message files/keys)

**Step 3: Write minimal implementation**

```ts
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const maybeLocale = await requestLocale
  const locale = hasLocale(routing.locales, maybeLocale)
    ? maybeLocale
    : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/messages.test.ts --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 4: Migrate route tree to `app/[locale]`

**Files:**
- Create: `app/[locale]/layout.tsx`
- Move/Modify: `app/(home)/page.tsx` -> `app/[locale]/(home)/page.tsx`
- Move/Modify: `app/projects/page.tsx` -> `app/[locale]/projects/page.tsx`
- Move/Modify: `app/projects/layout.tsx` -> `app/[locale]/projects/layout.tsx`
- Move/Modify: `app/gallery/page.tsx` -> `app/[locale]/gallery/page.tsx`
- Move/Modify: `app/gallery/layout.tsx` -> `app/[locale]/gallery/layout.tsx`
- Move/Modify: `app/contact/page.tsx` -> `app/[locale]/contact/page.tsx`
- Move/Modify: `app/contact/layout.tsx` -> `app/[locale]/contact/layout.tsx`
- Move/Modify: `app/projects/[slug]/page.tsx` -> `app/[locale]/projects/[slug]/page.tsx`
- Move/Modify: `app/projects/[slug]/layout.tsx` -> `app/[locale]/projects/[slug]/layout.tsx`
- Move/Modify: `app/not-found.tsx` -> `app/[locale]/not-found.tsx`
- Modify: `app/layout.tsx`
- Test: `tests/i18n/locale-layout.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react'
import LocaleLayout from '@/app/[locale]/layout'

it('sets html language from locale params', async () => {
  const params = Promise.resolve({ locale: 'es' })
  render(await LocaleLayout({ children: <div>ok</div>, params }))
  expect(screen.getByText('ok')).toBeInTheDocument()
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/locale-layout.test.tsx --run`
Expected: FAIL (missing locale layout)

**Step 3: Write minimal implementation**

```tsx
// app/[locale]/layout.tsx (shape)
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    // call notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/locale-layout.test.tsx --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 5: Replace navigation/linking with locale-aware APIs

**Files:**
- Modify: `components/navbar/navbar.tsx`
- Modify: `components/navbar/nav-item.tsx`
- Modify: `components/navbar/mobile-navbar.tsx`
- Modify: `components/navbar/mobile-nav-item.tsx`
- Modify: `components/breadcrumb.tsx`
- Modify: `components/see-all.tsx`
- Modify: `components/project.tsx`
- Modify: `components/footer/footer-icon.tsx`
- Test: `tests/i18n/navigation-links.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { SeeAll } from '@/components/see-all'

it('renders locale-aware gallery link target', () => {
  render(<SeeAll href='/gallery' />)
  expect(screen.getByRole('link')).toBeInTheDocument()
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/navigation-links.test.tsx --run`
Expected: FAIL after removing legacy language store imports.

**Step 3: Write minimal implementation**

```tsx
// replace next/link imports
import { Link } from '@/i18n/navigation'
```

```tsx
// for project detail links
<Link href={{ pathname: '/projects/[slug]', params: { slug } }}>
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/navigation-links.test.tsx --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 6: Replace language store with `next-intl` in shared UI components

**Files:**
- Modify: `components/home/hero.tsx`
- Modify: `components/home/gallery.tsx`
- Modify: `components/home/projects.tsx`
- Modify: `components/contact.tsx`
- Modify: `components/footer/footer.tsx`
- Modify: `components/navbar/theme-toggle.tsx`
- Modify: `components/navbar/language-selector.tsx`
- Test: `tests/i18n/shared-components.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { ThemeToggle } from '@/components/navbar/theme-toggle'

it('uses translated theme labels', () => {
  render(<ThemeToggle />)
  expect(screen.getByText(/Light|Světlý|Claro/)).toBeInTheDocument()
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/shared-components.test.tsx --run`
Expected: FAIL (legacy `useLanguage` dependency)

**Step 3: Write minimal implementation**

```tsx
import { useTranslations, useLocale } from 'next-intl'

const t = useTranslations('theme')
const locale = useLocale()
```

```tsx
// language selector should call router.replace(pathname, { locale: nextLocale })
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/shared-components.test.tsx --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 7: Migrate gallery page to translated filter labels

**Files:**
- Modify: `app/[locale]/gallery/page.tsx`
- Create: `lib/gallery-categories.ts`
- Test: `tests/i18n/gallery-filters.test.tsx`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { getCategoryLabel } from '@/lib/gallery-categories'

describe('gallery category labels', () => {
  it('returns Spanish label for travel', () => {
    expect(getCategoryLabel('travel', 'es')).toBe('Viajes')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/gallery-filters.test.tsx --run`
Expected: FAIL (`getCategoryLabel` missing)

**Step 3: Write minimal implementation**

```ts
export function getCategoryLabel(category: Category, locale: AppLocale): string {
  // map cars/travel/people/animals/nature/retro/posters for cs/en/es
}
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/gallery-filters.test.tsx --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 8: Migrate project list/detail and remove `any`

**Files:**
- Modify: `database/projects.ts`
- Create: `types/project.ts`
- Create: `lib/projects.ts`
- Modify: `components/projects/projects.tsx`
- Modify: `app/[locale]/projects/[slug]/page.tsx`
- Modify: `app/[locale]/projects/[slug]/layout.tsx`
- Test: `tests/i18n/projects-localization.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { getLocalizedProjectText } from '@/lib/projects'

describe('project localization', () => {
  it('falls back from es to en when es text is missing', () => {
    expect(getLocalizedProjectText({ en: 'Hello', cs: 'Ahoj' }, 'es')).toBe('Hello')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/projects-localization.test.ts --run`
Expected: FAIL (helper/type missing)

**Step 3: Write minimal implementation**

```ts
export type LocalizedText = {
  cs: string
  en: string
  es?: string
}

export function getLocalizedProjectText(
  input: LocalizedText,
  locale: AppLocale,
): string {
  if (locale === 'cs') return input.cs
  if (locale === 'es') return input.es ?? input.en
  return input.en
}
```

Also replace all `any` lookups with typed find helpers:

```ts
const project = getProjectBySlug(slug)
if (!project) notFound()
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/projects-localization.test.ts --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 9: Localize metadata and SEO alternates

**Files:**
- Create: `lib/seo.ts`
- Modify: `app/[locale]/(home)/page.tsx`
- Modify: `app/[locale]/projects/layout.tsx`
- Modify: `app/[locale]/gallery/layout.tsx`
- Modify: `app/[locale]/contact/layout.tsx`
- Modify: `app/[locale]/projects/[slug]/layout.tsx`
- Test: `tests/i18n/seo-metadata.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { buildAlternates } from '@/lib/seo'

describe('seo alternates', () => {
  it('returns language alternates for all locales', () => {
    const alt = buildAlternates('/projects')
    expect(alt.languages?.['cs-CZ']).toContain('/cs/projekty')
    expect(alt.languages?.['en-US']).toContain('/en/projects')
    expect(alt.languages?.['es-ES']).toContain('/es/proyectos')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/seo-metadata.test.ts --run`
Expected: FAIL (`buildAlternates` missing)

**Step 3: Write minimal implementation**

```ts
export function buildAlternates(pathname: '/projects' | '/gallery' | '/contact' | '/') {
  // return canonical + languages map using localized pathnames
}
```

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/seo-metadata.test.ts --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 10: Regenerate sitemap and update robots for localized routes

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/robots.txt`
- Test: `tests/i18n/sitemap.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'

describe('sitemap locales', () => {
  it('contains localized projects index URLs', () => {
    const entries = sitemap().map((x) => x.url)
    expect(entries).toContain('https://baudys.dev/cs/projekty')
    expect(entries).toContain('https://baudys.dev/en/projects')
    expect(entries).toContain('https://baudys.dev/es/proyectos')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/sitemap.test.ts --run`
Expected: FAIL (only non-localized URLs exist)

**Step 3: Write minimal implementation**

```ts
// generate entries for each locale for /, /projects, /projects/[slug], /gallery, /contact
```

Update robots allow rules for localized segments only.

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/sitemap.test.ts --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 11: Remove legacy language store and dead code

**Files:**
- Delete: `store/use-language.ts`
- Modify: all imports referencing `@/store/use-language`
- Test: `tests/i18n/no-legacy-store.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('legacy language store removed', () => {
  it('does not reference use-language store', () => {
    const source = readFileSync(join(process.cwd(), 'components/navbar/navbar.tsx'), 'utf8')
    expect(source.includes("@/store/use-language")).toBe(false)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `bunx vitest tests/i18n/no-legacy-store.test.ts --run`
Expected: FAIL (legacy import still present)

**Step 3: Write minimal implementation**

Remove all `useLanguage` imports/usages and replace with `next-intl` locale/translation APIs.

**Step 4: Run test to verify it passes**

Run: `bunx vitest tests/i18n/no-legacy-store.test.ts --run`
Expected: PASS

**Step 5: Checkpoint**

User-managed checkpoint.

### Task 12: Final quality gate and smoke checks

**Files:**
- Modify (if needed): any files flagged by lint/build.
- Create: `docs/plans/2026-02-17-next-intl-i18n-smoke-checklist.md`

**Step 1: Write the failing validation command**

Run: `bun run lint && bun run build`
Expected: FAIL at first if any migration regressions remain.

**Step 2: Fix minimal issues**

Address only reported errors/warnings that block correctness.

**Step 3: Re-run validation**

Run: `bun run lint && bun run build`
Expected: PASS

**Step 4: Manual smoke**

Verify:
- `/` redirect behavior (cookie > Accept-Language > default)
- `/cs/projekty`, `/en/projects`, `/es/proyectos`
- project detail slug stability across locales
- locale switcher preserves current page
- canonical/hreflang outputs
- localized 404

**Step 5: Checkpoint**

User-managed final checkpoint.

