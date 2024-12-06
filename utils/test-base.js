const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder:{
        username: "helen",
        password: "test",
        productName:"zara coat"
    }
})