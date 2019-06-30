const { jsdom } = require("jsdom");

const Video = require("../models/video");

const parseTextFromHTML = (htmlAsString, selector) => {
    const selectedElement = jsdom(htmlAsString).querySelector(selector);

    if (selectedElement !== null) {
        return selectedElement.textContent;
    } else {
        throw new Error(`No element with selector ${selector} found in HTML string`);
    }
};

const buildItemObject = (options = {}) => {
    const title = options.title || "My favorite video";
    const description = options.description || "The best video ever!";
    const url = options.url || "https://www.youtube.com/embed/vHTIYVHTSxA";

    return { title, description, url };
};

const seedVideoToDatabase = async (options = {}) => {
    const video = await Video.create(buildItemObject(options));

    return video;
};

const generateRandomUrl = (domain) => `http://${domain}/${Math.random()}`;

module.exports = {
    parseTextFromHTML,
    buildItemObject,
    seedVideoToDatabase,
    generateRandomUrl
};
