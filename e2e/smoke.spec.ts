import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("displays title and flowchart link", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "Take charge of your money with confidence"
      })
    ).toBeVisible();
    const flowchartLink = page.getByRole("link", {
      name: "Go to Flowchart (coming soon)"
    });
    await expect(flowchartLink).toBeVisible();
    await flowchartLink.click();
    await expect(page.getByText("This page could not be found.")).toBeVisible();
  });
});
