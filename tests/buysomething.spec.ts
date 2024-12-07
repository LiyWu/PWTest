import{expect,request} from 'playwright/test';
import{test1} from './hooks';
import loginPage from '../pages/loginPage';
import homePage from '../pages/homePage';
import {chromium} from 'playwright';

let loginPageA;
let dashboardPage;

test1.describe('Test Suite 1', () => {
  /*test1.beforeAll(async ({  }) => {
    //loginPageA = new loginPage(page);
    //dashboardPage = new homePage(page);
    //await page.goto('/');
  });
*/
  test1.beforeEach(async ({ page }) => {
    loginPageA = new loginPage(page);
    dashboardPage = new homePage(page);
    const browser = await chromium.launch({
        headless:false,
        args:[
            '--no-sandbox',
            '--disable-extensions'
        ]
    });
    const context = await browser.newContext();
    page = await context.newPage();

    //await page.goto('/');
  });


test1('Open a website and check title',  async({page}) => {
    // Navigate to the website
     await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Assert the page title
    const title =  await page.title();
    console.log(`Page title: ${title}`);
    expect(title).toContain('Green');
});

test1('add two brocoli in cart',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/')

    await page.click('div.product:nth-of-type(2) a.increment');
})

/*test.afterEach(async ({ page }, testInfo) => {
    console.log("Helen after each")
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });
*/

test1('Send a POST API request', async ({ }) => {
    
// Create a new API request context
const apiContext = await request.newContext();
    // Send the POST request with JSON payload
    const response = await apiContext.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1
        },
    });

    // Verify the response status
    expect(response.status()).toBe(201);

    // Parse and log the JSON response
    const responseData = await response.json();
    console.log(responseData);

    // Validate the response data
    expect(responseData.title).toBe('foo');
    expect(responseData.body).toBe('bar');
    expect(responseData.userId).toBe(1);

    // Dispose of the API request context
    await apiContext.dispose();


});
});

test1.describe("Test Suite2",()=>{

    test1("drag and drop",async({page})=>{

        await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
        const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
        await frame.locator('li', {hasText:"High Tatras 2"}).dragTo(frame.locator('#trash'));

        //mouse
        await frame.locator('li',{hasText:"High Tatras 4"}).hover()
        await page.mouse.down()
        await frame.locator('#trash').hover()
        await page.mouse.up()


    });

    test1.only("child windows",async({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator('#username');
        let domain;
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink = page.locator("[href*='documents-request']")
       
        const [newPage] = await Promise.all([
        context.waitForEvent('page'),//listen for any new page
        documentLink.click(),]);

        page.waitForLoadState("networkidle");

        const text =await newPage.locator(".red").textContent();
        console.log(text)
        
        if(text!=null)
        {
          const arrayText = text.split("@");
          domain = arrayText[1].split(" ")[0]
          console.log("domain:" + domain);
        }

        await page.locator("#username").fill(domain);
        await page.pause();
        console.log(await page.locator("#username").textContent())


    })
    
       
   
    
});