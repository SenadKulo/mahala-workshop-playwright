# TypeScript for C# developers — cheat sheet

Only what you need to write Playwright tests. Left: C#, right: TypeScript.

## Variables and types

| C# | TypeScript | Note |
|---|---|---|
| `var name = "Mahala";` | `const name = 'Mahala';` | `const` = cannot be reassigned. Use it by default. |
| `var count = 0; count++;` | `let count = 0; count++;` | `let` only when the value changes. Never use `var` in TS. |
| `string`, `int`, `decimal`, `bool` | `string`, `number`, `boolean` | One `number` type for all numbers. |
| `string? x = null;` | `let x: string \| null = null;` | Also `undefined` = "not set at all". |
| `List<string>` | `string[]` | |
| `Dictionary<string, int>` | `Record<string, number>` | |
| `int Add(int a, int b)` | `function add(a: number, b: number): number` | Types after the name, with `:`. Often inferred, so you can leave them out. |

## Strings

| C# | TypeScript |
|---|---|
| `"text"` | `'text'` or `"text"` (both fine; this repo uses `'`) |
| `$"Hello {name}"` | `` `Hello ${name}` `` (backticks) |
| `s.Contains("KM")` | `s.includes('KM')` |
| `s.Replace(" KM", "")` | `s.replace(' KM', '')` — replaces **only the first** match |
| replace all | `s.replace(/\./g, '')` (regex with `g`) or `s.replaceAll('.', '')` |
| `s.Trim()` | `s.trim()` |
| `int.Parse("20")` | `Number('20')` — returns `NaN` instead of throwing if it is not a number |

## Regex

| C# | TypeScript |
|---|---|
| `new Regex("sortOrder=price_asc")` | `/sortOrder=price_asc/` |
| `new Regex("^Katalog$")` | `/^Katalog$/` |
| `RegexOptions.IgnoreCase` | `/katalog/i` |
| `"/KM/"` is just a string | `'/KM/'` is also just a string — **no quotes** around a regex |

Escape `/` and `.` inside a regex: `/\/Katalog$/`, `/\./`.

## Lambdas and LINQ

| C# (LINQ) | TypeScript (array methods) |
|---|---|
| `x => x * 2` | `(x) => x * 2` |
| `x => { ...; return y; }` | `(x) => { ...; return y; }` |
| `.Select(x => ...)` | `.map((x) => ...)` |
| `.Where(x => ...)` | `.filter((x) => ...)` |
| `.First(x => ...)` | `.find((x) => ...)` (returns `undefined` if none) |
| `.Any(x => ...)` / `.All(...)` | `.some(...)` / `.every(...)` |
| `.Count()` | `.length` (property, not a method) |
| `.ToList()` (copy) | `[...items]` |
| `.OrderBy(x => x)` | `[...items].sort((a, b) => a - b)` |
| `string.Join(", ", items)` | `items.join(', ')` |

⚠️ `sort()` **changes the original array** and, without a compare function, sorts **as text**:
`[20, 120, 70].sort()` → `[120, 20, 70]`. Always copy and pass `(a, b) => a - b` for numbers.

## async / await

Same idea as C#: `Promise<T>` is `Task<T>`.

```ts
test('...', async ({ page }) => {   // async lambda, like async Task
  await page.goto('/Katalog');       // every browser call returns a Promise
});
```

⚠️ **Forgetting `await` is the #1 Playwright bug.** The line starts, the test does not wait for
it, and it may pass without the action ever happening. In C# the compiler warns you (CS4014);
in TS it usually does not.

Rule of thumb: if it talks to the browser (`goto`, `click`, `fill`, `textContent`,
`allInnerTexts`, `expect(locator)...`), it needs `await`. Creating a locator does not:

```ts
const link = page.getByRole('link', { name: 'Katalog' }); // no await: just a description
await link.click();                                       // await: talks to the browser
```

## Objects and options

C# named/optional arguments become an **object literal** in TS:

| C# | TypeScript |
|---|---|
| `GetByRole(AriaRole.Link, new() { Name = "Katalog", Exact = true })` | `getByRole('link', { name: 'Katalog', exact: true })` |
| `new { Name = "Senad", Age = 40 }` | `{ name: 'Senad', age: 40 }` |
| `obj.Name` | `obj.name` |

Destructuring — the `{ page }` in a test is this:

```ts
async ({ page }) => { ... }   // "take the page property out of the object Playwright passes in"
```

## null, undefined and equality

| C# | TypeScript |
|---|---|
| `x?.Length` | `x?.length` |
| `x ?? "default"` | `x ?? 'default'` |
| `a == b` | `a === b` — always use **three** `=` (`==` converts types: `'1' == 1` is `true`) |
| `a != b` | `a !== b` |

## Modules (using / namespace)

| C# | TypeScript |
|---|---|
| `using VisionAutomationFramework.Actions;` | `import { test, expect } from '@playwright/test';` |
| `public class CatalogPage` | `export class CatalogPage` |
| (project reference) | `import { CatalogPage } from '../src/pages/CatalogPage';` (relative path, no `.ts`) |

Without `export`, a class or function is visible only inside its own file (like `internal`, but per file).

## Classes (for page objects, lesson 5)

```ts
export class CatalogPage {
  readonly sortButton: Locator;                 // like a readonly property

  constructor(private readonly page: Page) {    // constructor parameter that is also a field
    this.sortButton = page.getByRole('button', { name: 'Sortiraj po' });
  }

  async sortByPriceAscending(): Promise<void> { // async Task
    await this.sortButton.click();              // `this.` is required, unlike C#
  }
}
```

## Playwright: the two kinds of `expect`

| | Example | Waits? |
|---|---|---|
| Web-first (on a locator / page) | `await expect(locator).toBeVisible()` | **yes**, retries up to 5 s |
| Generic (on a value) | `expect(prices).toEqual(sorted)` | **no**, checks once |

If you check something **on the page**, use the web-first one. `expect(await x.isVisible()).toBe(true)`
looks right but does not wait.
