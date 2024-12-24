import{Page,expect} from '@playwright/test'
class CartPage{
    private page:Page;
    private checkoutBtn;
    private productSection;
    constructor(page)
    {
        this.page = page;
        this.productSection = page.locator('.cartSection h3');
        this.checkoutBtn = page.locator('div.subtotal button.btn-primary');
    }

    async verifyProductIsDisplayed(productName)
    {
        await this.page.locator('div li').first().waitFor();
       await expect(this.productSection).toHaveText(productName);
       expect(await this.getproductLocator(productName).isVisible()).toBeTruthy();
      // await this.page.locator("h3",{hasText:"ZARA COAT"}).isVisible();
      await this.page.locator("h3",{hasText:productName}).isVisible();
    }

    getproductLocator(productName){
        return this.page.locator("h3:has-text('"+productName+"')");
    }
    async checkout()
    {
        await this.checkoutBtn.click();
    }
}

export default CartPage;