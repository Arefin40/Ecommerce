import "cypress-file-upload";

describe("Merchant Feature", () => {
   beforeEach(() => cy.login("merchant"));

   it("should add a product to the inventory", () => {
      cy.visit("/manage-inventory");
      cy.get('[data-testid="add-product-button"]').click();
      cy.url().should("include", "/products/create");

      // fill in the product form
      cy.get('input[name="name"]').type("Test Product");
      cy.get('input[name="category"]').type("Electronics");
      cy.get('input[name="price"]').clear().type("100");
      cy.get('input[name="stock"]').clear().type("50");
      cy.get('input[name="image"]').attachFile("kettle.jpeg");
      cy.get('textarea[name="description"]').type("This is a test product description.");
      cy.get('button[type="submit"]').click();
   });

   it("should delete a product from the inventory", () => {
      cy.visit("/manage-inventory");
      cy.get('[data-testid="delete-product-button"]').first().click();
      cy.contains("Are you sure?").should("exist");
      cy.get('[data-testid="delete-button"]').click();
   });

   it("should successfully register a merchant", () => {
      cy.visit("/become-merchant");
      cy.get('input[name="name"]').type("TestMerchant");
      cy.get('input[name="email"]').type("thant@mple.com");
      cy.get('input[name="nid"]').type("1234567895555");
      cy.get('input[name="mobile"]').type("+8801625938610");
      cy.get('input[name="password"]').type("TestPassword123!");
      cy.get('button[type="submit"]').click().wait(2000);

      cy.url().should("include", "/merchant-application-submitted");
   });
});

describe("Admin Feature", () => {
   before(() => cy.login("admin"));

   it("should approve a become merchant request", () => {
      cy.contains("Pending")
         .parents("tr")
         .within(() => {
            cy.get('button[aria-haspopup="menu"]').should("not.be.disabled").click();
         });

      cy.get('div[role="menuitem"]').contains("Approve").click();
   });
});
