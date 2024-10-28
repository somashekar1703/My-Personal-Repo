const {expect,test} = require('@playwright/test')

test('Test Login Functionality with Postive Inputs', async({page}) =>{
    //Maximize the window...
    await page.setViewportSize
    ({
        width: 1920, height: 1080
    });
    
    // goto below page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //  verify page title...
    await expect(page).toHaveTitle(/OrangeHRM/);
    // verify Login header in the page...
    expect(await page.textContent("h5[class='oxd-text oxd-text--h5 orangehrm-login-title']")).toBe("Login");
    // enter use-name....
    await page.fill("input[name='username']",'Admin');
    //enter password...
    await page.fill("input[name='password']",'admin123');
    //click on Login button....
    await page.click("//button[@type='submit']");
    //verify Dashboard header...
    const headerTitle= await page.locator("//span[contains(@class,'header-breadcrumb')]/h6");
    await expect(headerTitle).toBeVisible();
    await expect(headerTitle).toHaveText("Dashboard");
    //close the browser...
    page.close();
});
test('Test Login Functionality with Negative Inputs', async({page}) =>{
    // goto below page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //  verify page title...
    await expect(page).toHaveTitle(/OrangeHRM/);
    // verify Login header in the page...
    expect(await page.textContent("h5[class='oxd-text oxd-text--h5 orangehrm-login-title']")).toBe("Login");
    // enter use-name....
    await page.fill("input[name='username']",'Username');
    //enter password...
    await page.fill("input[name='password']",'Password');
    //click on Login button....
    await page.click("//button[@type='submit']");
    // verify alert icon and text are displayed in the login page...
    const alerticon = page.locator("//i[contains(@class,'oxd-alert-content-icon')]");
    await expect(alerticon).toBeVisible();
    const alertText = page.locator("//p[contains(@class,'oxd-alert-content-text')]");
    await expect(alertText).toHaveText("Invalid credentials");
    //close the browser...
    page.close();
});
test('Test Login Functionality with No Inputs', async({page}) =>{
    // goto below page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //  verify page title...
    await expect(page).toHaveTitle(/OrangeHRM/);
    // verify Login header in the page...
    expect(await page.textContent("h5[class='oxd-text oxd-text--h5 orangehrm-login-title']")).toBe("Login");
    // enter use-name....
    await page.fill("input[name='username']",'');
    //enter password...
    await page.fill("input[name='password']",'');
    //click on Login button....
    await page.click("//button[@type='submit']");
    // Verify 'required' error message are displayed for 2 text boxes.
    // UserName Error Message...
    const usernameError = await page.locator("(//div[@class='oxd-form-row']/div/span)[1]");
    await expect(usernameError).toHaveText("Required");
    //Password Error Message...
    const PasswordError = await page.locator("(//div[@class='oxd-form-row']/div/span)[2]");
    await expect(usernameError).toHaveText("Required");
    //close the browser...
    page.close();
});