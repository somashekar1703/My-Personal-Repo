const {expect}=require('@playwright/test')
class LoginPage
{
    constructor(page)
    {
        this.page=page;
        this.tbUserEmail = page.locator("#userEmail");
        this.tbPassword = page.locator("#userPassword");
        this.btnLogin = page.locator("#login");
        this.lblDashboardtext = page.locator("[class='left mt-1']");
    }
    async GotoURL(URL)
    {
        await this.page.goto(URL)
    }
    async GetLogin(EmailId,Password,DashboardTxt)
    {
        await this.tbUserEmail.fill(EmailId);
        await this.tbPassword.fill(Password);
        await this.btnLogin.click();
        await expect(this.lblDashboardtext).toHaveText(DashboardTxt);
    }

}
module.exports={LoginPage};