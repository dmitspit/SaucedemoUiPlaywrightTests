import {Locator, Page} from "@playwright/test"
import { InventoryPage } from "./InventoryPage";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page){
        super(page);
        this.userNameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    } 

    public async goToLoginPage(): Promise<void>{
        await this.page.goto('/');
        await this.loginButton.waitFor({ state: 'visible' });
    }

    public async logIn(userName: string, password: string): Promise<InventoryPage>{
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        
        return new InventoryPage(this.page);
    }
}