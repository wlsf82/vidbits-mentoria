describe("Vidbits", () => {
  const videos = require("../fixtures/videos");

  beforeEach(() => cy.exec("npm run drop-db"));

  context("Empty state", () => {
    it("creates two videos", () => {
      videos.forEach(video => cy.createVideo(video));

      cy.visit("videos");

      cy.get(".video-card").its("length").should("eq", 2);
    });
  });

  context("Two items already seeded in the DB", () => {
    it("creates two more videos", () => {
      cy.exec("npm run seed-db");
      
      videos.forEach(video => cy.createVideo(video));

      cy.visit("videos");

      cy.get(".video-card").its("length").should("eq", 4);
    });
  });
});