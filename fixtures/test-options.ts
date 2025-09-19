import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import users from "../test-data/users.json";

type InventoryFixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<InventoryFixtures>({
  inventoryPage: async ({ page }, use) => {
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    const inventoryPage = await loginPage.logIn(
      users.standardUser.username,
      users.standardUser.password
    );
    await use(inventoryPage);
  },
});

export { expect } from "@playwright/test";
