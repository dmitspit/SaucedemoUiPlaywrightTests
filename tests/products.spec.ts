import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

let inventoryPage: InventoryPage;

test.beforeEach(async ({page})=>{
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    inventoryPage = await loginPage.logIn("standard_user", "secret_sauce");
});

test("Products should be present on Inventory page", async({page})=>{
    const products = await inventoryPage.getAllProducts();
    expect(products).toHaveLength(6);

    for (const product of products) {
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.price).toBeDefined();

        await expect(product.addToCartBtn).toBeVisible();
        await expect(product.image).toBeVisible();
    }
})