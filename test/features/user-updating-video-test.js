const { assert } = require("chai");

describe("User visits the edit video page", () => {
    const title = "Foo";
    const description = "Foobaca";
    const url = "https://www.youtube.com/embed/vHTIYVHTSxA";

    beforeEach(() => {
        browser.url("/videos/create");

        browser.setValue("#video-title-input", title);
        browser.setValue("#video-description-input", description);
        browser.setValue("#video-url-input", url);
        browser.click("#submit-button");

        browser.click("#edit");
    });

    it("renders a video for edition", () => {
        assert.equal(browser.getAttribute("#video-title-input", "value"), title);
        assert.equal(browser.getText("#video-description-input"), description);
        assert.equal(browser.getAttribute("#video-url-input", "value"), url);
    });

    it("shows the updated title on the video page after editing it", () => {
        const newTitle = "Updated Title";

        browser.setValue("#video-title-input", newTitle);
        browser.click("#submit-button");

        assert.equal(browser.getText(".video-card .video-title h1"), newTitle);
    });

    it("does not create an additional video after updating a video", () => {
        const newTitle = "Brand new title";

        browser.setValue("#video-title-input", newTitle);
        browser.click("#submit-button");

        assert.notInclude(browser.getText(".video-card .video-title h1"), title);
    });

    it("shows the updated description on the video page after editing it", () => {
        const newDescription = "Updated Description";

        browser.setValue("#video-description-input", newDescription);
        browser.click("#submit-button");

        assert.equal(browser.getText(".video-card .video-description p"), newDescription);
    });

    it("shows an error message when trying to edit a video by removing its title", () => {
        const emptyTitle = "";

        browser.setValue("#video-title-input", emptyTitle);
        browser.click("#submit-button");

        assert.equal(browser.getText("span"), "Path `title` is required.");
    });

    it("shows an error message when trying to edit a video by removing its url", () => {
        const emptyUrl = "";

        browser.setValue("#video-url-input", emptyUrl);
        browser.click("#submit-button");

        assert.equal(browser.getText("span"), "Path `url` is required.");
    });
});
