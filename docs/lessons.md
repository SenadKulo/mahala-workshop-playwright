# Lekcije: Playwright + TypeScript nad Mahala Workshopom

Svaka lekcija: kratko objašnjenje → zadatak → Senad piše i pokreće → pregled.
Kolona "VAF" kaže šta je u VAF-u (Selenium, .NET) isto ili drugačije.

| # | Tema | Šta nastaje u repou | VAF poređenje |
|---|------|---------------------|---------------|
| 0 | Postavka: GitHub repo, `npm init playwright@latest`, šta je šta u projektu, prvi test, pokretanje (CLI, `--ui`, HTML report) | `package.json`, `playwright.config.ts`, prvi test za početnu stranicu | NuGet paket + NUnit projekat; ChromeDriver vs Playwrightovi preglednici |
| 1 | Lokatori: `getByRole`, `getByText`, `getByLabel`, CSS; lokator je "lijen"; `codegen` | test za navigaciju i katalog | `IElementContext` + `By.Id/CssSelector/XPath` |
| 2 | Auto-waiting i asercije: `expect(locator)` (čeka) vs `expect(value)` (ne čeka), `expect.soft` | testovi za katalog | `.Should().HaveElement<...>()`, VAF-ovo čekanje i `LetsUseLoader` |
| 3 | Konfiguracija: `baseURL`, `projects` (local / prod), retries, trace, screenshot, video | config s dva okruženja | `app.config` / `VAF_<ključ>` env varijable |
| 4 | Debug: trace viewer, `--debug`, UI mode, `page.pause()` | — | VAF HTML log (`ConvertLogToHtml`) |
| 5 | Page Object Model u TypeScriptu: klase, `Locator` polja, nasljeđivanje (`BasePage`) | `src/pages/` | ugniježđene klase `IPageContext` / `ISectionContext` |
| 6 | Fixtures (`test.extend`): page objekti i opcije po projektu | `src/fixtures.ts` | `[SetUp]`, `TestBase`, `SharedContext`, `PracticeSteps` |
| 7 | Parametrizovani testovi: 4 jezika (`bs` bez prefiksa, `en/it/fr`) | testovi lokalizacije | NUnit `[TestCase]` / `[TestCaseSource]` |
| 8 | Tagovi i sigurnost produkcije: `@local-only`, `grep` / `grepInvert` | pravilo u configu | NUnit `[Category]` |
| 9 | API testovi bez preglednika (`request`): robots.txt, sitemap, 404, redirect na login | `tests/api/` | VAF nema; u .NET-u bi to bio `HttpClient` |
| 10 | Mobilni prikaz: `devices`, hamburger meni | projekat `prod-mobile` | `BrowserOptions` / veličina prozora |
| 11 | Forme: upitni formular, validacija, honeypot (samo lokalno) | `tests/ui/inquiry.spec.ts` | `TextInputActions`, `TextAreaActions`, `SelectBoxActions` |
| 12 | Autentikacija: admin login jednom, `storageState`, kredencijali iz env varijabli | setup projekat | login kao shared step prije svakog testa |
| 13 | Mreža: `page.route`, presretanje i mockovanje, 429 rate limit (lokalno) | — | Selenium to ne radi bez proxyja |
| 14 | CI: GitHub Actions, read-only testovi na produkciji, report kao artefakt | `.github/workflows/` | VAF-Demo GitHub Actions |
| 15 | Dodatno: accessibility (`@axe-core/playwright`), vizuelno poređenje (`toHaveScreenshot`) | — | — |

## Stanje

- 2026-11-01: plan napravljen. Lokalni repo ima samo `CLAUDE.md` i ovaj fajl.
  Sljedeće: **lekcija 0** (GitHub repo je kreirao Senad, zatim `npm init playwright@latest`).
