const { assert } = require("chai");

describe("User deletes a video", () => {
    const title = "Foo";
    const description = "Foobaca";
    const url = "https://www.youtube.com/embed/vHTIYVHTSxA";

    beforeEach(() => {
        browser.url("/videos/create");

        browser.setValue("#video-title-input", title);
        browser.setValue("#video-description-input", description);
        browser.setValue("#video-url-input", url);
        browser.click("#submit-button");

        browser.click("#delete");
    });

    it("does not renders the just deleted video", () => {
        assert.notInclude(browser.getText("#videos-container"), title);
    });
});
