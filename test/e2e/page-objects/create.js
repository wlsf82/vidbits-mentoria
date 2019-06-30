const helper = require("protractor-helper");

class Create {
  constructor() {
    this.relativeUrl = "/videos/create";

    this.form = element(by.css("form[action='/videos']"));
    this.titleField = this.form.element(by.id("video-title-input"));
    this.descriptionField = this.form.element(by.id("video-description-input"));
    this.urlField = this.form.element(by.id("video-url-input"));
    this.submitButton = this.form.element(by.id("submit-button"));
  }

  fillWithDataAndSubmit(data) {
    helper.fillFieldWithTextWhenVisible(this.titleField, data.title);
    helper.fillFieldWithTextWhenVisible(this.descriptionField, data.description);
    helper.fillFieldWithTextWhenVisible(this.urlField, data.url);
    helper.clickWhenClickable(this.submitButton);
  }
}

module.exports = Create;
