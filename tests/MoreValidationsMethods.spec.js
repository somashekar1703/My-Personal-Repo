import {test,expect} from '@playwright/test';

test('@UITest More vadilations points using different methods', async({page}) =>
{

//await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.goto("https://rahulshettyacademy.com/AutomationPractice/#");
await page.goBack(); //go back to previous page
await page.goForward(); //go forward page.
await expect(page.locator("#displayed-text")).toBeVisible(); // to check atleast 1 element is visible in a page.
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden(); // to check whether hidden in page..

//working on Alert or dailog box which are actually java alerts...

await page.locator("#name").fill('Rajshekar');
//alert...
page.on('dialog', async dialog => {
        console.log(dialog.message()),
   await dialog.accept();
    });

await page.locator("#alertbtn").click();

//mouse hover...

await page.locator("#mousehover").hover();
const pageIframe = page.frameLocator("#courses-iframe");
await pageIframe.locator("[href='practice-project']:visible").click();
await pageIframe.locator(".form-group #name").fill("Somashekar");
await pageIframe.locator(".form-group #email").fill("bellalasomashekarbabu@gmail.com");
await pageIframe.locator(".form-group #form-submit").click();
await pageIframe.locator(".container").waitFor();
const practicelnk = await pageIframe.locator(".projects-item a[href*='rahulshettyacademy']").allTextContents();
console.log(practicelnk);

});