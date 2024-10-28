describe('fill the form', ()=>{
    it('Enter Data in Mandatory fields', ()=>{
        //navigate to URL
        cy.visit("https://demo.automationtesting.in/Register.html");
        //Verify Title...
        cy.viewport(1920,1080);
        cy.title().should('eq','Register');
        // Verify Header...
        cy.get(".container > div > div:nth-child(2) > h1").should('contain.text','Automation Demo Site');
        // Enter First Name...
        cy.get("input[placeholder='First Name']").type("Somashekar");
        //Enter Last Name...
        cy.get("input[placeholder='Last Name']").type("Bellala");
        //Enter Email ID
        cy.get("input[type='email']").type("somashekar@ex.com");
        //Enter Phone Number...
        cy.get("input[type='tel']").type("9524581245");
        //click male radio button...
        cy.get("input[type='radio'][value='Male']").check();
        //click on Cricket & Movies check boxes...
        cy.get("input[type='checkbox'][value='Cricket']").check();
        cy.get("input[type='checkbox'][value='Movies']").check();
        //Select Language from dropdown...
        cy.get("select[id='Skills']").select('Programming');
        cy.get("select[id='Skills']").should('have.value','Programming');
        //select country from combobox...
        cy.get(".select2-selection__arrow").click();
        cy.get("ul[id='select2-country-results']").contains('India').click();
        cy.get("#select2-country-container").should('contain.text','India');
        cy.get("#submitbtn").click();


    })

})