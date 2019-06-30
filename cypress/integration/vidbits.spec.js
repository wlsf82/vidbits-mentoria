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
    beforeEach(() => cy.exec("npm run seed-db"));

    it("creates two more videos", () => {
      videos.forEach(video => cy.createVideo(video));

      cy.visit("videos");

      cy.get(".video-card").its("length").should("eq", 4);
    });
  });
});