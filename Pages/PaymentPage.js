const { expect } = require('@playwright/test')
class PaymentPage {
    
    constructor(page) {
        this.page = page;
        this.tbCreditcard = page.locator(".form__cc [class='input txt text-validated']")
        this.tbCVVCode = page.locator("[class='form__cc'] [class='input txt']").first()
        this.ddExpiryDate = page.locator(".form__cc .ddl")
        this.NameonCard = page.locator("[class='form__cc'] [class='input txt']").last()
        this.btnPlaceOrder = page.locator("a[class*='action__submit']")
        this.lblEmailId = page.locator(".user__name label")
        this.tbSelectCountry = page.locator("input[placeholder='Select Country']")
        this.liOfSelectCountry = page.locator("[class*='ta-results list-group'] span")
        this.lblProductName = page.locator(".item__details .item__title")
        this.txtEmailID = page.locator(".user__name input").first()
        this.tbCountry = page.locator(".user__name input").last()
        this.listOfcountries = page.locator("[class*='ta-results list-group'] span")
    }

    async VerifylblEmailId(emailid) {
        if (!emailid) throw new Error("VerifylblEmailId(): Email ID txt is missing....")

        await expect(this.lblEmailId).toHaveText(emailid);
    }
    async VerifyShippingEmailId(txtEmailED) {
        if (!txtEmailED) throw new Error("VerifyShippingEmailId() : Expected EmailID is missing....")

        await expect(this.txtEmailID).toHaveValue(txtEmailED);
    }
    async VerifyProduct(productname) {
        if (!productname) throw new Error("VerifyProduct() : product Name is missing....")
        
        await expect(this.lblProductName).toHaveText(productname);
    }
    async FillCreditCardDetails(CCNumber, ExpiryMonth, ExpiryDate, CVVcode, NameonCard) {
        if (!CCNumber) throw new Error("FillCreditCardDetails(): Credit Card number is missing....")
        if (!ExpiryMonth) throw new Error("FillCreditCardDetails(): Expiry Month number is missing....")
        if (!ExpiryDate) throw new Error("FillCreditCardDetails(): Expiry Date number is missing....")
        if (!CVVcode) throw new Error("FillCreditCardDetails(): CVV number is missing....")
        if (!NameonCard) throw new Error("FillCreditCardDetails(): Name on card is missing....")

        await this.tbCreditcard.fill(CCNumber)
        await this.ddExpiryDate.first().selectOption(ExpiryMonth);
        await this.ddExpiryDate.last().selectOption(ExpiryDate);
        await this.tbCVVCode.fill(CVVcode);
        await this.NameonCard.fill(NameonCard);
    }
    async ShippingInfo_SelectCountry(countryPartialTxt, delayTime = 200, countryFulltxt) {
        if (!countryPartialTxt) throw new Error("ShippingInfo_SelectCountry() : Partial txt of country is missing")
        if (!countryFulltxt) throw new Error("ShippingInfo_SelectCountry() : Expected txt of country is missing")
        
        await this.tbCountry.pressSequentially(countryPartialTxt, { delay: delayTime });
        await this.listOfcountries.last().waitFor();
        const countryList = await this.listOfcountries.count();

        for (let i = 0; i < countryList; ++i) {

            if (await this.listOfcountries.nth(i).textContent() === countryFulltxt) {
                await this.listOfcountries.nth(i).click();
                return true;
            }
        }
        console.warn("Expected country is not selected or else country is not present in list. Check and provide correct name");
        return false;
    }
    async clickPlaceOrder()
    {
        await this.btnPlaceOrder.click();
    }











}
module.exports = { PaymentPage };