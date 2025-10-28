import { test, expect } from "@playwright/test";

const FLOWCHART_URL = "/flowchart";
const STORAGE_KEY = "pf:progress:v1";

test.describe("flowchart progress", () => {
  test("persists completed nodes after reload", async ({ page }) => {
    await page.goto(FLOWCHART_URL);

    const startNode = page.getByRole("button", { name: "Start" });
    await startNode.click();
    await page.getByRole("button", { name: "Mark complete" }).click();
    await expect(page.getByRole("button", { name: "Mark as incomplete" })).toBeVisible();

    await page.reload();

    await expect(page.locator('[data-node-trigger="start"]')).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("1 of 7 steps complete")).toBeVisible();
    const storedProgress = await page.evaluate((key) => window.localStorage.getItem(key), STORAGE_KEY);
    expect(storedProgress).not.toBeNull();
  });

  test("reset progress clears storage and UI state", async ({ page }) => {
    await page.goto(FLOWCHART_URL);

    await page.getByRole("button", { name: "Start" }).click();
    await page.getByRole("button", { name: "Mark complete" }).click();
    await page.getByRole("button", { name: "Close" }).click();

    await page.getByRole("button", { name: "Reset Progress" }).click();
    await expect(page.getByText("0 of 7 steps complete")).toBeVisible();

    const storedProgress = await page.evaluate((key) => window.localStorage.getItem(key), STORAGE_KEY);
    expect(storedProgress).toBeNull();

    await page.reload();
    await expect(page.locator('[data-node-trigger="start"]')).toHaveAttribute("aria-pressed", "false");
  });

  test("activates matching tab and scrolls to anchor when a node is selected", async ({ page }) => {
    await page.goto(FLOWCHART_URL);

    await page.getByRole("button", { name: "High-Interest Debt" }).click();

    await expect(page.getByRole("tab", { name: "Debt" })).toHaveAttribute("data-state", "active");
    await expect(page).toHaveURL(/#debt$/);
    await expect(page.locator("section#debt")).toBeInViewport();
  });
});

