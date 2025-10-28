const { expect } = require('@playwright/test');
class CartPage {
    constructor(page) {
        this.page = page;
        this.btnContinueShopping = page.locator("button:has-text('Continue Shopping')");
        this.btnCheckout = page.locator("button:has-text('Checkout')");
        this.btnBuynow = page.locator("button:has-text('Buy Now')");
        this.btnDelete = page.locator("button[class*='btn-danger']");
        this.ProductinCart = page.locator("ul[class*='cartWrap'] li");
    }

    async getCheckout() {
        await this.btnCheckout.click();
    }
    async DeleteProductFromCart(PurchasingProduct) {
        await this.ProductinCart.filter({ hasText: PurchasingProduct }).locator("button[class*='btn-danger']").click();
        expect(await this.ProductName.isVisible()).toBeFalsy();
    }
    getproduct(PurchasingProduct) {
        return this.page.locator(`h3:has-text("${PurchasingProduct}")`);
    }
    async ProductIsVisible(ProductName) {
        await this.ProductinCart.first().waitFor();
        const AddedFlag = await this.getproduct(ProductName).isVisible();
        expect(AddedFlag).toBeTruthy();
    }


}
module.exports = { CartPage }