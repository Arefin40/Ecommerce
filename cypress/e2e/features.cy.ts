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

   it("should clear the wishlist", () => {
      cy.clearWishlist();
      cy.wait(2000);
   });

   it("should add some products to wishlist", () => {
      cy.visit("/products");
      cy.get('[data-testid="product-grid"]').should("be.visible");
      cy.get('[data-testid="product-card"]').should("have.length.at.least", 3);
      cy.get('[data-testid="toggle-wishlist-button"]').then(($buttons) => {
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
      cy.visit("/wishlist");
      cy.get('[data-testid="wishlist-loading"]').should("not.exist");
      cy.wait(3000);
      cy.get('[data-testid="empty-wishlist"]').should("not.exist");
   });

   it("should toggle store follow", () => {
      cy.visit("/");
      cy.get('[data-test="store-follow-button"]').should("be.visible").first().as("followButton");

      cy.get("@followButton").then(($button) => {
         const initialText = $button.text();
         const expectedText = initialText === "Follow" ? "Following" : "Follow";

         cy.get("@followButton").click();
         cy.get("@followButton").should("contain", expectedText);
      });
   });

   it("should navigate to product details from post", () => {
      cy.get('[data-testid="post"]').should("have.length.at.least", 1);
      cy.get('[data-testid="post-content"]')
         .first()
         .scrollIntoView({ offset: { top: 100, left: 0 } });
      cy.get('[data-testid="post-product"]').first().click();
      cy.url().should("include", "/details");
      cy.get('[data-testid="add-to-cart-button"]').should("be.visible").click().wait(500);
      cy.get('[data-testid="add-to-wishlist-button"]').should("be.visible").click().wait(1000);
   });
});
