//Mail ID: MyShoppingMailId@gmail.com & Password: Shiva#9922

const {test,expect} = require('@playwright/test')

test('@AssignmentTest - Login and get first product text(By Somashekar)',async({page}) =>
{
const url = 'https://rahulshettyacademy.com/client/#/auth/login';
await page.goto(url);
const loginText = "h1[class='login-title']";
await expect(page.locator(loginText)).toHaveText("Log in");

const tbEmailId = "#userEmail";
const tbPassword = "#userPassword";
const btnLogin = "#login";

await page.locator(tbEmailId).fill("MyShoppingMailId@gmail.com");
await page.locator(tbPassword).fill("Shiva#9922");
await page.locator(btnLogin).click();

const lblDashboardTitle = "div[class*='logo-holder']  div[class*='left mt']";

// console.log(await page.locator(lblDashboardTitle).textContent());

await expect(page.locator(lblDashboardTitle)).toHaveText("AutomationAutomation Practice");

const lblProductText="div[class='card'] div[class='card-body'] b";

console.log(await page.locator(lblProductText).first().textContent());
});

test('@AssignmentTest Login and print all products text (by Rahul sir)', async({page})=>
{
const url = 'https://rahulshettyacademy.com/client/#/auth/login';
await page.goto(url);
const loginText = "h1[class='login-title']";
await expect(page.locator(loginText)).toHaveText("Log in");

const tbEmailId = "#userEmail";
const tbPassword = "#userPassword";
const btnLogin = "#login";

await page.locator(tbEmailId).fill("MyShoppingMailId@gmail.com");
await page.locator(tbPassword).fill("Shiva#9922");
await page.locator(btnLogin).click();

//We use wait mechanuism by using waitForLoadState based on network Idle State, DOM loaded & normal.
//await page.waitForLoadState('networkidle');

//In some cases, above wait mechanuism will not work.Instead we use, waitFor() which will work on single web element.
await page.locator("div[class='card'] div[class='card-body'] b").first().waitFor();

const lblAllProductText= await page.locator("div[class='card'] div[class='card-body'] b").allTextContents();

console.log(lblAllProductText);
});

