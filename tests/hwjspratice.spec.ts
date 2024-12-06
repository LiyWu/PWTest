import{test} from 'playwright/test';

test("js test",async()=>{
    let color=['red','yellow','blue']
    console.log("color1:" + color[1]);
    color.forEach(element => {
        console.log(element)
    });

    let student={
        firstName:"Helen",
        2:"Typescipt"
    }

    console.log(student.firstName);
    Object.keys(student).forEach(element => {
        console.log(element)
    });
})

test('add two brocoli in cart',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/')

    await page.click('div.product:nth-of-type(2) a.increment');
})