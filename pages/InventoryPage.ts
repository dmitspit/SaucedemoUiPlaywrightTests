import { Locator, Page } from "@playwright/test";

export class InventoryPage{
    private page: Page;
    
    public readonly spanProducts: Locator;

    constructor(page: Page){
        this.page = page;
        this.spanProducts= this.page.locator(".title");
    }
} 