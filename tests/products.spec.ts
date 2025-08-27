import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import users from '../test-data/users.json';
import { ProductModel } from '../models/ProductModel';
import { ProductSort } from "../enums/ProductSort";

let inventoryPage: InventoryPage;

test.describe('Inventory Page Tests', () => {
    test.beforeEach(async ({page})=>{
        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        inventoryPage = await loginPage.logIn(users.standardUser.username, users.standardUser.password);
    });

    test("Products should be present on Inventory page", async({page})=>{
        const products: ProductModel[] = await inventoryPage.getAllProducts();
        expect(products).toHaveLength(6);

        for (const product of products) {
            expect(product.name).toBeDefined();
            expect(product.description).toBeDefined();
            expect(product.price).toBeDefined();

            await expect(product.addToCartBtn).toBeVisible();
            await expect(product.image).toBeVisible();
        }
    });

    test("User can sort products by price (low to high)", async ({ page }) => {
        const products: ProductModel[] = await inventoryPage.getAllProducts();

        expect(products).toHaveLength(6);

        const minPrice: number = Math.min(... products.map(p=>parseFloat(p.price)));
        await inventoryPage.sortProducts(ProductSort.PRICE_LOW_HIGH);
        const firstItem: number = (await inventoryPage.getAllProducts()).map(p=>parseFloat(p.price))[0];
        
        await page.screenshot({path: 'screenshots/sorted.png'});
        
        expect(minPrice).toBe(firstItem);
    });
});