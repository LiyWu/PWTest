import { Page,expect } from '@playwright/test';

class DashBoardPage{
    
    private page:Page;
    private products;
    private addToCart;
    private cart;
    private productsText;
    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        
        this.cart = page.locator('.btn-custom').locator("text=Cart");
       
    }
    async searchProduct(productName)
    {
        
       // await this.page.waitForLoadState('networkidle');
         /*const alltext = await this.productsText.allTextContents();
         const count =await this.products.count();
               for(let i = 0;i<count;i++)
               {
                    if(await this.products.nth(i).locator('b').textContent()==productName)
                    {
                        await this.products.nth(i).locator("text=Add to Cart").click();
                        break;
                    }
                        
               }*/
            //this.addToCart = this.page.locator('.card-body',{hasText:/ZARA COAT 3/i}).locator('button.btn',{hasText:"Add To Cart"});
            this.addToCart = this.page.locator('.card-body',{hasText: new RegExp(productName, 'i')}).locator('button.btn',{hasText:"Add To Cart"});
              await this.addToCart.click();
    }

    async navigateToCart(){
        await this.cart.click();
    }

    async navigateToOrders(){
         //go to orders page to check order id
         await this.page.locator("[routerlink*='orders']").first().click();
         await expect(this.page.locator("h1[class='ng-star-inserted']")).toHaveText("Your Orders");
    }
}

export default DashBoardPage;