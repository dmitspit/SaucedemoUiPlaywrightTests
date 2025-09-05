import { Locator } from "@playwright/test";
import { BaseProductModel } from "./BaseProductModel";

export class CartModel extends BaseProductModel {
  public quantity: Locator;
  public removeBtn: Locator;
}
