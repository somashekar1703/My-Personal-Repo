import { test, expect } from '@playwright/test';

test('@UITest End 2 end testing using GetBy Locators', async ({ page }) => {
    page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const Emailid = 'MyShoppingMailId@gmail.com';
    const passwrd = 'Shiva#9922';
    await page.evaluate(() => {
        document.body.style.zoom = '67%';
    });

    await page.getByPlaceholder("email@example.com").fill(Emailid);
    await page.getByPlaceholder("enter your passsword").fill(passwrd);
    await page.getByRole("button", { name: "Login" }).click();

    await page.locator("[class='left mt-1']").waitFor();

    //const lblDashHeader = page.locator("[class='left mt-1']").textContent();

    expect(await page.getByText("Automation Practice").isVisible()).toBeTruthy();

    const productCardBody = page.locator(".card-body");
    await productCardBody.first().waitFor();

    const productName = 'iphone 13 pro';

    await productCardBody.filter({ hasText: productName }).getByRole("button", { name: 'Add To Cart' }).click();

    expect(await page.locator(`div:has-text("${productName}")`).isVisible()).toBeFalsy();

    await expect(page.locator("[routerlink*='cart'] label")).toHaveText("1");

    await page.getByRole("listitem").getByRole("button", { name: 'Cart' }).click();

    await page.locator(".cartWrap .items div.infoWrap").first().waitFor();

    expect(await page.getByText(productName).isVisible()).toBeTruthy();

    await page.getByRole("button", { name: 'Checkout' }).click();

    expect(await page.getByText("Personal Information").isVisible()).toBeTruthy();

    await page.locator(".form__cc [class='input txt text-validated']").fill("4542 9931 9292 2148");

    await page.locator(".form__cc .ddl").first().selectOption('12');

    await page.locator(".form__cc .ddl").last().selectOption('31');

    await page.locator("[class='form__cc'] [class='input txt']").first().fill('456');

    await page.locator("[class='form__cc'] [class='input txt']").last().fill('Rajshekar');

    expect(page.locator(".user__name label")).toHaveText(Emailid);

    //expect(page.locator(".user__name label")))

    await page.getByPlaceholder("Select Country").pressSequentially("Russ", { delay: 200 });

    await page.locator("[class*='ta-results list-group'] span").last().waitFor();

    await page.getByText("Russian Federation").click();

    await page.getByText("PLACE ORDER").click();

    await page.getByText("Thankyou for the order.").waitFor();

    expect(await page.getByText("Thankyou for the order.").isVisible()).toBeTruthy();

    expect(await page.getByText(productName).isVisible()).toBeTruthy();

    const orderId = await page.locator("[class='em-spacer-1'] label[class*='inserted']").textContent();

    //console.log(orderId);
    const OrderIdVal = orderId.split("|")[1]?.trim();

    console.log(OrderIdVal);

    await page.getByText("Orders History Page").click();

    await page.locator("tbody").waitFor();

    expect(await page.getByText("Your Orders").isVisible()).toBeTruthy();

    await page.locator(".table-bordered tbody tr").filter({ hasText: OrderIdVal }).getByRole("button", { name: 'View' }).click();

    const orderIdInOrderSummary = await page.locator("div[class='col-text -main']").textContent();

    expect(OrderIdVal.includes(orderIdInOrderSummary)).toBeTruthy();

    const prodtNameinOrdersummary = await page.locator("[class='artwork-card-info'] .title").textContent();

    expect(productName.includes(prodtNameinOrdersummary.trim())).toBeTruthy();
});