describe("Vidbits", () => {
  const videos = require("../fixtures/videos");

  beforeEach(() => cy.exec("npm run drop-db"));

  context("Browser UI", () => {
    context("Empty state", () => {
      it("creates two videos", () => {
        videos.forEach(video => cy.createVideo(video));

        cy.visit("videos");

        cy.validateNumberOfVideoCardsEqualTo(2);
      });
    });

    context("Two items already seeded in the DB", () => {
      beforeEach(() => cy.exec("npm run seed-db"));

      it("creates two more videos", () => {
        videos.forEach(video => cy.createVideo(video));

        cy.visit("videos");

        cy.validateNumberOfVideoCardsEqualTo(4);
      });
    });
  });

  context("API", () => {
    context("Seed application via API and check via browser UI", () => {
      beforeEach(() => videos.forEach(video => cy.createVideoViaApi(video)));

      it("creates two videos", () => {
        cy.visit("videos");

        cy.validateNumberOfVideoCardsEqualTo(2);
      });
    });

    context("Testing only in the API layer", () => {
      it("creates two videos", () => {
        videos.forEach(video => {
          cy.createVideoViaApi(video).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.include(video.title);
            expect(response.body).to.include(video.url);
          });
        });
      });
    });
  });
});
