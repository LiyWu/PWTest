import {expect, test} from 'playwright/test'
//const {randomNumbe1 } = require('./utils/globalmethods')
import globalmethods from '../utils/globalmethods';
import POManager from '../pages/POManager';
import testData from '../utils/placeorderTestData.json';
import { customtest,testDataGroups } from '../utils/test-base';

for(const data of testDataGroups)
{
    customtest.describe("login, add to cart and checkout",()=>{
    customtest.use({testDataForOrder: data});
    
    customtest.beforeEach('login',async({testDataForOrder,page})=>{
        const userEmail = testDataForOrder.username;
        const userPassword = testDataForOrder.password;
        const pomanager = new POManager(page);
        const loginPage = pomanager.getLoginPage(page);
        await loginPage.goto();
        await loginPage.login(userEmail,userPassword);
    });
    customtest(`@Web Add to my cart and checkout ${data.username}`,async({testDataForOrder,page})=>{
        
        //add product to my cart
       // await page.locator('.card-body',{hasText:/ZARA/i}).locator('button.btn',{hasText:"Add To Cart"}).click();
       const product = page.locator(".card-body");
       const productName = testDataForOrder.productName;

       const pomanager = new POManager(page);
       const dashboardPage = pomanager.getDashBoardPage(page);
       await dashboardPage.searchProduct(productName);
       await dashboardPage.navigateToCart();

       //go to cart to check
       const cartPage = pomanager.getCartPage(page);
       cartPage.verifyProductIsDisplayed(productName);
       
       //click checkout
       cartPage.checkout();

       const orderReviewPage = await pomanager.getOrderReviewPage(page);
       await orderReviewPage.searchCountryAndSelect("india","India");

        const extractedOrder = await orderReviewPage.submitAndGetOrderId();

       await dashboardPage.navigateToOrders();

        const orderHistoryPage = await pomanager.getOrderDetailPage(page);

        await orderHistoryPage.searchOrderAndSelect(extractedOrder);
        const orderDetailid= await orderHistoryPage.getOrderId();
        console.log(orderDetailid);
         //await expect(page.locator(".col-md-6 .col-text")).toContainText(extractedOrder);
         await expect(extractedOrder?.includes(orderDetailid)).toBeTruthy();


    });
})
}

customtest('jstest',()=>{
    console.log("spec:" + globalmethods.spec(3));
})

test.describe.configure({ mode: 'serial' });

test.describe('register and login',()=>{

    const firstname = "autotest";
    const lastname = globalmethods.randomCharacter(5);
    const email = globalmethods.randomCharacter(5)+"@test.com";
    const password = "Qwe123!@";

    test("register",async({page})=>{
        //random generate firstname, user mobile and password
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator(".text-reset:has-text('Register here')").click();
        await page.locator("#firstName").fill(firstname);
        await page.locator('#lastName').fill(lastname);
        await page.locator('#userEmail').fill(email);
        await page.locator('#userMobile').fill(globalmethods.randomNumber(10));
        await page.locator('.custom-select').selectOption("1: Doctor");
        await page.locator("[type='radio'][value='Male']").click();

        await expect(page.locator("[type='radio'][value='Male']")).toBeChecked();
        await expect(page.locator("[type='radio'][value='Male']").isChecked).toBeTruthy();

        await expect(page.locator("[type='radio']").first()).toHaveAttribute("value","Male");

        await page.locator("#userPassword").fill(password);
        await page.locator("#confirmPassword").fill(password);
        await page.locator("[type='checkbox']").check();
        await page.locator("input#login").click();

        await page.waitForLoadState('networkidle');

        await page.locator("div.login-wrapper h1").waitFor();
       // await page.locator(".btn-primary").click();
        //const text = await page.locator("div.login-wrapper h1").textContent();

       // expect(text).toBe("Account Created Successfully");
       expect(await page.locator("div.login-wrapper h1")).toHaveText("Account Created Successfully");

        await page.locator(".btn-primary").click();
    })

    test('login in',async({page})=>{
        const pomanager = new POManager(page);
        const loginPage = pomanager.getLoginPage(page);
        loginPage.goto();
        loginPage.login("sdfghwau@test.com","Qwe123!@");
        await page.waitForLoadState('networkidle');
        expect(await page.locator(".card-body b").nth(0)).toHaveText(/Zara/i);
    })

    
})



test.describe("ui practice",()=>{
test("Browser PlayWright Test",async({browser})=>{
    //chrome - plug/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
})

test("Page PlayWright Test",async({page})=>{
    await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
    const title = await page.title();
    expect(page).toHaveTitle(title);
    expect(title).toContain("Drag And Drop");
})

test("login fail test",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning1");
    await page.locator("#terms").click();
    //await page.locator('#signInBtn').click();
    await page.locator('[value="Login"]]').click();

    const text = await page.locator("[style*='block']").textContent()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(text).toContain('Incorrect');
})

test("login pass test",async({page})=>{
    const username= page.locator("#username");
    const cardtitle = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("#terms").click();
    await page.locator('#signInBtn').click();
    console.log("title: " + await page.title());
    
    console.log(await cardtitle.nth(0).textContent());
    console.log(await cardtitle.first().textContent());
    console.log("selectText:" + await cardtitle.nth(0).selectText());
    console.log("title: " + await page.title());
    expect(await page.title()).toContain('ProtoCommerce');
    
    const allTitles = await cardtitle.allTextContents();
    console.log(allTitles);
    console.log(allTitles[0]);

    for(const title of allTitles)
    {
        console.log(title);

    }
})
})

