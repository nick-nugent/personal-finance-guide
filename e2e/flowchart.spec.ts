import { test, expect } from "@playwright/test";

test.describe("flowchart page", () => {
  test("opens drawer and restores focus", async ({ page }) => {
    await page.goto("/flowchart");

    const nodeButtons = page.locator("[data-node-trigger]");
    expect(await nodeButtons.count()).toBeGreaterThanOrEqual(6);

    const firstNode = nodeButtons.first();
    const firstNodeTitle =
      (await firstNode.locator("span").first().textContent())?.trim() ?? "";

    await firstNode.click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("heading", { name: firstNodeTitle })).toBeVisible();

    const drawerLinks = drawer.getByRole("link");
    expect(await drawerLinks.count()).toBeGreaterThanOrEqual(2);

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(firstNode).toBeFocused();
  });
});
