import{test,expect} from 'playwright/test'

test('Open a website and check title', async ({page}) => {
    // Navigate to the website
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Assert the page title
    const title = await page.title();
    console.log(`Page title: ${title}`);
    expect(title).toContain('Green');
});

test('add two brocoli in cart',async({page})=>{
    await page.click('div.product:nth-of-type(1) a.increment');
})
