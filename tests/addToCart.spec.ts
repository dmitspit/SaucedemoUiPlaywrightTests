import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import users from "../test-data/users.json";
import { ProductModel } from "../models/ProductModel";
import { CartPage } from "../pages/CartPage";
import { CartModel } from "../models/CartModel";

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  inventoryPage = await loginPage.logIn(
    users.standardUser.username,
    users.standardUser.password
  );
});

test("User can add product to the cart", async ({ page }) => {
  const products: ProductModel[] = await inventoryPage.getAllProducts();
  expect(products).toHaveLength(6);

  let product = products[0];
  await product.addToCartBtn.click();

  await inventoryPage.shoppingbadge.waitFor({
    state: "visible",
    timeout: 1000,
  });

  await expect(await inventoryPage.shoppingbadge.innerText()).toBe("1");

  let cartPage: CartPage = await inventoryPage.goToCartPage();
  let cartItems: CartModel[] = await cartPage.getCartList();

  expect(cartItems).toHaveLength(1);

  expect.soft(cartItems[0].name).toBe(product.name);
  expect.soft(await cartItems[0].quantity.innerText()).toBe("1");
  expect.soft(cartItems[0].description).toBe(product.description);
  expect.soft(cartItems[0].price).toBe(product.price);
});
