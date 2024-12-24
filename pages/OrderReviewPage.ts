import {Page,expect} from '@playwright/test'

class OrderReviewPage{
    private page;
    private cardnumber;
    private cardName;
    private country;

    constructor(page){
        this.page = page;
        this.cardnumber = page.locator("[class*='small'] input[class*=txt]");
        this.cardName = page.locator("[class='field'] input[class*=txt]");
        this.country = page.locator("[placeholder*='Country']");

    }
    async searchCountryAndSelect(searchWord,country)
    {
        //input credit card info
                await this.cardnumber.first().fill("123");
                await this.cardName.last().fill("HW");
        
                //check email
                //await expect(page.locator("[class*='details__user'] label")).toHaveText(userEmail);
        
                //select country
                await this.country.pressSequentially(searchWord,{delay:100});
        
                const dropdown = this.page.locator(".ta-results");
                await dropdown.waitFor();
            
                for(let i =0;i<await dropdown.locator("button").count();i++)
                {
                    const text = await dropdown.locator("button").nth(i).textContent();
                    if(text?.trim()===country)
                    {
                        await dropdown.locator("button").nth(i).click();
                        break;
                    }
                }
    }

    async submitAndGetOrderId()
    {
        //checkout 
                await this.page.locator("a[class*='inserted']").click();
        
                //wait for next page
                this.page.locator("h1[class*='hero-primary']").waitFor();
        
                await expect(this.page.locator("h1[class*='hero-primary']")).toContainText("Thankyou for the order");
        
                //get order id from confirm page
                const orderid =  (await this.page.locator("label.ng-star-inserted").textContent()) ?? "";
                const match = orderid.match(/\|\s*(\w+)\s*\|/); // Extract the alphanumeric string between "| ... |"
                const extractedOrder = match ? match[1] : "";
                console.log(extractedOrder); 
                return extractedOrder;
    }
}

export default OrderReviewPage;