import { fitCallHref } from "../../src/config/site";
import { expect, test, type Page } from "@playwright/test";

async function expectContentFits(page: Page) {
  const overflow = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    return [...document.querySelectorAll("header, main, footer, main *")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.left < -1 || rect.right > width + 1);
      })
      .map((element) => `${element.tagName}: ${element.textContent?.trim().slice(0, 70)}`);
  });
  expect(overflow, "Content must fit without horizontal clipping").toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual((await page.evaluate(() => document.documentElement.clientWidth)) + 1);
}

for (const width of [320, 390, 768, 1440]) {
  test(`pricing is readable and usable at ${width}px`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Coming soon for small HVAC companies")).toBeVisible();
    const price = page.getByRole("complementary", { name: "Launch pricing" });
    await expect(price.getByText("$500", { exact: true })).toBeVisible();
    await expect(price.locator("s")).toHaveText("$1,000");
    await expect(price.locator("s")).toHaveCSS("text-decoration-line", "line-through");
    await expect(price.getByText("$0", { exact: true })).toBeVisible();
    await expect(price.getByText(/first 5 customers/)).toBeVisible();
    await expectContentFits(page);

    const calls = page.getByRole("link", { name: /Book a.*fit call/ });
    expect(await calls.count()).toBeGreaterThanOrEqual(3);
    for (const link of await calls.all()) {
      await expect(link).toHaveAttribute("href", fitCallHref);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      const box = await link.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.width).toBeGreaterThanOrEqual(44);
      await expect(link).toHaveCSS("border-radius", "5px");
      await expect(link).toHaveCSS("text-transform", "none");
    }

    const summary = page.locator("summary").first();
    await summary.focus();
    await expect(summary).toBeFocused();
    await expect(summary).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
    await expect(page.locator("details").first().locator("p")).toBeVisible();
    await expectContentFits(page);
    await summary.click();
    await expect(page.locator("details").first()).not.toHaveAttribute("open");

    await page.screenshot({ path: testInfo.outputPath(`pricing-${width}.png`), fullPage: true });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.screenshot({ path: testInfo.outputPath(`pricing-${width}-large-text.png`), fullPage: true });
    await expectContentFits(page);
    expect(errors).toEqual([]);
  });
}
