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
   if (role === "user") cy.get('aside[data-test="auth-sidebar"]').invoke("hide");
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

// Clear cart command
Cypress.Commands.add("clearCart", () => {
   cy.visit("/cart");
   cy.get('[data-testid="cart-loading"]').should("not.exist");
   cy.wait(3000);
   cy.get("body").then(($body) => {
      if ($body.find('[data-testid="clear-cart-button"]').length > 0) {
         cy.get('[data-testid="clear-cart-button"]').click();
      }
      cy.get('[data-testid="empty-cart"]').should("be.visible");
   });
});

// Clear wishlist command
Cypress.Commands.add("clearWishlist", () => {
   cy.visit("/wishlist");
   cy.get('[data-testid="wishlist-loading"]').should("not.exist");
   cy.wait(3000);
   cy.get("body").then(($body) => {
      if ($body.find('[data-testid="clear-wishlist-button"]').length > 0) {
         cy.get('[data-testid="clear-wishlist-button"]').click();
      }
      cy.get('[data-testid="empty-wishlist"]').should("be.visible");
   });
});

export {};
