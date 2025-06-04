describe("Checkout Tests", () => {
   before(() => {
      cy.login("user");
      cy.clearCart();
   });

   it("should place an order successfully", () => {
      // add a product to the cart
      cy.visit("/products");
      cy.get('[data-testid="product-grid"]').should("be.visible");
      cy.get('[data-testid="add-to-cart-button"]').should("have.length.at.least", 1);
      cy.get('[data-testid="add-to-cart-button"]').first().click();
      cy.wait(1000);

      // check if the cart is not empty
      cy.visit("/cart");
      cy.get('[data-testid="cart-loading"]').should("not.exist");
      cy.get('[data-testid="empty-cart"]').should("not.exist");
      cy.wait(1000);

      // proceed to checkout
      cy.get('[data-testid="checkout-button"]').should("be.visible").click();
      cy.url().should("include", "/checkout");
      cy.get('[data-testid="checkout-form"]').should("be.visible");
      cy.wait(1000);

      // fill up the checkout form
      cy.get('input[name="shipping_name"]').type("Shahriar Arefin");
      cy.get('input[name="shipping_phone"]').type("01812345678");
      cy.get('input[name="shipping_address"]').type("74/A Green Rd, Dhaka 1205");
      cy.get('input[data-slot="command-input"]').first().type("Dha");
      cy.get('[data-value="Dhaka"]').first().should("be.visible").click();
      cy.get('input[data-slot="command-input"]').eq(1).type("Farm");
      cy.get('[data-value="Farmgate"]').first().should("be.visible").click();
      cy.get('input[name="billing_name"]').type("Shahriar Arman");
      cy.get('input[name="billing_phone"]').type("01512345678");
      cy.get('input[name="billing_address"]').type("Mirsarari Pourashava");
      cy.get('input[data-slot="command-input"]').eq(2).type("Chitta");
      cy.get('[data-value="Chittagong"]').first().should("be.visible").click();
      cy.get('input[data-slot="command-input"]').eq(3).type("Mirs");
      cy.get('[data-value="Mirsharai"]').first().should("be.visible").click();
      cy.get('[data-testid="place-order-button"]').should("be.visible").click();
      cy.wait(1000);

      // pay for the order
      cy.get('[data-testid="payment-methods"]').should("be.visible");
      cy.get('[data-testid="payment-gateway"]').first().click();
      cy.get('[data-testid="place-order-button"]').should("be.visible").click();
      cy.origin("https://sandbox.sslcommerz.com", () => {
         cy.get('input[value="Success"]').should("be.visible").click();
         Cypress.on("uncaught:exception", () => false);
         cy.wait(3000);
      });
      // check if the order is placed successfully
      cy.login("user");
      cy.visit("/orders");
   });
});
