import { Locator, Page } from "@playwright/test";
import { ProductModel } from "../models/ProductModel";
import { ProductSort } from "../enums/ProductSort";
import { CartPage } from "../pages/CartPage";
import { BasePage } from "../pages/BasePage";

export class InventoryPage extends BasePage {
  private readonly sortDropdown: Locator;
  private readonly shoppingCartIcon: Locator;

  public readonly shoppingbadge: Locator;
  public readonly spanProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.spanProducts = this.page.locator(".title");
    this.sortDropdown = page.locator("select.product_sort_container");
    this.shoppingCartIcon = page.locator(".shopping_cart_link");
    this.shoppingbadge = page.locator(".shopping_cart_badge");
  }

  async getAllProducts(): Promise<ProductModel[]> {
    const productElements = this.page.locator(".inventory_item");
    const count = await productElements.count();
    const products: ProductModel[] = [];

    for (let i = 0; i < count; i++) {
      const product = new ProductModel();
      const item = productElements.nth(i);

      product.name = await item.locator(".inventory_item_name").innerText();
      product.description = await item
        .locator(".inventory_item_desc")
        .innerText();
      product.price = (
        await item.locator(".inventory_item_price").innerText()
      ).replace("$", "");
      product.image = item.locator("img");
      product.addToCartBtn = await item.getByRole("button", {
        name: "Add to cart",
      });

      products.push(product);
    }

    return products;
  }

  async sortProducts(sortOption: ProductSort) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async goToCartPage(): Promise<CartPage> {
    await this.shoppingCartIcon.click();
    return new CartPage(this.page);
  }
}
