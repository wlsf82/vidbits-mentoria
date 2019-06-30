describe("Vidbits", () => {
  const videos = [
    {
      title: "Chaos and intuition engineering",
      description: "GOTO 2016 • Chaos & Intuition Engineering at Netflix • Casey Rosenthal.",
      url: "https://www.youtube.com/embed/Q4nniyAarbs"
    },
    {
      title: "appear.in & Star Wars",
      description: "Sed ut perspiciatis unde omnis iste natus error.",
      url: "https://www.youtube.com/embed/vHTIYVHTSxA"
    }
  ];

  context("Empty state", () => {
    it("creates two videos", () => {
      cy.exec("npm run drop-db");

      videos.forEach(video => {
        cy.visit("videos");

        cy.get(".add-video-button").click();

        cy.get("#video-title-input")
          .type(video.title);
        cy.get("#video-description-input")
          .type(video.description);
        cy.get("#video-url-input")
          .type(video.url);

        cy.get("#submit-button").click();
      });

      cy.visit("videos");

      cy.get(".video-card").its("length").should("eq", 2);
    });
  });

  context("Two items already seeded in the DB", () => {
    it("creates two more videos", () => {
      cy.exec("npm run drop-db");
      cy.exec("npm run seed-db");
      
      videos.forEach(video => {
        cy.visit("videos");

        cy.get(".add-video-button").click();

        cy.get("#video-title-input")
          .type(video.title);
        cy.get("#video-description-input")
          .type(video.description);
        cy.get("#video-url-input")
          .type(video.url);

        cy.get("#submit-button").click();
      });

      cy.visit("videos");

      cy.get(".video-card").its("length").should("eq", 4);
    });
  });
});