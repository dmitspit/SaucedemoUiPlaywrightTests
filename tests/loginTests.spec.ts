import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import users from "../test-data/users.json";

let loginPage: LoginPage;

test.describe.parallel("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
  });

  test("User can successfully login to the main page with valid credentials @smoke", async ({
    page,
  }) => {
    const inventoryPage: InventoryPage = await loginPage.logIn(
      users.standardUser.username,
      users.standardUser.password
    );
    await expect(inventoryPage.spanProducts).toHaveText("Products");
  });

  test("User sees error message if hi is locked @regression", async ({
    page,
  }) => {
    const errorMsg = await loginPage.logInExpectError(
      users.lockedUser.username,
      users.lockedUser.password
    );
    await expect(errorMsg).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
