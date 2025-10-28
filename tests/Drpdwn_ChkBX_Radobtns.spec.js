const {test, expect} = require('@playwright/test');

test('@UITest Working on dropdown,radio buttons,checkbox',async({page}) =>
{
const url = 'https://rahulshettyacademy.com/loginpagePractise/';
await page.goto(url);

//working on drop downs...
const drpdwn = "select.form-control";

await page.locator(drpdwn).selectOption("consult");

//playwright inspectator window will be opened if we mention pause() function
//await page.pause();

//working on radio buttons...

await page.locator("span.radiotextsty").nth(1).click();

await page.locator("#okayBtn").click();

//In order to verify based on boolean value, we use Truthy() and Falsy() functions...  
expect(await page.locator("span.radiotextsty").nth(1).isChecked()).toBeTruthy();

await expect(page.locator("span.radiotextsty").nth(1)).toBeChecked();

//working on check boxes....

await page.locator("#terms").click();

await expect(page.locator("#terms")).toBeChecked();

expect(await page.locator("#terms").isChecked()).toBeTruthy();

await page.locator("#terms").uncheck();

expect(await page.locator("#terms").isChecked()).toBeFalsy();








});