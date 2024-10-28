
describe('Navigate to Page and verify', () => {
  it('goto QA Automation Engineer Job in Carrer', () => {
    //Navigate to URL
    cy.visit("https://www.ghx.com/about/careers/#all-jobs");
    //Verify Page Title
    cy.title().should('eq', 'GHX Careers | GHX');
    cy.viewport(1920, 1080);
    //Click on Button.
    cy.scrollTo('0%', '0%'); 
    cy.wait(2500);
    cy.get("a[title='View all positions']").click();
    //Tap on India tab...
    cy.wait(2500);
    cy.get("#nav-india-tab").should('contain.text', 'India').click();
    //click on Product Development button.
    cy.contains("Product Development").click();
    // Click on QA Automation Engineer...
    cy.get("#india_pnl_4014980005 > div > div > div").contains("QA Automation Engineer").click();
    //Click on Apply button
    cy.get("button[data-bs-jobtitle='QA Automation Engineer']").contains("Apply").click();
    // verify dailog is displayed or not...
    cy.get("div[id='greenModal'] > div[class='modal-dialog modal-dialog-centered modal-xl']").should('be.visible');
    //verify close icon is displayed or not....
    cy.get("div[class='modal fade show'] > div button[aria-label='Close']").should('be.visible');
    //click on close icon...
    cy.wait(2500);
    cy.get("div[class='modal fade show'] > div button[aria-label='Close']").click();
    cy.wait(2500);
    //verify dailog box is closed or not...
    cy.get("div[id='greenModal'] > div[class='modal-dialog modal-dialog-centered modal-xl']").should('not.be.visible');
    //Click on Apply button
    cy.get("button[data-bs-jobtitle='QA Automation Engineer']").contains("Apply").click();
    // verify dailog is displayed or not...
    cy.get("div[id='greenModal'] > div[class='modal-dialog modal-dialog-centered modal-xl']").should('be.visible');
    // click on apply button...
    cy.wait(2500)
    cy.get("iframe[id='jobFrame']")
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .find("a[id='apply_button']")
      .contains('button')
      .click();
      
    //close the dailog box
    cy.get("div[class='modal fade show'] > div button[aria-label='Close']").click();
    cy.log("end of testing");
  })
})
