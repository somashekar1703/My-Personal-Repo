const {test,expect} = require('@playwright/test');
const exp = require('constants');

test('Verify Add and Delete user functionality' ,async({page}) =>{
       //Maximize the window...
        await page.setViewportSize
    ({
        width: 1945, height: 1095,
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
        //verify header...
        const headerTitle= await page.locator("//span[contains(@class,'header-breadcrumb')]");
        await expect(headerTitle).toBeVisible();
        await expect(headerTitle).toHaveText("Dashboard");
        // Click on Admin menu Item..
        await page.click("//a[contains(@href,'admin/viewAdminModule')]");
        //verify header...
        await expect(headerTitle).toBeVisible();
        await expect(headerTitle).toHaveText("AdminUser Management");
        //click on Add button...
        await page.click("//i[contains(@class,'oxd-icon bi-plus')]");
        //verify header....
        await expect(headerTitle).toHaveText("Admin");
        await page.waitForSelector(".orangehrm-card-container");
        // Select User Role...
        await page.click("(//div[@class='oxd-select-wrapper']/div/div[2])[1]");
        const usertype = page.locator("//div[@role='listbox']");
        await expect(usertype).toBeVisible();
        await page.click("(//div[@role='option'])[3]");

        // Enter Employee Name...
        await page.fill("//input[@placeholder='Type for hints...']",'Rahul  Das');
        await page.waitForTimeout(1500);
        await page.click("//input[@placeholder='Type for hints...']");
        await page.waitForTimeout(1500);
        await page.waitForSelector("//div[@role='listbox']");
        const EmployeeName = page.locator("//div[@role='listbox']");
        await expect(EmployeeName).toBeVisible();
        await page.click("(//div[@role='option'])[1]");

        //Select Status type....
        await page.click("(//div[@class='oxd-select-wrapper']/div/div[2])[2]");
        const StatusType = page.locator("//div[@role='listbox']");
        await expect(StatusType).toBeVisible();
        await page.click("(//div[@role='option'])[2]");

        //Enter username...
        await page.waitForSelector("(//input[@class='oxd-input oxd-input--active'])[2]");
        await page.fill("(//input[@class='oxd-input oxd-input--active'])[2]",'Somashekar');

        //Enter Password...
        await page.waitForTimeout(1500);
        await page.waitForSelector("(//input[@type='password'])[1]");
        await page.fill("(//input[@type='password'])[1]",'Ghx@500081');

        //Enter confirmation password...
        await page.waitForSelector("(//input[@type='password'])[2]");
        await page.fill("(//input[@type='password'])[2]",'Ghx@500081');

        //Click on Save Button....
        await page.click("//button[@type='submit']");

        //Verify Success title and its message...
        //To verify status....
        await page.waitForSelector("//p[contains(@class,'oxd-text--toast-title')]");
        const status = await page.locator("//p[contains(@class,'oxd-text--toast-title')]");
        expect(status).toBeVisible();
        expect(status).toHaveText("Success");
        //To verify status message....
        await page.waitForSelector("//p[contains(@class,'oxd-text--toast-message')]");
        const statusmessage = await page.locator("//p[contains(@class,'oxd-text--toast-message')]"); 
        expect(statusmessage).toBeVisible();
        expect(statusmessage).toHaveText("Successfully Saved");

        //Verify header title...
        const searchIcon = await page.locator("form.oxd-form > div.oxd-form-actions > button:nth-child(2)");
        expect(searchIcon).toBeVisible();
        expect(searchIcon).toHaveText(" Search ");
        await expect(headerTitle).toBeVisible();
        await expect(headerTitle).toHaveText("AdminUser Management");

        //Delete Functionality....
        // Enter Username....
        await page.fill("//div[@class='oxd-form-row']/div/div/div//input[contains(@class,'oxd-input--active')]",'Somashekar');
        //Click on Search button...
        await page.click("form.oxd-form > div.oxd-form-actions > button:nth-child(2)");
        //verify No. of Records...
        await page.waitForSelector("//div[contains(@class,'orangehrm-vertical-padding')]//span");
        const records = await page.locator("//div[contains(@class,'orangehrm-vertical-padding')]//span");
        expect(records).toHaveText("(1) Record Found");
        await page.waitForTimeout(1500)
        //verify first row and first column in the table....
        const firstcell = await page.locator("(//div[contains(@class,'oxd-table-cell')]//div)[3]");
       await expect(firstcell).toHaveText("Somashekar");

        //click on Delete button in the cell...
        await page.click("(//div[contains(@class,'oxd-table-cell')]//div//button)[1]");

        //verify alert popup and do necessary action....
        await expect(page.locator("//div[@role='document']")).toBeVisible();
        await expect(page.locator("//p[contains(@class,'oxd-text--card-title')]")).toHaveText("Are you Sure?");
        await expect(page.locator("//p[contains(@class,'oxd-text--card-body')]"))
        .toHaveText("The selected record will be permanently deleted. Are you sure you want to continue?");
        //Click on Yes button....
        await page.click("//button[contains(@class,'oxd-button--label-danger')]");

        //Verify confirmation status....
        await page.waitForSelector("//p[contains(@class,'oxd-text--toast-title')]");
       await expect(status).toBeVisible();
       await expect(status).toHaveText("Success");
        //To verify status message....
        await  expect(statusmessage).toBeVisible();
        await expect(statusmessage).toHaveText("Successfully Deleted");

        //verify No Records Found message...
        await page.waitForSelector("//div[contains(@class,'orangehrm-vertical-padding')]//span");
        await expect(records).toHaveText("No Records Found");

        //Logout from the application....
        await page.click("//i[contains(@class,'oxd-userdropdown-icon')]");
        await expect(page.locator("//li/a[contains(text(), 'Logout')]")).toBeVisible();
        await page.click("//li/a[contains(text(), 'Logout')]");

});