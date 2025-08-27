import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import users from '../test-data/users.json';

let loginPage: LoginPage;

test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
});

test("User can successfully login to the main page with valid credentials", async ({ page }) => {
    const inventoryPage: InventoryPage = await loginPage.logIn(users.standardUser.username, users.standardUser.password);
    await expect(inventoryPage.spanProducts).toHaveText("Products");
})

