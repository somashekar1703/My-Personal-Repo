import {test,expect} from '@playwright/test';

test('@UITest Handling dynamic selection and assertion on calendra',async({page})=>
{
page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
const date="17";
const month="3";
const year="1999";
const ExpectedDate = [month,date,year];
await page.locator("[class='react-date-picker__inputGroup']").click(); // click on calendra field.
await page.locator("[class='react-calendar__navigation__label']").click() //click on month display field.
await page.locator("[class='react-calendar__navigation__label']").click(); // click on year display field.

//await page.locator("//button[text()='"+year+"']").click(); //clicking respective year.
//await page.pause();
while(true)
{
    if(await page.locator(`//button[text()=${year}]`).isVisible())
    {
        await page.locator(`//button[text()=${year}]`).click();
        break;
    }
    const firstyearval = await page.locator(".react-calendar__decade-view__years__year").first().textContent();
    if(Number(firstyearval)<Number(year)) //2021<2041
    {
        await page.locator(".react-calendar__navigation__next-button").click();
    }
    else
    {
        await page.locator(".react-calendar__navigation__prev-button").click();
    }
}



const montharray = page.locator("[class*='calendar__year-view__months__month']"); //storing all month names in array.
await montharray.nth(Number(month)-1).click(); // clicking respective month using nth() and (n-1).

await page.locator("//button[not(contains(@class,'neighboringMonth'))]/abbr[text()='"+date+"']").click();

const SelectedDate = page.locator("[class*='react-date-picker__inputGroup__input']");

const actualDTVal=[];

for(let i=0; i< await SelectedDate.count(); ++i)
{
    const values =  await SelectedDate.nth(i).getAttribute('value');
   actualDTVal.push(values?.trim());
   console.log(`Input ${i}: ${values}`);
}
expect(actualDTVal).toEqual(ExpectedDate);



});