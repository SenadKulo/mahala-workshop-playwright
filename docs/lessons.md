# Lessons: Playwright + TypeScript on Mahala Workshop

Each lesson: short explanation → task → Senad writes and runs it → review.
The "VAF" column says what is the same or different in VAF (Selenium, .NET).

| # | Topic | What it adds to the repo | VAF comparison |
|---|-------|--------------------------|----------------|
| 0 | Setup: `npm init playwright@latest`, what each file is for, first test, running it (CLI, `--ui`, HTML report) | `package.json`, `playwright.config.ts`, first test for the home page | NuGet package + NUnit project; ChromeDriver vs Playwright's own browsers |
| 1 | Locators: `getByRole`, `getByText`, `getByLabel`, CSS; locators are lazy; `codegen` | navigation and catalog tests | `IElementContext` + `By.Id/CssSelector/XPath` |
| 2 | Auto-waiting and assertions: `expect(locator)` (waits) vs `expect(value)` (does not), `expect.soft` | catalog tests | `.Should().HaveElement<...>()`, VAF waiting and `LetsUseLoader` |
| 3 | Configuration: `baseURL`, `projects` (local / prod), retries, trace, screenshot, video | config with two environments | `app.config` / `VAF_<key>` environment variables |
| 4 | Debugging: trace viewer, `--debug`, UI mode, `page.pause()` | — | VAF HTML log (`ConvertLogToHtml`) |
| 5 | Page Object Model in TypeScript: classes, `Locator` fields, inheritance (`BasePage`) | `src/pages/` | nested `IPageContext` / `ISectionContext` classes |
| 6 | Fixtures (`test.extend`): page objects and per-project options | `src/fixtures.ts` | `[SetUp]`, `TestBase`, `SharedContext`, `PracticeSteps` |
| 7 | Parameterized tests: 4 languages (`bs` without prefix, `en/it/fr`) | localization tests | NUnit `[TestCase]` / `[TestCaseSource]` |
| 8 | Tags and production safety: `@local-only`, `grep` / `grepInvert` | rule in the config | NUnit `[Category]` |
| 9 | API tests without a browser (`request`): robots.txt, sitemap, 404, redirect to login | `tests/api/` | not in VAF; in .NET this would be `HttpClient` |
| 10 | Mobile: `devices`, hamburger menu | `prod-mobile` project | `BrowserOptions` / window size |
| 11 | Forms: inquiry form, validation, honeypot (local only) | `tests/ui/inquiry.spec.ts` | `TextInputActions`, `TextAreaActions`, `SelectBoxActions` |
| 12 | Authentication: admin login once, `storageState`, credentials from environment variables | setup project | login as a shared step before each test |
| 13 | Network: `page.route`, interception and mocking, 429 rate limit (local) | — | Selenium cannot do this without a proxy |
| 14 | CI: GitHub Actions, read-only tests against production, report as an artifact | `.github/workflows/` | VAF-Demo GitHub Actions |
| 15 | Extras: accessibility (`@axe-core/playwright`), visual comparison (`toHaveScreenshot`) | — | — |

## Progress

- 2026-11-01: plan created; GitHub repo created (description, website, topics).
- 2026-11-01: **lesson 0 done.** `npm init playwright@latest` (TypeScript, `tests`, no GitHub
  Actions, browsers installed); example tests run on 3 projects (2 tests × 3 browsers = 6);
  UI mode and HTML report; first own test `tests/home.spec.ts` (title of the home page);
  a deliberately failing assertion showed auto-retry (5 s timeout, error message, `error-context.md`).
- 2026-11-01: **lesson 1 done.** Locators are lazy and re-resolved on every action; strict mode
  (the "Katalog" link exists 3 times: nav, "Istraži Katalog", footer) solved by scoping to
  `getByRole('navigation')`; "Istraži Katalog" looks like a button but is a link; positional
  XPath and full-sentence `toHaveText` discussed as brittle. Two navigation tests in
  `tests/home.spec.ts`; `package.json` cleaned up.
- 2026-11-10: **lesson 2 done.** Actionability checks before actions; web-first assertions
  (retry up to 5 s) vs generic assertions on values (check once); value-returning methods
  like `allInnerTexts()` do not wait. `tests/catalog.spec.ts`: sort by price ascending
  (`toHaveURL` as the sync point before reading prices) and the "Prikazano: X od Y" counter
  (regex, no hard-coded count). Lessons learned the hard way: a test that passed 10/10 without
  the sync point was only lucky with timing; an empty array passes a sort check (guard with
  `expect(prices.length).toBeGreaterThan(0)`); `sort()` without a copy compares an array with
  itself; never put `expect` behind `if`/`&&`; make a test fail on purpose to trust it.
  Also added `docs/typescript-for-csharp.md`.
  Next: **lesson 3** (configuration: `baseURL`, projects local/prod).
