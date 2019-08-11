describe("Vidbits", () => {
  const videos = require("../fixtures/videos");

  beforeEach(() => cy.exec("npm run drop-db"));

  context("Browser UI", () => {
    context("Empty state", () => {
      it("creates two videos", () => {
        videos.forEach(video => cy.createVideoViaBrowser(video));

        cy.visit("videos");

        cy.validateNumberOfVideoCardsEqualTo(2);
      });
    });

    context("Two items already seeded in the DB", () => {
      beforeEach(() => cy.exec("npm run seed-db"));

      it("creates two more videos", () => {
        videos.forEach(video => cy.createVideoViaBrowser(video));

        cy.visit("videos");

        cy.validateNumberOfVideoCardsEqualTo(4);
      });
    });
  });

  context("API seeding and testing", () => {
    beforeEach(() => cy.server());

    context("Seed application via API and check via browser UI", () => {
      it("creates two videos", () => {
        videos.forEach(video => cy.createVideoViaApi(video))

        cy.visit("videos");

        cy.validateNumberOfVideoCardsEqualTo(2);
      });
    });

    context("Testing only in the API layer", () => {
      it("creates two videos", () => {
        videos.forEach(video => {
          cy.createVideoViaApi(video)
          .then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.include(video.title);
            expect(response.body).to.include(video.url);
          });
        });
      });

      it("does not create video due to missing body data", () => {
        cy.createVideoViaApi({})
        .then(response => {
          expect(response.status).to.eq(400);
        });
      });

      it("edits video information", () => {
        cy.createVideoViaApi(videos[1]);
        cy.getVideoIdFromHomePage()
        .then(id => {
          cy.editVideoViaApi(id, videos[0])
          .then(response => {
            expect(response.status).to.eq(302);
            expect(response.redirectedToUrl).to.eq(
              `${Cypress.config("baseUrl")}videos/${id}`
            );
          });
        });
      });
    });
  });
});
