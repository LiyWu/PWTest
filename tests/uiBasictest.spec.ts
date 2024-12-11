import {expect, test} from 'playwright/test'

//const {randomNumbe1 } = require('./utils/globalmethods')
import globalmethods from './utils/globalmethods';


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
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator('#userEmail').fill("sdfghwau@test.com");
        await page.locator('#userPassword').fill("Qwe123!@");
        //await page.locator('#userEmail').fill(email);
        //await page.locator('#userPassword').fill(password);
        //await page.pause();
        await page.locator('[value="Login"]').click();

        await page.waitForLoadState('networkidle');
        expect(await page.locator(".card-body b").nth(0)).toHaveText(/Zara/i);

    })

    
})

test.describe("login, add to cart and checkout",()=>{
    const userEmail = "sdfghwau@test.com";
    test.beforeEach('login',async({page})=>{
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator('#userEmail').fill("sdfghwau@test.com");
        await page.locator('#userPassword').fill("Qwe123!@");
        await page.locator('[value="Login"]').click();

        await page.waitForLoadState('networkidle');
        expect(await page.locator(".card-body b").nth(0)).toHaveText(/Zara/i);

    })
    test.only('Add to my cart and checkout',async({page})=>{
        
        //add product to my cart
       // await page.locator('.card-body',{hasText:/ZARA/i}).locator('button.btn',{hasText:"Add To Cart"}).click();
       const product = page.locator(".card-body");
       const productName = "ZARA COAT 3";
       const count =await product.count();

       const alltext = await page.locator(".card-body b").allTextContents();
       for(let i = 0;i<count;i++)
       {
            if(await product.nth(i).locator('b').textContent()==productName)
            {
                await product.nth(i).locator("text=Add to Cart").click();
                break;
            }
                
       }

       //go to cart to check
       await page.locator('.btn-custom').locator("text=Cart").click();
       await page.locator('div li').first().waitFor();

       await expect(page.locator('.cartSection h3')).toHaveText(productName)
       expect(await page.locator("h3:has-text('ZARA COAT')").isVisible()).toBeTruthy();
       await page.locator("h3",{hasText:"ZARA COAT"}).isVisible();


       //click checkout
        await page.locator('div.subtotal button.btn-primary').click();

        //input credit card info
        await page.locator("[class*='small'] input[class*=txt]").first().fill("123");
        await page.locator("[class='field'] input[class*=txt]").last().fill("HW");

        //check email
        await expect(page.locator("[class*='details__user'] label")).toHaveText(userEmail);

        //select country
        await page.locator("[placeholder*='Country']").pressSequentially("india",{delay:100});

        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
    
        for(let i =0;i<await dropdown.locator("button").count();i++)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text?.trim()==='India')
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        //checkout
        await page.locator("a[class*='inserted']").click();

        //wait for next page
        page.locator("h1[class*='hero-primary']").waitFor();

        await expect(page.locator("h1[class*='hero-primary']")).toContainText("Thankyou for the order");

        //get order id from confirm page
        const orderid =  (await page.locator("label.ng-star-inserted").textContent()) ?? "";
        const match = orderid.match(/\|\s*(\w+)\s*\|/); // Extract the alphanumeric string between "| ... |"
        const extractedOrder = match ? match[1] : "";
        console.log(extractedOrder); 

        //go to orders page to check order id
        await page.locator("[routerlink*='orders']").first().click();
        await expect(page.locator("h1[class='ng-star-inserted']")).toHaveText("Your Orders");

        //get all orders from order detail page and choose current order
        const tr = page.locator("tr[class='ng-star-inserted']");
        const trcount = await tr.count();
        for(let i = 0; i<trcount;i++)
        {
            const trorder = (await tr.nth(i).locator("th").textContent())?? "";
            if(trorder.includes(extractedOrder))
            {
                await tr.nth(i).locator("td button[class*='btn-primary']").click();
               
                break;

            }
        }
        await page.locator(".col-md-6 .col-text").waitFor();
        const orderDetailid= (await page.locator(".col-md-6 .col-text").textContent())??"";
        console.log(orderDetailid);
         await expect(page.locator(".col-md-6 .col-text")).toContainText(extractedOrder);
         await expect(orderid?.includes(orderDetailid)).toBeTruthy();


    })
    test('jstest',()=>{
        console.log("spec:" + globalmethods.spec(3));
    })

})

