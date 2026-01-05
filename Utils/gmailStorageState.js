const { chromium } = require('playwright')
require('dotenv').config({path:'../.env'});
(async()=>
{
const emailId = process.env.GMAIL_USER;
const pwd = process.env.GMAIL_PASS;

console.log("Email ID: "+emailId+" "+"Password: "+pwd);

const browser = await chromium.launch({headless:false});
const context = await browser.newContext()
const page = await context.newPage();

await page.goto("https://accounts.google.com/signin");

//enter Gmail ID:
await page.locator("#identifierId").fill(emailId,{timeout:2000});
await page.getByRole('button',{name:"Next"}).click();
await page.locator("div[class='IxcUte']").waitFor();

//enter password:
await page.getByLabel('Enter your password').fill(pwd,{timeout:3000});
await page.getByRole('button',{name:"Next"}).click();
await page.waitForLoadState('networkidle')

//save session
await context.storageState({path:'gmail-auth.json'})
await browser.close();




})()