const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");

describe("Server path: /", () => {
    describe("GET", () => {
        beforeEach(connectDatabase);

        const videoToCreate = { title: "Title of existing video" };

        beforeEach(async () => {
            await request(app)
                .post("/videos")
                .type("form")
                .send(videoToCreate);
        });

        afterEach(disconnectDatabase);

        it("redirects to '/videos'", async () => {
            const response = await request(app).get(`/`);

            assert.equal(response.status, 302);
            assert.equal(response.headers.location, "/videos");
        });
    });
});
