# mahala-workshop-playwright — instructions for Claude

Playwright + TypeScript tests for the Mahala Workshop site (https://mahalaworkshop.com).
Purpose: **Senad learns Playwright through lessons**; along the way the repo becomes a portfolio
project and a real regression suite for the site. Public GitHub repo: no passwords, internal
data or production secrets anywhere.

## Working mode: lessons

- **Senad writes the code, Claude teaches.** Claude does not write tests, page objects or
  configuration ahead of time. Each lesson: short explanation → task → Senad writes and runs
  it → Claude reviews and explains what could be better and why.
- Claude writes code only when Senad explicitly asks (e.g. "show me the solution").
- One lesson = one topic. Do not skip ahead or add things from later lessons.
- **Compare with VAF** in every lesson where it makes sense. VAF is Senad's own framework:
  `C:\Users\senad.kulo\source\repos\VisionAutomationFramework` (fluent API over Selenium
  WebDriver, .NET; page objects as nested `IPageContext` / `ISectionContext` /
  `IElementContext` classes with `By` locators; `Testing.On<Chrome>().LetsNavigateTo(...).Should()...`;
  shared steps in `PracticeSteps`; NUnit tests). Examples: `src/VisionAutomationFramework.PracticeTests`.
- Lesson plan and progress: `docs/lessons.md`. Update the progress section at the end of each lesson.
- A draft Claude built ahead of time (config, page objects, tests) was moved out of the repo to
  `C:\Users\senad.kulo\Source\Repos\_drafts\mahala-workshop-playwright-v0`. It is not part of
  the repo; it only reminds Claude what is worth covering.

## How we work

- **Talk to Senad in Bosnian.** Everything committed to the repo (code, comments, test names,
  commit messages, docs) is in English.
- **Senad commits and pushes, not Claude.** When a change is done, give a ready block:

  ```powershell
  cd C:\Users\senad.kulo\Source\Repos\mahala-workshop-playwright
  git add <specific files>
  git commit -m "<message>"
  git push
  ```

- Node.js is in `C:\Program Files\nodejs` but not always on the PATH of Claude's session. If
  `npm` is missing: `$env:Path = "C:\Program Files\nodejs;" + $env:Path`.

## Application under test

Source: `C:\Users\senad.kulo\Source\Repos\MahalaWorkshop` (ASP.NET Core Razor Pages, net9.0,
EF Core, SQL Server). Main documentation: `MahalaWorkshopFiles/PROJECT_CONTEXT.md` in that
repo. Read the relevant part before a lesson about a page.

- **Local:** `dotnet run --project MahalaWorkshop.Web` → http://localhost:5030
  (database `(localdb)\mssqllocaldb`, `MahalaWorkshop`; an empty database gets sample products).
- **Languages:** `bs` (default, NO prefix: `/Katalog`), `en`, `it`, `fr` (`/en/Katalog`).
  `/bs/...` is a deliberate 404. Language comes ONLY from the route (not a cookie, not
  Accept-Language). Source: `MahalaWorkshop.Web/Localization/SupportedCultures.cs`.
- **Public pages:** `/`, `/Katalog` (`?category=slug&sortOrder=price_asc|price_desc|name_desc&p=N`),
  `/ONama`, `/Restauracija`, `/Cnc`, `/Cnc/Upute`, `/product/{slug}`, `/sitemap.xml`, `/robots.txt`.
- **Admin:** `/Admin/*` requires the `Admin` role; anonymous → 302 to `/Account/Login`. No
  public registration (`/Identity/Account/Register` → 404).
- **Inquiry form** (`/product/{slug}`, `#inquiryForm`): fields `#Inquiry_Name` (max 100),
  `#Inquiry_Email` (200), `#Inquiry_Message` (2000), honeypot `#Inquiry_Website`
  (filled → nothing is saved, the bot sees a normal success). Rate limit: 5 POSTs per
  10 minutes per IP → 429 with a message in the page's language. A product can have required
  variants (dropdown `variant_{groupId}`).

## Production rules (important)

Production is small shared hosting and a real site with real customers.

- Tests that **write data, send email or touch statistics** never run against production
  (`@local-only` tag + `grepInvert` in the config, once we reach that lesson).
  - Every GET of `/product/{slug}` increments `ViewCount` → admin Analytics.
  - A valid inquiry submit saves the inquiry and emails the owner and the customer.
- No load tests against production. CI uses at most 2 workers.
- Admin login on production is never automated.
