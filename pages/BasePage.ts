import { Page } from "@playwright/test";

export class BasePage {
  protected readonly page;

  constructor(page: Page) {
    this.page = page;
  }
}
