import { Page } from '@playwright/test';

class homePage {
    private page: Page;
  private welcomeMessage: string;

    constructor(page) {
      this.page = page;
      this.welcomeMessage = 'h1.welcome';
    }
  
    async getWelcomeMessage() {
      return this.page.textContent(this.welcomeMessage);
    }
  }
  
  export default homePage;