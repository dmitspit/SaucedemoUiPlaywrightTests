import { Locator } from "@playwright/test";

export class ProductModel{
    public name: string;
    public description: string;
    public price: string;
    public addToCartButton: Locator;
    public image: Locator;
    public addToCartBtn: Locator
}