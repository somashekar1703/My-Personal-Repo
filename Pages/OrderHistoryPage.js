
class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.tablebody = page.locator("[class*='table-bordered'] tbody")
        this.lblPagePrimaryheader = page.locator(".container h1")
        this.OrderIdtablerow = page.locator("[class*='table-bordered'] tbody tr")
        this.lblOrderSummary = page.locator("div[class='email-title']")
        this.lblSuccesspop = page.locator("div[class*='toast-success']")
    }

    async VerifyOrderinTable(ExpectedOrderId) {
        if(!ExpectedOrderId) throw new Error("Expected Order ID is missing or empty...")

        await this.tablebody.waitFor();
        const orderIdCounts = await this.tablebody.locator("th").count()

        for (let i = 0; i < orderIdCounts; ++i) {
            const actualOrderId = await this.tablebody.locator("th").nth(i).textContent();
            if (actualOrderId == ExpectedOrderId)
                return true;
        }
        console.warn("Order Id not found in order history page....")
        return false

    }

    async ViewOrderDetails(orderid) {
        if(!orderid) throw new Error("Order ID is missing or empty...")

        await this.OrderIdtablerow.filter({ hasText: orderid }).locator("button:has-text('View')").click();
        await this.lblOrderSummary.waitFor();

    }

    async DeleteOrder(orderid) {
        if(!orderid) throw new Error("Order ID is missing or empty...")

        await this.OrderIdtablerow.filter({ hasText: orderid }).locator("button:has-text('Delete')").click();
       await this.lblSuccesspop.waitFor();
       const isfound = await this.VerifyOrderinTable(orderid)

       if(!isfound)
        console.info(`DeleteOrder(): OrderId=${orderid} Deleted Successfully.....`)
       else
        throw new Error("Order Id is not deleted. Please check once again....")
    }

}module.exports={OrderHistoryPage}