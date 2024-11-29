import { Page } from '@playwright/test';

class loginPage {
  private page: Page;
  private usernameInput: string;
  private passwordInput: string;
  private loginButton: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}

export default loginPage;