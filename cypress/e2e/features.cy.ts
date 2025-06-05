describe("Features Testing", () => {
   beforeEach(() => cy.login("user"));

   it("should clear the cart", () => {
      cy.clearCart();
      cy.wait(2000);
   });

   it("should add some products to cart", () => {
      cy.visit("/products");
      cy.get('[data-testid="product-grid"]').should("be.visible");
      cy.get('[data-testid="product-card"]').should("have.length.at.least", 3);
      cy.get('[data-testid="add-to-cart-button"]').then(($buttons) => {
         const randomIndices: number[] = [];
         while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * $buttons.length);
            if (!randomIndices.includes(randomIndex)) {
               randomIndices.push(randomIndex);
            }
         }
         randomIndices.forEach((index) => {
            cy.wrap($buttons[index]).click();
            cy.wait(500);
         });
      });
      cy.wait(1000);
      cy.visit("/cart");
      cy.get('[data-testid="cart-loading"]').should("not.exist");
      cy.wait(3000);
      cy.get('[data-testid="empty-cart"]').should("not.exist");
   });
});
