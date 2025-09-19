import { test, expect } from "../fixtures/test-options";
import { ProductModel } from "../models/ProductModel";
import { ProductSort } from "../enums/ProductSort";

test.describe("Inventory Page Tests", () => {
  test("Products should be present on Inventory page", async ({
    page,
    inventoryPage,
  }) => {
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

  test("User can sort products by price (low to high)", async ({
    page,
    inventoryPage,
  }) => {
    const products: ProductModel[] = await inventoryPage.getAllProducts();

    expect(products).toHaveLength(6);

    const minPrice: number = Math.min(
      ...products.map((p) => parseFloat(p.price))
    );
    await inventoryPage.sortProducts(ProductSort.PRICE_LOW_HIGH);
    const firstItem: number = (await inventoryPage.getAllProducts()).map((p) =>
      parseFloat(p.price)
    )[0];

    await page.screenshot({ path: "screenshots/sorted.png" });

    expect(minPrice).toBe(firstItem);
  });
});
