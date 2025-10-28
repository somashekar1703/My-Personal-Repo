module.exports = 
{

    loginpayload :{
        userEmail:"MyShoppingMailId@gmail.com",
        userPassword:"Shiva#9922"
    },

    orderpayload: 
    {
        orders:[
        {country:"India",
        productOrderedId:"68a961959320a140fe1ca57e"
        }]
    },

    expectedCreateOrderResponse : 
    {
        productOrderId: [ '68a961959320a140fe1ca57e' ],
        message: 'Order Placed Successfully'
    },

    expectedOrderDetails: 
    {
  data: {
    _id: '',
    orderBy: 'MyShoppingMailId@gmail.com',
    productOrderedId: '68a961959320a140fe1ca57e',
    productName: 'iphone 13 pro',
    country: 'India',
    productDescription: 'Apple phone',
    orderPrice: '55000',
    __v: 0
    },
    message: 'Orders fetched for customer Successfully'
    }







}