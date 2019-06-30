const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");
const { parseTextFromHTML, seedVideoToDatabase } = require("../test-utils");

describe("Server path: /videos", () => {
    describe("GET", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        it("render existing videos", async () => {
            const video = await seedVideoToDatabase({});

            const response = await request(app).get(`/videos`);

            assert.include(parseTextFromHTML(response.text, "#videos-container .video-title"), video.title);
        });
    });
});

describe("Server path: /videos/:id/delete", () => {
    describe("GET", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        it("does not show deleted video on the landing page and returns '302' status code", async () => {
            const video = await seedVideoToDatabase({});

            const response = await request(app)
                .post(`/videos/${video._id}/delete`)
                .send();

            assert.equal(response.status, 302);
            assert.equal(response.headers.location, "/");
        });
    });

    describe("POST", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        it("deletes video from the database", async () => {
            const video = await seedVideoToDatabase({});

            const response = await request(app)
                .post(`/videos/${video._id}/delete`)
                .send();

            const videos = await Video.find({});

            assert.equal(videos.length, 0);
        });
    });
});
