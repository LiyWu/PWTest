import {test,expect,request,Response} from 'playwright/test'
import APIUtils from '../utils/APIUtils'
import HelenTest from './HelenTest';

const loginPayload = {userEmail:"sdfghwau@test.com",userPassword:"Qwe123!@"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};
let token;
let orderID;
let responseOrder;

test.beforeAll(async()=>{
   const apiContext =  await request.newContext();
   const apiutils = new APIUtils(apiContext,loginPayload);

   //responseOrder = await apiutils.createOrder(orderPayload);
   console.log(responseOrder)
})
test('@API Client App login',async({page})=>{

   //put token in localstorage
   page.addInitScript(value=>{
      window.localStorage.setItem('token',value);
   },responseOrder.token)

   /*// Define the token and its properties
    const cookie = {
      name: 'Authorization',         // Name of the cookie
        value: responseOrder.token,         // Token value
        domain: 'rahulshettyacademy.com/',     // Domain for which the cookie is valid
        path: '/',                 // Path for which the cookie is valid
        //httpOnly: true,            // Optional: Prevent JavaScript access
        secure: true,              // Optional: Allow only over HTTPS
    };

    // Add the cookie to the browser context
    await page.context().addCookies([cookie]);*/

   const email="";
   const productName = "ADIDAS ORIGINAL";
   await page.goto("https://rahulshettyacademy.com/client/");

   
   /*const products = page.locator(".card-body");
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);*/

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for(let i =0;i<await rows.count(); ++i)
   {
      const rowsOrderId = await rows.nth(i).locator("th").textContent();
      if(responseOrder.orderId.includes(rowsOrderId))
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   //await page.pause();

   expect(responseOrder.orderId.includes(orderIdDetails)).toBeTruthy();
});

test.only("helentest",async({page})=>{


   const helenTest = new HelenTest();
   helenTest.testJson();
});