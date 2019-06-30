class Video {
  constructor() {
    this.container = element(by.className("video-card"));
    this.deleteButton = this.container.element(by.css(".video-buttons #delete"));
    this.editButton = this.container.element(by.css(".video-buttons #edit"));
  }
}

module.exports = Video;
