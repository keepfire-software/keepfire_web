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
    await expect(page.getByText("NOW SELECTING OUR FIRST 5 HVAC COMPANIES")).toBeVisible();
    const price = page.getByRole("complementary", { name: "Launch pricing", exact: true });
    await expect(price.getByText("$500", { exact: true })).toBeVisible();
    await expect(price.locator("s")).toHaveText("$1,000");
    await expect(price.locator("s")).toHaveCSS("text-decoration-line", "line-through");
    await expect(price.getByText("$0", { exact: true })).toBeVisible();
    await expect(price.getByText(/first 5 customers/)).toBeVisible();
    await expectContentFits(page);

    await expect(
      page.getByRole("heading", { name: "What Keepfire brings to your shop" }),
    ).toBeVisible();
    const included = page.getByRole("list").filter({ hasText: "Launch support" }).first();
    for (const item of [
      "Missed-call recovery",
      "Callback and estimate follow-up",
      "Job loose-end tracking",
      "Phone and text infrastructure",
      "Done-for-you setup and configuration",
      "Owner onboarding and team training",
      "Launch support",
    ]) {
      await expect(included.getByText(item, { exact: true })).toBeVisible();
    }
    const summary = page.getByRole("complementary", {
      name: "Launch pricing summary",
      exact: true,
    });
    await expect(summary.getByText("$500", { exact: true }).first()).toBeVisible();
    await expect(summary.getByText("/ month")).toBeVisible();
    await expect(summary.locator("s")).toContainText("$1,000");
    await expect(summary.locator("s")).toHaveCSS("text-decoration-line", "line-through");
    await expect(summary.getByText(/Waived for our first 5 customers/i)).toBeVisible();
    await expect(summary.getByText("First 21 days free")).toBeVisible();
    await expect(summary.getByText("Month-to-month")).toBeVisible();
    await expect(summary.getByText("First paid month refundable")).toBeVisible();
    await expect(summary.getByText(/recovered/).first()).toBeVisible();
    await expect(summary.getByText(/profit = Keepfire/)).toBeVisible();
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

    const question = page.locator("summary").first();
    await question.focus();
    await expect(question).toBeFocused();
    await expect(question).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
    await expect(page.locator("details").first().locator("p")).toBeVisible();
    await expectContentFits(page);
    await question.click();
    await expect(page.locator("details").first()).not.toHaveAttribute("open");

    await page.screenshot({ path: testInfo.outputPath(`pricing-${width}.png`), fullPage: true });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await page.screenshot({ path: testInfo.outputPath(`pricing-${width}-large-text.png`), fullPage: true });
    await expectContentFits(page);
    expect(errors).toEqual([]);
  });
}
