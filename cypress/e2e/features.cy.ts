describe("Features Testing", () => {
   beforeEach(() => cy.login("user"));

   it("should clear the cart", () => {
      cy.clearCart();
      cy.wait(2000);
   });
});
