describe("Vidbits", () => {
  context("Empty state", () => {
    it("creates two videos", () => {
      cy.exec("npm run drop-db");
      cy.visit("videos");

      cy.get(".add-video-button").click();

      cy.get("#video-title-input")
        .type("Chaos and intuition engineering");
      cy.get("#video-description-input")
        .type("GOTO 2016 • Chaos & Intuition Engineering at Netflix • Casey Rosenthal.");
      cy.get("#video-url-input")
        .type("https://www.youtube.com/embed/Q4nniyAarbs");

      cy.get("#submit-button").click();

      cy.visit("videos");

      cy.get(".add-video-button").click();

      cy.get("#video-title-input")
        .type("appear.in & Star Wars");
      cy.get("#video-description-input")
        .type("Sed ut perspiciatis unde omnis iste natus error.");
      cy.get("#video-url-input")
        .type("https://www.youtube.com/embed/vHTIYVHTSxA");

      cy.get("#submit-button").click();

      cy.visit("videos");

      cy.get(".video-card").its("length").should("eq", 2);
    });
  });

  context("Two items already seeded in the DB", () => {
    it("creates two more videos", () => {
      cy.exec("npm run drop-db");
      cy.exec("npm run seed-db");
      cy.visit("videos");

      cy.get(".add-video-button").click();

      cy.get("#video-title-input")
        .type("Chaos and intuition engineering");
      cy.get("#video-description-input")
        .type("GOTO 2016 • Chaos & Intuition Engineering at Netflix • Casey Rosenthal.");
      cy.get("#video-url-input")
        .type("https://www.youtube.com/embed/Q4nniyAarbs");

      cy.get("#submit-button").click();

      cy.visit("videos");

      cy.get(".add-video-button").click();

      cy.get("#video-title-input")
        .type("appear.in & Star Wars");
      cy.get("#video-description-input")
        .type("Sed ut perspiciatis unde omnis iste natus error.");
      cy.get("#video-url-input")
        .type("https://www.youtube.com/embed/vHTIYVHTSxA");

      cy.get("#submit-button").click();

      cy.visit("videos");

      cy.get(".video-card").its("length").should("eq", 4);
    });
  });
});