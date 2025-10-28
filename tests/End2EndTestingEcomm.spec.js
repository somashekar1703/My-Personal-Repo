const { test, expect } = require('@playwright/test');


test('@UITest End 2 End testing in Ecommerce website', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.evaluate(()=>
    {
        document.body.style.zoom='67%';
    });
    const Emailid = 'MyShoppingMailId@gmail.com';
    const passwrd = 'Shiva#9922';

    await page.locator("#userEmail").fill(Emailid);
    await page.locator("#userPassword").fill(passwrd);
    await page.locator("#login").click();

    const lblDashHeader = page.locator("[class='left mt-1']");

    await expect(lblDashHeader).toHaveText('AutomationAutomation Practice');

    const productCardBody = page.locator(".card-body");
    await productCardBody.first().waitFor();

    const productCBCount = await productCardBody.count();
    const productName = 'ADIDAS ORIGINAL';

    for (let i = 0; i < productCBCount; ++i) {
        if (await productCardBody.nth(i).locator('b').textContent() === productName) {
            await productCardBody.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await expect(page.locator("[routerlink*='cart'] label")).toHaveText("1");

    await page.locator("[routerlink*='cart'] label").click();

    await page.locator(".cartWrap .items").first().waitFor();

    const Isproductadded = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();

    expect(Isproductadded).toBeTruthy();

    await page.locator("button:has-text('Checkout')").click();

    expect(await page.locator("div:has-text(' ADIDAS ORIGINAL ')").isVisible).toBeTruthy();

    await page.locator(".form__cc [class='input txt text-validated']").fill("4542 9931 9292 2148");

    await page.locator(".form__cc .ddl").first().selectOption('12');

    await page.locator(".form__cc .ddl").last().selectOption('31');

    await page.locator("[class='form__cc'] [class='input txt']").first().fill('456');

    await page.locator("[class='form__cc'] [class='input txt']").last().fill('Rajshekar');

    expect(page.locator(".user__name label")).toHaveText(Emailid);

    await page.locator("[placeholder='Select Country']").pressSequentially('Ind', { delay: 200 });
    //await page.pause();
    await page.locator("[class*='ta-results list-group'] span").nth(0).waitFor();
    const countryList = await page.locator("[class*='ta-results list-group'] span").count();

    for (let i = 0; i < countryList; ++i) {
        //await page.locator("[class*='ta-results list-group'] span").nth(i).waitFor();
        if (await page.locator("[class*='ta-results list-group'] span").nth(i).textContent() === ' India') {
            await page.locator("[class*='ta-results list-group'] span").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();

    await expect(page.locator("[class='hero-primary']")).toHaveText(' Thankyou for the order. ');

    await expect(page.locator("[class*='product-info-column m-3'] [style*='bottom: 5px;']")).toHaveText(productName);

    const orderId = await page.locator("[class='em-spacer-1'] label[class*='inserted']").textContent();
    
    console.log(orderId);

    await page.locator("label[routerlink*='/myorders']").click();

    await expect(page.locator(".container h1")).toHaveText("Your Orders");

    //await page.pause();
    const OrderTablebody = page.locator("[class*='table-bordered'] tbody");

    const TbRow = await OrderTablebody.locator("tr");

    for (let i = 0; i < await TbRow.count(); ++i) {
        const OrderIdInTable = await TbRow.nth(i).locator("th").textContent();

        if (orderId.includes(OrderIdInTable)) {
            await TbRow.nth(i).locator("button[class*='btn-primary']").click();
            break;
        }
    }

    const orderIdInOrderSummary = await page.locator("div[class='col-text -main']").textContent();

    await expect(orderId.includes(orderIdInOrderSummary)).toBeTruthy();

    const prodtNameinOrdersummary = await page.locator("[class='artwork-card-info'] .title").textContent();

    expect(productName.includes(prodtNameinOrdersummary.trim())).toBeTruthy();

});