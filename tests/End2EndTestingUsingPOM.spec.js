const { test, expect } = require('@playwright/test');
const { PagesManager } = require('../Pages/PagesManager')
const testdatajson = require('../Testdata/UITestdata.json');
const ParameterTestdata = JSON.parse(JSON.stringify(require('../Testdata/ParameterizationTestdata.json')))

test('@UITest @POMPattern End 2 End testing in Ecommerce website using POM', async ({ page }) => {
    const TestURL = testdatajson.TestURL;
    const Emailid = testdatajson.Emailid;
    const passwrd = testdatajson.passwrd;
    const productName = testdatajson.productName;
    const CCNumber = testdatajson.CreditCardNumber;
    const ExpiryMonth = testdatajson.ExpiryMonth;
    const ExpiryDate = testdatajson.ExpiryDate;
    const Cvvcode = testdatajson.CVVCode;
    const NameonCard = testdatajson.NameonCard;
    const shippingEmailId = testdatajson.ShippingEmailID;
    const partalCountyname = testdatajson.PartialCountryName;
    const fullCountryName = testdatajson.FullCountryName;
    const delay = testdatajson.delayTime;
    const ConfirmationMessage = testdatajson.Message;


    const PgManager = new PagesManager(page);

    //Login Page
    const LoginPage = PgManager.getLoginPage();
    await LoginPage.GotoURL(TestURL);
    await page.evaluate(() => { document.body.style.zoom = '67%'; });
    await LoginPage.GetLogin(Emailid, passwrd, "AutomationAutomation Practice");

    //Dashboard Page
    const DashboardPage = PgManager.getDashboardPage();
    await DashboardPage.AddProductToCart(productName);
    await DashboardPage.GotoCartSection();

    //Cart Page
    const CartPage = PgManager.getCartPage();
    await CartPage.ProductIsVisible(productName);
    await CartPage.getCheckout();
    expect(await page.getByText("Personal Information").isVisible()).toBeTruthy();

    //Payment Page
    const PymtPage = PgManager.getPaymentPage();
    await PymtPage.VerifyProduct(productName);
    await PymtPage.FillCreditCardDetails(CCNumber, ExpiryMonth, ExpiryDate, Cvvcode, NameonCard);
    await PymtPage.ShippingInfo_SelectCountry(partalCountyname, delay, fullCountryName);
    await PymtPage.VerifyShippingEmailId(shippingEmailId);
    await PymtPage.clickPlaceOrder();

    //Order Confirmation Page
    const orderconfirmationPage = PgManager.getOrderConfirmationPage();
    await orderconfirmationPage.VerifyConfirmationMessage(ConfirmationMessage);
    await orderconfirmationPage.VerifyProduct(productName);
    const OrderId = await orderconfirmationPage.getOrderID()
    console.info(`Order Id: ${OrderId}`);
    await orderconfirmationPage.clickOrderHistoryPage();

    //Order History Page
    const orderhistorypage = PgManager.getOrderHistoryPage()
    await orderhistorypage.VerifyOrderinTable(OrderId);
    await orderhistorypage.ViewOrderDetails(OrderId);

    //Order Summary Page
    const ordersummary = PgManager.getOrderSummaryPage()
    await ordersummary.VerifyOrderId(OrderId);
    await ordersummary.VerifyOrderedProduct(productName)
    await ordersummary.VerifyMailAddresses(Emailid, shippingEmailId)

    await DashboardPage.SignOut()


});

test.describe("Using Parameterization Test data and POM pattern", () => {
    for (const testdata of ParameterTestdata) {
        test(`@UITest @POMPattern E2E testing by login with emailId:  ${testdata.Emailid}`, async ({ page }) => {
            const TestURL = testdata.TestURL;
            const Emailid = testdata.Emailid;
            const passwrd = testdata.passwrd;
            const productName = testdata.productName;
            const CCNumber = testdata.CreditCardNumber;
            const ExpiryMonth = testdata.ExpiryMonth;
            const ExpiryDate = testdata.ExpiryDate;
            const Cvvcode = testdata.CVVCode;
            const NameonCard = testdata.NameonCard;
            const shippingEmailId = testdata.ShippingEmailID;
            const partalCountyname = testdata.PartialCountryName;
            const fullCountryName = testdata.FullCountryName;
            const delay = testdata.delayTime;
            const ConfirmationMessage = testdata.Message;


            const PgManager = new PagesManager(page);

            //Login Page
            const LoginPage = PgManager.getLoginPage();
            await LoginPage.GotoURL(TestURL);
            await page.evaluate(() => { document.body.style.zoom = '67%'; });
            await LoginPage.GetLogin(Emailid, passwrd, "AutomationAutomation Practice");

            //Dashboard Page
            const DashboardPage = PgManager.getDashboardPage();
            await DashboardPage.AddProductToCart(productName);
            await DashboardPage.GotoCartSection();

            //Cart Page
            const CartPage = PgManager.getCartPage();
            await CartPage.ProductIsVisible(productName);
            await CartPage.getCheckout();
            expect(await page.getByText("Personal Information").isVisible()).toBeTruthy();

            //Payment Page
            const PymtPage = PgManager.getPaymentPage();
            await PymtPage.VerifyProduct(productName);
            await PymtPage.FillCreditCardDetails(CCNumber, ExpiryMonth, ExpiryDate, Cvvcode, NameonCard);
            await PymtPage.ShippingInfo_SelectCountry(partalCountyname, delay, fullCountryName);
            await PymtPage.VerifyShippingEmailId(shippingEmailId);
            await PymtPage.clickPlaceOrder();

            //Order Confirmation Page
            const orderconfirmationPage = PgManager.getOrderConfirmationPage();
            await orderconfirmationPage.VerifyConfirmationMessage(ConfirmationMessage);
            await orderconfirmationPage.VerifyProduct(productName);
            const OrderId = await orderconfirmationPage.getOrderID()
            console.info(`Order Id: ${OrderId}`);
            await orderconfirmationPage.clickOrderHistoryPage();

            //Order History Page
            const orderhistorypage = PgManager.getOrderHistoryPage()
            await orderhistorypage.VerifyOrderinTable(OrderId);
            await orderhistorypage.ViewOrderDetails(OrderId);

            //Order Summary Page
            const ordersummary = PgManager.getOrderSummaryPage()
            await ordersummary.VerifyOrderId(OrderId);
            await ordersummary.VerifyOrderedProduct(productName)
            await ordersummary.VerifyMailAddresses(Emailid, shippingEmailId)

            await DashboardPage.SignOut()

        });

    }

})