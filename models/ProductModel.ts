import { Locator } from "@playwright/test";
import { BaseProductModel } from "./BaseProductModel";

export class ProductModel extends BaseProductModel {
  public image: Locator;
  public addToCartBtn: Locator;
}
