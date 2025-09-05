import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartModel } from "../models/CartModel";

export class CartPage extends BasePage {
  private checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
  }

  async getCartList(): Promise<CartModel[]> {
    let cartItems = await this.page.locator(".cart_item");
    const count = await cartItems.count();
    const products: CartModel[] = [];

    for (let i = 0; i < count; i++) {
      const product = new CartModel();
      const item = cartItems.nth(i);
      product.name = await item.locator(".inventory_item_name").innerText();
      product.description = await item
        .locator(".inventory_item_desc")
        .innerText();
      product.price = (
        await item.locator(".inventory_item_price").innerText()
      ).replace("$", "");
      product.quantity = await item.locator(".cart_quantity");
      product.removeBtn = await item.getByRole("button", { name: "Remove" });
      products.push(product);
    }

    return products;
  }
}
