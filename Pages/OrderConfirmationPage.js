const { expect } = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.lblConfimationMessage = page.locator("[class='hero-primary']")
        this.lblProductName = page.locator("[class*='product-info-column m-3'] [style*='bottom: 5px;']")
        this.lnkOrdersHistoryPage = page.locator("label[routerlink*='/myorders']")
        this.btnDownloadOrderDetailsinCSV = page.locator("button:has-text('Click To Download Order Details in CSV')")
        this.OrderID = page.locator("[class='em-spacer-1'] label[class*='inserted']")
    }
    async VerifyConfirmationMessage(Message) {
        if (!Message) throw new Error("Message is empty or missing...")
        const lblMessage = await this.lblConfimationMessage.textContent();

        expect(lblMessage?.trim()).toBe(Message)
    }
    async VerifyProduct(ProductName) {
        if (!ProductName) throw new Error("Product Name is empty or missing...")
        await expect(this.lblProductName).toHaveText(ProductName);
    }
    async clickOrderHistoryPage() {
        await this.lnkOrdersHistoryPage.click();
    }
    async DownloadCSVFile() {
        const downloadpromise = this.page.waitForEvent('download');
        await this.btnDownloadOrderDetailsinCSV.click();
        const download = await downloadpromise;
        const path = await download.path()
        const filepath = 'C:/Users/hp/Downloads/' + download.suggestedFilename();
        console.log("file downloaded path : " + filepath);
        await new Promise(r => setTimeout(r, 2000));
        await download.saveAs(filepath)

        return filepath
    }
    async getOrderID() {
        const rawOrderId = await this.OrderID.textContent();
        const orderID = await rawOrderId.split("|")[1]?.trim();
        return orderID
    }

} module.exports = { OrderConfirmationPage };