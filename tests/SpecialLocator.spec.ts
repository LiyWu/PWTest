import {test,expect} from '@playwright/test';

test('playwright soecial locator',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
   // await page.locator("app-card").filter({hasText:"Nokie Edge"}).getByRole("button").click();
   await page.locator("#inlineRadio1").check();
    await page.getByPlaceholder("password").fill("abc123");
    await page.locator("input[type='date']").click;
   
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText("Success").isVisible();

    //await page.getByText("Shop").click();
    await page.getByRole("link",{name:"Shop"}).click();
    page.locator("app-card").filter({hasText:"iphone X"}).getByRole("button").click();
    
});

