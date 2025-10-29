const { test, expect } = require('@playwright/test');
import path from "path";

test.skip('@VisualTest Screenshot capturing full and partial', async ({ page }) => {
    page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const Emailid = 'MyShoppingMailId@gmail.com';
    const passwrd = 'Shiva#9922';


    await page.locator("#userEmail").fill(Emailid);
    await page.locator("#userPassword").fill(passwrd);
    await page.locator("#login").click();

    const lblDashHeader = page.locator("[class='left mt-1']");

    await expect(lblDashHeader).toHaveText('AutomationAutomation Practice');
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:-]/g, "");
    const screenshotpath = path.join(__dirname, `../Screenshots/DashboardPage-${timestamp}.png`)
    await page.screenshot({ path: screenshotpath, fullPage: true }); // Full page  Screenshot...
    const IPhone13PROScreenshot = path.join(__dirname, `../Screenshots/Iphone13PRO-${timestamp}.png`)
    await page.locator("div[class='card']").last().screenshot({ path: IPhone13PROScreenshot }) //partial Screenshot...
});

test.skip('@VisualTest visual testing using playwright', async ({ page }) => {



    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const Emailid = 'MyShoppingMailId@gmail.com';
    const passwrd = 'Shiva#9922';
    expect(await page.screenshot()).toMatchSnapshot("LoginPage.png");


    await page.locator("#userEmail").fill(Emailid);
    await page.locator("#userPassword").fill(passwrd);
    await page.locator("#login").click();

    const lblDashHeader = page.locator("[class='left mt-1']");

    await expect(lblDashHeader).toHaveText('AutomationAutomation Practice');

    expect(await page.screenshot()).toMatchSnapshot("DashboardPage.png");

});