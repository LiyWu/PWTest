import{expect,request} from 'playwright/test';
import{test1} from './hooks';

test1('Open a website and check title',  async({page}) => {
    // Navigate to the website
     await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Assert the page title
    const title =  page.title();
    console.log(`Page title: ${title}`);
    //expect(title).toContain('Green');
});