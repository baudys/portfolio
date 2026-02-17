# SEO Operations Playbook

## Scope
This document covers the recurring SEO operations attached to the implemented technical work.

## Baseline Setup
1. Connect Google Search Console to `https://baudys.dev` with Domain property.
2. Submit `https://baudys.dev/sitemap.xml`.
3. In GA4, ensure lead events are tracked as conversions (`contact_click`, `email_copy`, form submit event if present).
4. Build one shared dashboard with these metrics:
   - Impressions
   - Clicks
   - CTR
   - Average position
   - Non-brand clicks
   - Leads from organic sessions

## 14-Day Cadence
1. Pull pages with high impressions + low CTR.
2. Refresh title/description for those pages.
3. Revalidate canonical + hreflang after edits.
4. Add at least one internal link from a high-traffic page to a target service page.
5. Record change log date and measured delta in 14 days.

## Monthly Authority Tasks
1. Publish or refresh at least one case study section with measurable outcomes.
2. Secure 1-2 external mentions from relevant CZ web/dev sources.
3. Audit crawl/index coverage in Search Console and resolve new warnings.

## Alert Thresholds
- CTR drop > 20% on a priority page over 14 days.
- Organic clicks drop > 15% month-over-month.
- Any sudden increase in excluded/discovered-not-indexed URLs.

When thresholds are exceeded, run a focused technical review before content expansion.
