const { test, expect } = require('@playwright/test');
const { ExcelUtils } = require('../Utils/ExcelUtils');
const path = require('path');

test('@UITest Basic UI Testing with test data using excel file', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.evaluate(() => { document.body.style.zoom = '67%'; });
    const FilePath = path.resolve(__dirname, '../Testdata/UITestdata.xlsx');

    const Excel = new ExcelUtils(FilePath, 'LoginPage');
    const username = await Excel.readValuefromExlUsingTcId('Testcase001', 2, 3)
    const password = await Excel.readValuefromExlUsingTcId('Testcase001', 3, 3)
    const Dashboardtext = await Excel.readValuefromExlUsingTcId('Testcase001', 4, 3)

    console.log(`${Dashboardtext},${username},${password}`);
    await page.locator("#userEmail").fill(username);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();

    const lblDashHeader = page.locator("[class='left mt-1']");
    await expect(lblDashHeader).toHaveText(Dashboardtext);

    for (let i = 7; i <= 17; ++i) {
        let isEntered = await Excel.writedataintoExcel(i, 2, 'Testcase002');
        if (isEntered) {
            console.log(`Yes, Data has entered at row...`)
        }
    }
});

