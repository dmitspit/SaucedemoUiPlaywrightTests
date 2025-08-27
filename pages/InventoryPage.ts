import { Locator, Page } from "@playwright/test";
import { ProductModel } from "../models/ProductModel";

export class InventoryPage{
    private page: Page;
    
    public readonly spanProducts: Locator;

    constructor(page: Page){
        this.page = page;
        this.spanProducts= this.page.locator(".title");
    }

      async getAllProducts(): Promise<ProductModel[]> {
        const productElements = this.page.locator('.inventory_item');
        const count = await productElements.count();

        const products: ProductModel[] = [];

        for (let i = 0; i < count; i++) {
        const product = new ProductModel();
        
        const item = productElements.nth(i);
        product.name = await item.locator('.inventory_item_name').innerText();
        product.description = await item.locator('.inventory_item_desc').innerText();
        product.price = (await item.locator('.inventory_item_price').innerText()).replace("$", "");
        product.image = item.locator('img');
        product.addToCartBtn = await item.getByRole('button', { name: 'Add to cart' });

        products.push(product);
        }

        return products;
  }
} 