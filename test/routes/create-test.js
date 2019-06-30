const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");
const { parseTextFromHTML, generateRandomUrl } = require("../test-utils");

describe("Server path: /videos", () => {
    describe("POST", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        describe("Video successfully created", () => {
            let response;
            let videoToCreate;

            beforeEach(async () => {
                videoToCreate = {
                    title: "Sample title",
                    description: "Sample description",
                    url: generateRandomUrl("example.com"),
                };

                response = await request(app)
                    .post("/videos")
                    .type("form")
                    .send(videoToCreate);
            });

            it("returns created success status code", async () => {
                assert.equal(response.status, 201);
            });

            it("renders video information", async () => {
                assert.equal(parseTextFromHTML(response.text, ".video-card .video-title h1"), videoToCreate.title);
                assert.equal(parseTextFromHTML(response.text, ".video-card .video-description p"), videoToCreate.description);
            });

            it("stores new video in the database", async () => {
                const createdVideo = await Video.findOne(videoToCreate);

                assert.equal(createdVideo.title, videoToCreate.title);
                assert.equal(createdVideo.description, videoToCreate.description);
                assert.equal(createdVideo.url, videoToCreate.url);
            });
        });

        describe("With missing title", () => {
            const videoToCreateWithMissingTitle = {
                description: "Sample description db",
                url: generateRandomUrl("example.com"),
            };
            let response;

            beforeEach(async () => {
                response = await request(app)
                    .post("/videos")
                    .type("form")
                    .send(videoToCreateWithMissingTitle);
            });

            it("does not save video", async () => {
                const videos = await Video.find({});

                assert.equal(videos.length, 0);
            });

            it("returns '400' status code", async () => {
                assert.equal(response.status, 400);
            });

            it("renders the create video form", async () => {
                assert.isOk(parseTextFromHTML(response.text, "#create-video-container form"), "Create form was not rendered");
                assert.equal(parseTextFromHTML(response.text, "#create-video-container h2"), "Save a video");
            });

            it("renders an error in the video form", async () => {
                assert.equal(parseTextFromHTML(response.text, "#create-video-container span"), "Path `title` is required.");
            });

            it("preservers description in the video form", async () => {
                assert.equal(
                    parseTextFromHTML(response.text, "#video-description-input"),
                    videoToCreateWithMissingTitle.description
                );
            });
        });
    });
});
