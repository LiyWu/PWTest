import { Page,expect } from '@playwright/test';

class LoginPage {
  private page: Page;
  private usernameInput: string;
  private passwordInput: string;
  private loginButton: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = '#userEmail';
    this.passwordInput = '#userPassword';
    this.loginButton = '[value="Login"]';
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
    //expect(await this. page.locator(".card-body b").nth(0)).toHaveText(/Zara/i);
  }

  async goto()
  {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
}

export default LoginPage;