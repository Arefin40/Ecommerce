/// <reference types="cypress" />

// ANCHOR Type definitions for Cypress commands
type LoginRole = "user" | "merchant" | "admin";
const loginCredentials = {
   user: { url: "login", email: "testuser@shobai.com", password: "EasyPass@123" },
   merchant: { url: "merchant", email: "merchant@shobai.com", password: "EasyPass@123" },
   admin: { url: "admin", email: "admin@shobai.com", password: "EasyPass@123" }
};

declare global {
   namespace Cypress {
      interface Chainable {
         login(url: LoginRole): Chainable<void>;
         clearCart(): Chainable<void>;
         clearWishlist(): Chainable<void>;
      }
   }
}

// ANCHOR Cypress Commands
// User, merchant, and admin login command
Cypress.Commands.add("login", (role: LoginRole) => {
   cy.visit(loginCredentials[role].url);
   cy.get('aside[data-test="auth-sidebar"]').invoke("hide");
   cy.get('form[data-testid="signin-form"]').should("be.visible");
   cy.get('input[name="email"]').type(loginCredentials[role].email);
   cy.get('input[name="password"]').type(loginCredentials[role].password);
   cy.get('[data-testid="login-button"]').click();

   if (role === "user") {
      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.wait(1000);
      cy.get('[data-testid="user-menu"]').should("be.visible");
   } else if (role === "merchant" || role === "admin") {
      cy.url().should("eq", Cypress.config().baseUrl + "/dashboard");
      cy.get('[data-testid="dashboard-page-title"]').should("be.visible").contains("Dashboard");
   }
});

export {};
