Cypress.Commands.add("createVideo", video => {
  cy.visit("videos/create");

  cy.get("#video-title-input")
    .type(video.title);
  cy.get("#video-description-input")
    .type(video.description);
  cy.get("#video-url-input")
    .type(video.url);

  cy.get("#submit-button").click();
});

Cypress.Commands.add("validateNumberOfVideoCardsEqualTo", n => {
  cy.get(".video-card").its("length").should("eq", n);
});

Cypress.Commands.add("createVideoViaApi", video => {
  cy.server();
  return cy.request({
    method: "POST",
    url: "/videos",
    form: true,
    body: {
      title: video.title,
      description: video.description,
      url: video.url
    },
    failOnStatusCode: false
  });
});
