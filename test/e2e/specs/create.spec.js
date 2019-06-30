const helper = require("protractor-helper");

const CreatePage = require("../page-objects/create");
const VideoPage = require("../page-objects/video");

describe("given I'm at the relative url '/videos/create'", () => {
  const createPage = new CreatePage();

  beforeEach(() => browser.get(createPage.relativeUrl));

  it("then I see a form for video creation", () => {
    helper.waitForElementVisibility(createPage.form);
  });

  describe("when I fill all the valid fields with valid data and click submit", () => {
    const data = {
      title: "The best video ever",
      description: "This is an incredible video",
      url: "https://www.youtube.com/embed/Q4nniyAarbs"
    };

    beforeEach(() => createPage.fillWithDataAndSubmit(data));

    it("then I see the just created video and options to delete or edit it", () => {
      const videoPage = new VideoPage();

      helper.waitForTextToBePresentInElement(videoPage.container, data.title);
      helper.waitForTextToBePresentInElement(videoPage.container, data.description);
      helper.waitForElementVisibility(videoPage.deleteButton);
      helper.waitForElementVisibility(videoPage.editButton);
    });
  });
});
