const {test, expect} = require('@playwright/test');

test('@UITest Test 001',async({browser})=>
{
    //To inject or add plugins or cookies for new instance or page.
const context = await browser.newContext();
const page = await browser.newPage();
await page.goto('https://practicetestautomation.com/practice-test-login/');
});

test('@UITest Test 002', async({page})=>
{
await page.goto('https://demo.applitools.com/');
console.log(page.title());
});
// if we want to run only single test from more than 5 tests, we can use 'only' keyword.
test('@UITest Test 003', async({page})=>
{
await page.goto('https://www.saucedemo.com/');
console.log(await page.title()); // to print title in console
await expect(page).toHaveTitle("Swag Labs"); // assertion to verify title

//Locating web element, enter text, and clicking the button...
await page.locator('#user-name').fill("standard_user");
await page.locator('#password').fill("secret_sauce");
await page.locator('#login-button').click();
await expect(page.locator('.app_logo')).toHaveText("Swag Labs");
});

test('@UITest Test 004', async({page})=>
{
await page.goto('https://practicetestautomation.com/practice-test-login/');
console.log(await page.title()); // to print title in console
await expect(page).toHaveTitle("Test Login | Practice Test Automation"); // assertion to verify title

//Locating web element, enter text, and clicking the button...
await page.locator("[id='username']").fill("student");
await page.locator("[id='password']").fill("Password124");
await page.locator("[id='submit']").click();
console.log(await page.locator("[id='error']").textContent()); // To extract  text from the mentioned locator
await expect(page.locator("[id='error']")).toContainText('is invalid!'); // doing assertion to check whether invalid is present.
});

test('@UITest Test 005', async({page})=>
{
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 console.log(await page.title());
 await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

 //Positive testcase: Login Functionality

 const username=page.locator("#username");
 await username.fill('rahulshettyacademy');
 const password=page.locator("#password");
 await password.fill('learning');
await page.locator("#signInBtn").click();
 await expect(page.locator(".container > [class='navbar-brand']")).toHaveText('ProtoCommerce Home');

// To get single/first/indexbased/last content text, we use below functions like first(),nth(index) & last() .textcontent();
// console.log(await page.locator("[class='card-body'] h4 a").first().textContent());
// console.log(await page.locator("[class='card-body'] h4 a").nth(1).textContent());
// console.log(await page.locator("[class='card-body'] h4 a").nth(2).textContent());
// console.log(await page.locator("[class='card-body'] h4 a").last().textContent());

// TO print all contents text value, we use below function as .allTextcontents();
const allText = await page.locator("[class='card-body'] h4 a").allTextContents();

console.log(allText);



});