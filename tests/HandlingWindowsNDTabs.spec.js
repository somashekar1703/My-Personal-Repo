const {test,expect} = require('@playwright/test');

test('@UITest working on windows & Tabs', async({browser})=>
{
// while working on multiple windows, we have to declare below 2 fixtures (newContext() & newPage())....
const NewContext = await browser.newContext();
const parentpage = await NewContext.newPage();
const url = "https://rahulshettyacademy.com/loginpagePractise/";
await parentpage.goto(url);
await page.evaluate(() => { document.body.style.zoom = '67%'; });
//working on blinking link and validating based on attribute value...
const lnkBlink = parentpage.locator("[href*='documents-request']");

await expect(lnkBlink).toHaveAttribute('class','blinkingText');

/*working on child windows, printing text from child window in console, copy any single word from child window
and typing in parent window in email text box. */ 

//Getting child window access...
const [childPage] = await Promise.all([

NewContext.waitForEvent('page'),
lnkBlink.click(),

])

await expect(childPage.locator(".auto-container > .inner-box h1")).toHaveText('Documents request');

const infopara = await childPage.locator("[class='im-para red']").textContent();
//extracting emailId from information para.
const EmailId = infopara.split(" ")[4];

//console.log(EmailId);

//Shifting to parent page and enter text extracted from child page.
await parentpage.locator("#username").fill(EmailId);
//await parentpage.pause();
expect(await parentpage.locator("#username").inputValue()).toContain(EmailId);

});