describe("Authentication Tests", () => {
   it("should show signup errors messages", () => {
      cy.visit("/signup");
      cy.get('form[data-testid="signup-form"]').should("be.visible").scrollIntoView();
      cy.wait(2000);
      cy.get('[data-testid="signup-button"]').should("be.visible").click();
      cy.wait(1000);
      cy.get('form[data-testid="signup-form"]').scrollIntoView();
      cy.url().should("eq", Cypress.config().baseUrl + "/signup");
      cy.get('[data-testid="error"]').should("be.visible");
   });

   it("should create an account", () => {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      cy.visit("/signup");
      cy.get('input[name="fname"]').type("Test");
      cy.get('input[name="lname"]').type(`User ${randomDigits}`);
      cy.get('input[name="email"]').type(`testuser${randomDigits}@shobai.com`);
      cy.get('input[name="password"]').type("EasyPass@123");
      cy.get('input[name="confirmPassword"]').type("EasyPass@123");
      cy.get('[data-testid="signup-button"]').should("be.visible").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.wait(1000);
      cy.get('[data-testid="user-menu"]').should("be.visible").click();
      cy.get('[data-testid="usermenu-username"]')
         .should("be.visible")
         .contains(`Test User ${randomDigits}`);
   });

   it("should login as an user", () => {
      cy.login("user");
   });

   it("should login as an merchant", () => {
      cy.login("merchant");
   });

   it("should login as an admin", () => {
      cy.login("admin");
   });
});
