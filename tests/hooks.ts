import { test as baseTest } from '@playwright/test';

// Extend base test with global hooks
const test1 = baseTest.extend({
  // Before All Tests (e.g., setup database or API)
  beforeAll: async ({page}, use) => {
    console.log("Helen1");
    test1.info().annotations.push({
        type:"Start",
        description: new Date().toISOString(),
    });
    await use(page);

    console.log("Helen2");
    test1.info().annotations.push({
        type:"End",
        description: new Date().toISOString(),
    });
    //console.log('Helen Global Before All: Setting up resources...');
     // No need to call use() if you're not passing any value
    //await use(); // Proceed with tests
    //It's generally used for global setup like initializing test data, starting a server, or setting up other resources
  },

  // Before Each Test (e.g., log test start)
  beforeEach: async ({ page }, use) => {
    console.log(`Helen Test started: ${page.url()}`);
    await use(page); // Proceed with test
  },

  // After Each Test
  afterEach: async ({}, ) => {
    console.log('Helen Test completed.');
     // No need to call use() if you're not passing any value
    //await use();
    
  },

  // Before All Tests (e.g., setup database or API)
  afterAll: async ({}, use) => {
    console.log('Helen Global After All: Tear up resources...');
     // No need to call use() if you're not passing any value
    //await use(); // Proceed with tests
  },
});



export { test1 };