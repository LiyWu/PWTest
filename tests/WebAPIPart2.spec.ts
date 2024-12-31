//LoginUI  -json
// test, cart,order,orderdetails,orderhostory
import {test} from 'playwright/test'
import testData from '../utils/placeorderTestData.json';
import POManager from '../pages/POManager';

let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const userEmail = testData[0].username;
    const userPassword = testData[0].password;
    const pomanager = new POManager(page);
    const loginPage = pomanager.getLoginPage(page);
    await loginPage.goto();
    await loginPage.login(userEmail,userPassword);
    await context.storageState({path:'state.json'});

    webContext = await browser.newContext({storageState:'state.json' })

})

test('Client App Login',async({})=>{
    const email="";
   const productName = "ADIDAS ORIGINAL";
   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client")
   const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

})