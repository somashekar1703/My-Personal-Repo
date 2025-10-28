const { LoginPage } = require("./LoginPage");
const {expect} = require('@playwright/test');

class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.productCardBody = page.locator(".card-body");
        this.AddCartValue = page.locator("[routerlink*='cart'] label");
        this.AddCartLabel = page.locator("button[routerlink*='/dashboard/cart']");
        this.CartBox = page.locator("div[class='cart']");
        this.signout = page.locator("button:has-text(' Sign Out ')")

    }
    async AddProductToCart(Productname)
    {
        await this.productCardBody.first().waitFor();
        
            const productCBCount = await this.productCardBody.count();
            const productName = Productname
        
            for (let i = 0; i < productCBCount; ++i) {
                if (await this.productCardBody.nth(i).locator('b').textContent() === productName) {
                    await this.productCardBody.nth(i).locator('text= Add To Cart').click();
                    break;
                }
            }
            await expect(this.AddCartValue).toHaveText("1");
    }
    async GotoCartSection()
    {
    await this.AddCartLabel.click();
    await this.CartBox.waitFor();
    }
    async SignOut()
    {
        await this.signout.click()
        const loginpage = new LoginPage(this.page)
        expect(await loginpage.btnLogin.isVisible).toBeTruthy()
    }

}
module.exports={DashboardPage};