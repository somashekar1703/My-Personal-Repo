const { test, expect } = require('@playwright/test');
//gmail ID: mahaganesh88@gmail.com pwd= Iamganesh008
test('@UITest Network Intercepting which used to do security testing', async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const Emailid = 'MyShoppingMailId@gmail.com';
    const passwrd = 'Shiva#9922';

    await page.locator("#userEmail").fill(Emailid);
    await page.locator("#userPassword").fill(passwrd);
    await page.locator("#login").click();

    const lblDashHeader = page.locator("[class='left mt-1']");

    await expect(lblDashHeader).toHaveText('AutomationAutomation Practice');

    await page.locator("button[routerlink*='/myorders']").click();

    await expect(page.locator(".container h1")).toHaveText("Your Orders");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68cad643f669d6cb0ad44cf3' })
    );

    await page.locator("button:has-text('View')").first().click();

    expect(page.locator("p[class='blink_me']")).toHaveText("You are not authorize to view this order")


    //•	Certified Associate in Software Testing (CAST) from Mind ‘Q’ Systems, April 2022.





});