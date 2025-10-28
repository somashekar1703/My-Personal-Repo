const { test, expect, request } = require('@playwright/test')
//request payloads...
const loginpayload = { userEmail: "MyShoppingMailId@gmail.com", userPassword: "Shiva#9922" };
const orderpayload = { orders: [{ country: "India", productOrderedId: "68a961959320a140fe1ca57e" }] };
let productId = orderpayload.orders[0].productOrderedId
let countryname = orderpayload.orders[0].country
let orderID
let logintoken


test('@APITest API testing', async () => {
    const apicontent = await request.newContext();
    const loginresponsebody = await apicontent.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginpayload,
        })
    expect(await loginresponsebody.ok()).toBeTruthy()
    const loginresponseJson = await loginresponsebody.json()
    logintoken = loginresponseJson.token;
    console.log(`login token: ${logintoken}`);

    const ordersresponsebody = await apicontent.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderpayload,
            headers:
            {
                'Authorization': logintoken,
                'content-type': "application/json"
            }
        })
    await expect(ordersresponsebody.ok()).toBeTruthy()
    const ordersresponseJson = await ordersresponsebody.json()
    console.log(`order id: ${ordersresponseJson.orders}`)
    orderID = ordersresponseJson.orders[0]
    expect(ordersresponseJson.productOrderId[0]).toBe(productId)

    //get api call..
    const orderdetailResponse = await apicontent.get("https://rahulshettyacademy.com/api/ecom/order/get-orders-details",
        {
            params:
            {
                id: orderID
            },
            headers:
            {
                'Authorization': logintoken
            }
        })
    expect(await orderdetailResponse.status()).toBe(200);
    const ActualResponseOrderDetailJson = await orderdetailResponse.json();

    let expectedResponseOrderDetails =
    {
        data: {
            _id: orderID,
            orderById: '68b5ac7bf669d6cb0aac08ae',
            orderBy: 'MyShoppingMailId@gmail.com',
            productOrderedId: productId,
            country: countryname,
            __v: 0
        },
        message: 'Orders fetched for customer Successfully'
    };
    //console.log("Get call response body", ActualResponseOrderDetailJson)
    //console.log(`Get call Response body prints using stringify: ${JSON.stringify(ActualResponseOrderDetailJson,null,2)}`);
    expect(ActualResponseOrderDetailJson).toMatchObject(expectedResponseOrderDetails);
})