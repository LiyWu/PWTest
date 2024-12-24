import base from '@playwright/test';

export const customtest = base.extend<{ 
    testDataForOrder: { 
        username: string; 
        password: string; 
        productName: string; 
    }; 
}>({
});
// Export multiple data groups
export const testDataGroups = [
    {
        username: "rahulshetty@gmail.com",
        password: "Iamking@00",
        productName:"ADIDAS ORIGINAL"
    },
    {
        username: "sdfghwau@test.com",
        password: "Qwe123!@",
        productName:"ZARA COAT 3"
    }
];