# mahala-workshop-playwright — upute za Claude

Playwright + TypeScript testovi za sajt Mahala Workshop (https://mahalaworkshop.com).
Svrha: **Senad uči Playwright kroz lekcije**; usput nastaje portfolio projekat i stvarna
regresija za sajt. Javni repo na GitHubu: u kodu nema lozinki, internih podataka ni
produkcijskih tajni.

## Način rada: lekcije

- **Senad piše kod, Claude predaje.** Claude ne pravi gotove testove, page objekte ni
  konfiguraciju unaprijed. Svaka lekcija: kratko objašnjenje → zadatak → Senad napiše i
  pokrene → Claude pregleda i objasni šta bi bilo bolje i zašto.
- Claude smije napisati kod samo kad Senad to izričito traži (npr. "pokaži rješenje").
- Jedna lekcija = jedna tema. Ne preskakati unaprijed i ne dodavati stvari iz kasnijih lekcija.
- **Poređenje sa VAF-om** u svakoj lekciji gdje ima smisla. VAF je Senadov framework:
  `C:\Users\senad.kulo\source\repos\VisionAutomationFramework` (fluent API nad Selenium
  WebDriverom, .NET; page objekti kao ugniježđene klase `IPageContext` / `ISectionContext` /
  `IElementContext` s `By` lokatorima; `Testing.On<Chrome>().LetsNavigateTo(...).Should()...`;
  shared steps u `PracticeSteps`; testovi u NUnitu). Primjeri: `src/VisionAutomationFramework.PracticeTests`.
- Plan lekcija i stanje: `docs/lekcije.md` (na bosanskom). Na kraju lekcije ažurirati stanje.
- Nacrt koji je Claude ranije napravio unaprijed (config, page objekti, testovi) sklonjen je u
  `C:\Users\senad.kulo\Source\Repos\_drafts\mahala-workshop-playwright-v0`. Nije dio repoa;
  služi samo Claudeu kao podsjetnik šta je bitno pokriti.

## Kako radimo

- **Komunikacija na bosanskom.** Kod, komentari, nazivi testova i commit poruke na engleskom.
- **Commit i push radi vlasnik, ne Claude.** Kad je izmjena gotova, pošalji gotov blok:

  ```powershell
  cd C:\Users\senad.kulo\Source\Repos\mahala-workshop-playwright
  git add <konkretni fajlovi>
  git commit -m "<poruka>"
  git push
  ```

- Node.js je u `C:\Program Files\nodejs`, ali nije uvijek u PATH-u Claude sesije. Ako `npm`
  ne postoji: `$env:Path = "C:\Program Files\nodejs;" + $env:Path`.

## Aplikacija koja se testira

Izvorni kod: `C:\Users\senad.kulo\Source\Repos\MahalaWorkshop` (ASP.NET Core Razor Pages,
net9.0, EF Core, SQL Server). Glavna dokumentacija: `MahalaWorkshopFiles/PROJECT_CONTEXT.md`
u tom repou. Pročitaj relevantan dio prije lekcije za neku stranicu.

- **Lokalno:** `dotnet run --project MahalaWorkshop.Web` → http://localhost:5030
  (baza `(localdb)\mssqllocaldb`, `MahalaWorkshop`; prazna baza dobije primjer proizvode).
- **Jezici:** `bs` (podrazumijevani, BEZ prefiksa: `/Katalog`), `en`, `it`, `fr` (`/en/Katalog`).
  `/bs/...` je namjerno 404. Jezik se određuje SAMO iz rute (ne kolačić, ne Accept-Language).
  Izvor: `MahalaWorkshop.Web/Localization/SupportedCultures.cs`.
- **Javne stranice:** `/`, `/Katalog` (`?category=slug&sortOrder=price_asc|price_desc|name_desc&p=N`),
  `/ONama`, `/Restauracija`, `/Cnc`, `/Cnc/Upute`, `/product/{slug}`, `/sitemap.xml`, `/robots.txt`.
- **Admin:** `/Admin/*` traži ulogu `Admin`; anonimni → 302 na `/Account/Login`. Nema javne
  registracije (`/Identity/Account/Register` → 404).
- **Upitni formular** (`/product/{slug}`, `#inquiryForm`): polja `#Inquiry_Name` (max 100),
  `#Inquiry_Email` (200), `#Inquiry_Message` (2000), honeypot `#Inquiry_Website`
  (popunjen → ništa se ne sprema, bot vidi normalan uspjeh). Rate limit: 5 POST-ova na
  10 minuta po IP-u → 429 s porukom na jeziku stranice. Proizvod može imati obavezne
  varijante (dropdown `variant_{groupId}`).

## Pravila za produkciju (bitno)

Produkcija je mali shared hosting i pravi sajt s pravim kupcima.

- Testovi koji **pišu podatke, šalju email ili diraju statistiku** nikad ne idu na produkciju
  (tag `@local-only` + `grepInvert` u configu, kad dođemo do te lekcije).
  - Svaki GET na `/product/{slug}` povećava `ViewCount` → admin Analytics.
  - Validan submit upita sprema upit i šalje email vlasniku i kupcu.
- Bez testova opterećenja na produkciji. CI najviše 2 workera.
- Admin login na produkciji se ne automatizuje.
