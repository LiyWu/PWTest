import {expect} from 'playwright/test'

class APIUtils{
    private apiContext;
    private loginPayload;

constructor(apiContext,loginPayload){

    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
}

async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
             data:this.loginPayload
            });
            //expect((await loginResponse).ok()).toBeTruthy();
            
            const responseJson = await loginResponse.json();
            let token = responseJson.token;
            console.log(token)
            return token;
    }

async createOrder(orderPayload)
    {
        let response = {"token":{},"orderId":{}};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
              data:orderPayload,
              headers:{
                 'Authorization': response.token,
                 'Content-Type': 'application/json'
              },
           })
        
           const orderResponseJson = await orderResponse.json();
           console.log(orderResponseJson);
           //console.log(JSON.stringify(orderResponseJson));
          
           let orderID =  orderResponseJson.orders[0]
           console.log(`orderID: ${orderID}`);
           response.orderId = orderID;
           return response;
    }
}

export default APIUtils;