import exp from 'constants';
import {Page} from 'playwright/test'

class OrderHistoryPage{
    private page;
    private ordersTable;
    constructor(page)
    {
        this.page = page;
        this.ordersTable = page.locator("tr[class='ng-star-inserted']");
    }
    async searchOrderAndSelect(orderID)
    {
        //get all orders from order detail page and choose current order
                const tr = this.ordersTable;
                const trcount = await tr.count();
                for(let i = 0; i<trcount;i++)
                {
                    const trorder = (await tr.nth(i).locator("th").textContent())?? "";
                    if(trorder.includes(orderID))
                    {
                        await tr.nth(i).locator("td button[class*='btn-primary']").click();
                        break;
        
                    }
                }
                await this.page.locator(".col-md-6 .col-text").waitFor();
    }

    async getOrderId()
    {
        return (await this.page.locator(".col-md-6 .col-text").textContent())??"";
    }
}

export default OrderHistoryPage;