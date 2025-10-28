const {LoginPage}=require('../Pages/LoginPage');
const {DashboardPage} = require('../Pages/DashboardPage');
const {CartPage} = require('../Pages/CartPage');
const {PaymentPage} = require('../Pages/PaymentPage');
const {OrderConfirmationPage} = require('../Pages/OrderConfirmationPage');
const {OrderHistoryPage} = require('../Pages/OrderHistoryPage')
const {OrderSummaryPage} = require('../Pages/OrderSummaryPage')

class PagesManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.cartpagee = new CartPage(this.page);
        this.paymentpage = new PaymentPage(this.page);
        this.orderconfirmationpage = new OrderConfirmationPage(this.page);
        this.orderhistorypage = new OrderHistoryPage(this.page);
        this.ordersummarypage = new OrderSummaryPage(this.page);

    }
getLoginPage()
{
    return this.loginPage;
}
getDashboardPage()
{
    return this.dashboardpage;
}
getCartPage(PurchasingProduct)
{
    return this.cartpagee;
}
getPaymentPage()
{
    return this.paymentpage;
}
getOrderConfirmationPage()
{
    return this.orderconfirmationpage;
}
getOrderHistoryPage()
{
    return this.orderhistorypage;
}
getOrderSummaryPage()
{
    return this.ordersummarypage;
}





} module.exports={PagesManager};