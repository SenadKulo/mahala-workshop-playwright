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
  Next: **lesson 0** (`npm init playwright@latest`).
