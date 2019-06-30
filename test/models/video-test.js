const { assert } = require("chai");
const { mongoose, databaseUrl, options } = require("../../database");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");

const Video = require("../../models/video");

describe("Model: Video", () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    describe("title", () => {
        it("is a String", () => {
            const titleAsInt = 1;

            const video = new Video({ title: titleAsInt });

            assert.strictEqual(video.title, titleAsInt.toString());
        });

        it("is required", () => {
            const video = new Video({title: ""})

            video.validateSync();

            const message = video.errors.title.message

            assert.equal(message, "Path `title` is required.");
        });
    });

    describe("description", () => {
        it("is a String", () => {
            const descriptionAsInt = 1;

            const video = new Video({ description: descriptionAsInt });

            assert.strictEqual(video.description, descriptionAsInt.toString());
        });
    });

    describe("url", () => {
        it("is a String", () => {
            const urlAsInt = 1;

            const video = new Video({ url: urlAsInt });

            assert.strictEqual(video.url, urlAsInt.toString());
        });

        it("is required", () => {
            const video = new Video({url: ""})

            video.validateSync();

            const message = video.errors.url.message

            assert.equal(message, "Path `url` is required.");
        });
    });
});
