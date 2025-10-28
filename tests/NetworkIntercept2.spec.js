const {test,expect} = require('@playwright/test')

test('@UITest aborting all products after logging',async({page})=>
{

    page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const Emailid = 'MyShoppingMailId@gmail.com';
        const passwrd = 'Shiva#9922';
         page.on('request',request=>console.log(request.url()));
         page.on('response',Response=>console.log(Response.url(),Response.status()));
        await page.route('https://rahulshettyacademy.com/api/ecom/product/get-all-products', route=>route.abort());
        await page.locator("#userEmail").fill(Emailid);
        await page.locator("#userPassword").fill(passwrd);
        await page.locator("#login").click();
    
        const lblDashHeader = page.locator("[class='left mt-1']");
    
        await expect(lblDashHeader).toHaveText('AutomationAutomation Practice');
        

        await expect(page.locator("div[class='card']")).toHaveCount(0);

        await page.locator("button[routerlink='/dashboard/cart']").click();


        await expect(page.locator("//div[@class='wrap cf']//div[2]/h1")).toHaveText("No Products in Your Cart !");
        //await page.pause();

});