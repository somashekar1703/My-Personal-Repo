const {test,expect} = require('@playwright/test')
// Mail id: tester17automation@gmail.com
//password: IamTester(1603)
test.describe('Group of Interview Questions',()=>
{

    test('Navigate to Ecomm website and add product to cart',async({browser})=>
    {
        const Fcontext = await browser.newContext({storageState:'./Utils/gmail-auth.json'});
        const Parentpage = await Fcontext.newPage();
        await Parentpage.goto("https://duckduckgo.com/");
        await expect(Parentpage).toHaveTitle("DuckDuckGo - Protection. Privacy. Peace of mind.")

        await Parentpage.locator("#searchbox_input").pressSequentially("Amazon India",{delay:1000});
        await Parentpage.locator("ul li[role='option']").last().waitFor();
        await Parentpage.mouse.move(220, 450);
        //await Parentpage.pause()
        await Parentpage.getByText("Amazon").first().click();
        await Parentpage.waitForLoadState('networkidle');        
       //await Parentpage.keyboard.press('Enter');
       //await Parentpage.waitForURL("**/search?q=Amazon&*")

       await Parentpage.getByRole('link', { name: 'https://www.amazon.in', exact: true }).click();
       await Parentpage.waitForLoadState('domcontentloaded'); 
       await Parentpage.getByRole('link',{name:'Mobiles'}).click();
       await Parentpage.waitForLoadState('domcontentloaded');

       await Parentpage.getByRole('link',{name:'Smartphones & Basic Mobiles'}).click();
       await Parentpage.waitForLoadState('domcontentloaded');
       await expect(Parentpage.locator(".pageBanner b")).toHaveText("Smartphones & Basic Mobiles");
       const leftsideoptions = Parentpage.locator("ul[class*='a-vertical'] li > span")
       await leftsideoptions.locator("span:nth-child(1)").filter({hasText:'Smartphones'}).click();
       await Parentpage.waitForLoadState('domcontentloaded');
       await expect(Parentpage).toHaveTitle("Buy New Smartphones Online in India at the Best Price On Amazon.in");
       const lblSeeAllResult = Parentpage.locator(".a-cardui-body .a-size-medium")
       if(await lblSeeAllResult.isVisible())
       {
        await lblSeeAllResult.click();
        await Parentpage.waitForLoadState('domcontentloaded',{timeout:8000});
        await expect(Parentpage.locator("[class*='s-breadcrumb-header-text'] span")).toHaveText("1-24 of over 1,000 results");
       }
       const CardBox = Parentpage.locator(".s-card-container")
       const CardBoxBody = CardBox.locator(".a-spacing-small")
       const CardBodyPrice =  CardBoxBody.locator("div:nth-child(3) span[class='a-price-whole']")
       const SmartPhoneTitle = CardBoxBody.locator("[data-cy='title-recipe'] h2")
       let prices = [];
       let Counted = 0;

       const priceCount = await CardBodyPrice.count()
       for(let i=0;i< priceCount;i++)
       {
            let value = await CardBodyPrice.nth(i).textContent()
            if(value.includes(","))
            {
                let convtValue = parseInt(value.replace(/,/g,""));
                prices.push(convtValue)
            }
            else{
                prices.push(Number(value))
            }
            if(prices[i] > 10000 && prices[i] < 15000)
            {
                await CardBoxBody.nth(i).getByRole('button',{name:'Add to cart'}).click({timeout:5000});
                let PhTitle = await SmartPhoneTitle.nth(i).getAttribute('aria-label');
                console.log("Phone Title: "+PhTitle +" "+"At price "+prices[i])
                Counted++;
                
            }
       }
       prices = prices.filter(x => x > 10000 && x < 15000)
       console.log("Price List :"+prices)
       console.log("No of phones add to chart: "+Counted)
       await expect(Parentpage.locator("[id='nav-cart-count']")).toHaveText(String(Counted));
       await Parentpage.locator("[id='nav-cart-text-container']").click();

       await expect(Parentpage).toHaveTitle("Amazon.in Shopping Cart");
       await expect(Parentpage.getByRole('heading',{name:'Shopping Cart'})).toBeVisible();
       const CartItems = Parentpage.locator("div[class*='list-item-content-inner']");
       const OrderedQtyString = await Parentpage.locator("div[class='a-declarative'] span[data-a-selector='value']").allTextContents();
       let OrderedQtyNum = OrderedQtyString.map(Number)
       let SumofQty = OrderedQtyNum.reduce((acc,val) => acc+val,0)
       expect(SumofQty).toBe(Counted)
       await expect(Parentpage.getByRole('button',{name:'Proceed to Buy'})).toBeEnabled();
       const btnDelete = Parentpage.locator("input[value='Delete']")
       for(let i=await CartItems.count();i>0 ;i--)
       {
        await btnDelete.first().click();
        await expect(Parentpage.getByText(/was removed from Shopping Cart./i).first()).toBeVisible(); 
       }

       
       



    })





})