import {test,expect} from 'playwright/test'

test('popup validation',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    //await page.goto("http://google.com");
    //await page.goBack();
    //await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator("#displayed-text")).toBeHidden();
   // page.on("dialog",dialog=>dialog.accept())
    page.on("dialog",dialog=>dialog.dismiss());
    await page.locator("#confirmbtn").click();
   
    //how to hover
    await page.locator("#mousehover").hover();
    
})
