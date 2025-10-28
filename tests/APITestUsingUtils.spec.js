const {test,expect,request} = require('@playwright/test')
const {APIUtils}= require('../Utils/APIUtilHepler')
const testdata = require('../Testdata/API012025');

let responseobject={};
responseobject.country=testdata.orderpayload.orders[0].country
responseobject.prodOrderId = testdata.orderpayload.orders[0].productOrderedId
responseobject.UserEMailID = testdata.loginpayload.userEmail


test('@APITest APITC-API012025:Create an order',async()=>
{
    const APIContext = await request.newContext();
    const APIObj01 = new APIUtils(APIContext)

    console.log("****** Step-1: GetAccessToken - Executing *******");

    const loginresponsebody = await APIObj01.Postcall('https://rahulshettyacademy.com/api/ecom/auth/login',testdata.loginpayload);
    expect(loginresponsebody.status).toBe(200);
    expect(loginresponsebody.body.token).toBeTruthy();
    responseobject.token = loginresponsebody.body.token;
    expect(loginresponsebody.body.message).toBe('Login Successfully');
    
   
    console.log("****** Step-1 Captured Token - Executed Successfully *******");



    console.log("****** Step-2: Create an Order - Executing*******");
    const headers = 
    {
        'Authorization':responseobject.token,
        'content-type':"application/json"
    }
    const orderrespond =  await APIObj01.Postcall('https://rahulshettyacademy.com/api/ecom/order/create-order',testdata.orderpayload,headers)

    expect(orderrespond.status).toBe(201);
    expect(orderrespond.body.orders[0]).toBeTruthy()
    responseobject.OrderID = orderrespond.body.orders[0];

    delete orderrespond.body.orders;
    expect(orderrespond.body).toEqual(testdata.expectedCreateOrderResponse)
    console.log("****** Step-2: Order is Created - Executed Successfully *******");
    
    console.log("****** Step-3: Get OrderID Details - Executing*******");
    const QueryParams = 
    {
        id:responseobject.OrderID
    }
    const { Authorization } = headers;
    const orderDetailResponse = await APIObj01.Getcall('https://rahulshettyacademy.com/api/ecom/order/get-orders-details',QueryParams,{ Authorization });

    expect(orderDetailResponse.status).toBe(200);
    expect(orderDetailResponse.body).toBeTruthy();

    const orderDetResp = orderDetailResponse.body
    testdata.expectedOrderDetails.data._id = responseobject.OrderID
    delete orderDetResp.data.orderById;
    delete orderDetResp.data.productImage;
    expect(orderDetResp).toEqual(testdata.expectedOrderDetails);
    
    console.log("****** Step-3: Get OrderID Details - Executed Successfully*******");




console.log(responseobject)
});