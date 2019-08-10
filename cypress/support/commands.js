// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

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
