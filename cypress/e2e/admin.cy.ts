describe("Admin Functionality Tests", () => {
   beforeEach(() => cy.login("admin"));

   it("should toggle user role between user and admin", () => {
      cy.visit("/manage-users");
      cy.get('[data-testid="dashboard-page-title"]').should("be.visible").contains("Manage Users");

      // Get the last user's current role
      cy.get('[data-testid="user-role"]')
         .last()
         .then(($role) => {
            const currentRole = $role.text().trim();
            const newRole = currentRole === "User" ? "Admin" : "User";
            const buttonToClick = currentRole === "User" ? "admin-role-button" : "user-role-button";

            // Open action menu and click appropriate role button
            cy.get('[data-testid="manage-user-action-button"]').should("be.visible").last().click();
            cy.get(`[data-testid="${buttonToClick}"]`).should("be.visible").click();

            // Verify role changed
            cy.get('[data-testid="user-role"]').last().should("be.visible").contains(newRole);
         });
   });

   it("should change order status to delivered", () => {
      cy.visit("/manage-orders");
      cy.get('[data-testid="dashboard-page-title"]').should("be.visible").contains("Manage Orders");

      // Get the last order's current status
      // Open action menu and click delivered button
      cy.get('[data-testid="manage-order-button"]').should("be.visible").last().click();
      cy.get('[data-testid="delivered-button"]').should("be.visible").click();

      // Verify status changed
      cy.get('[data-testid="order-status"]').last().should("be.visible").contains("Delivered");
   });
});

describe("Merchant Request Tests", () => {
   it("should apply to become merchant twice", () => {
      for (let i = 0; i < 2; i++) {
         const randomDigits = Math.floor(1000 + Math.random() * 9000);

         cy.visit("/become-merchant");
         cy.contains("Become a Merchant");

         // fill in the become merchant form
         cy.get('input[name="name"]').type(`Merchant ${randomDigits}`);
         cy.get('input[name="email"]').type(`merchant${randomDigits}@shobai.com`);
         cy.get('input[name="nid"]').type("1234567890123");
         cy.get('input[name="mobile"]').type("01812345678");
         cy.get('input[name="password"]').type("EasyPass@123");
         cy.get('button[type="submit"]').should("exist").click().wait(1000);

         // verify the submission
         cy.url().should("include", "/merchant-application-submitted");
      }
   });

   it("should approve last and reject second last merchant request", () => {
      cy.login("admin");
      cy.visit("/merchant-requests");

      // Approve last request
      cy.get('[data-testid="manage-merchant-request-button"]')
         .last()
         .should("exist")
         .click()
         .wait(1000);
      cy.get('[data-testid="approve-button"]').should("be.visible").click().wait(1000);

      // Reject second last request
      cy.get('[data-testid="manage-merchant-request-button"]')
         .eq(-2)
         .should("exist")
         .click()
         .wait(1000);
      cy.get('[data-testid="reject-button"]').should("be.visible").click().wait(1000);
   });
});
