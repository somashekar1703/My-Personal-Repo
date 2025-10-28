const { expect } = require('@playwright/test')
class OrderSummaryPage {

    constructor(page) {
        this.page = page;
        this.lblOrderSummary = page.locator("div[class='email-title']")
        this.lblOrderId = page.locator("div[class='col-text -main']")
        this.productname = page.locator("div[class='artwork-card-info'] .title")
        this.btnViewOrder = page.locator("button:has-text('View Orders')")
        this.lblBillingMailAddress = page.locator("div[class='address'] > p").first()
        this.lblDeliveryMailAddress = page.locator("div[class='address'] > p").nth(2)
    }

    async getOrderId() {
        return await this.lblOrderId.textContent();
    }
    async VerifyOrderId(orderID) {
        const ActualOrderId = await this.getOrderId()
        expect(orderID).toBe(ActualOrderId)
        console.info("Order ID is matching....")
    }
    async VerifyOrderedProduct(ExpectedproductName)
    {
        const actualProductName = await this.productname.textContent();
        expect(actualProductName?.trim()).toBe(ExpectedproductName)
        console.info("Ordered Product is matching....")
    }
    async VerifyMailAddresses(BillingAddress,DeliveryAddress)
    {
        const ActualbillingAddress = await this.lblBillingMailAddress.textContent();
        expect(ActualbillingAddress?.trim()).toBe(BillingAddress);
        console.info("Billing Mail Address is matching....")
        const ActualDeliverAddress = await this.lblDeliveryMailAddress.textContent();
        expect(ActualDeliverAddress?.trim()).toBe(DeliveryAddress)
        console.info("Deliver Mail Address is matching....")
    }


} module.exports = { OrderSummaryPage };