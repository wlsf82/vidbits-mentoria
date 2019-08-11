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

Cypress.Commands.add("editVideoViaApi", (id, newVideo) => {
  cy.request({
    method: "POST",
    url: `/videos/${id}/edit`,
    followRedirect: false,
    form: true,
    body: {
      title: newVideo.title,
      description: newVideo.description,
      url: newVideo.url
    }
  });
});

Cypress.Commands.add("getVideoIdFromHomePage", () => {
  cy.request({
    method: "GET",
    url: "/"
  }).then(response => getVideoIdFromHtml(response));
});

function getVideoIdFromHtml(html) {
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(html.body, "text/html");
  const video = htmlDocument.documentElement.querySelector(".video-title a");
  return video.href.replace(`${Cypress.config("baseUrl")}videos/`, "");
}