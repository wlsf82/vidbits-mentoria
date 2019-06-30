const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");
const { parseTextFromHTML, seedVideoToDatabase  } = require("../test-utils");

describe("Server path: /videos/:id", () => {
    describe("GET", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        it("render single video", async () => {
            const video = await seedVideoToDatabase({});

            const response = await request(app).get(`/videos/${video._id}`);

            assert.equal(parseTextFromHTML(response.text, ".video-card .video-title h1"), video.title);
            assert.equal(parseTextFromHTML(response.text, "iframe"), "");
            assert.equal(parseTextFromHTML(response.text, ".video-card .video-description p"), video.description);
        });
    });
});
