import fs from 'node:fs';
import https from 'node:https';
// Import Dependencies
import cheerio from 'cheerio';
import fetch from 'node-fetch';

// Create a new memes folder for saving the downloaded images if none exists
fs.mkdir('./memes', { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

// Declare an empty array
const downloadedImages = [];

// Create a request to fetch HTML from URL
fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((response) => response.text())
  .then((html) => {
    // Declare a variable html
    const $ = cheerio.load(html);

    // Loop through the first 10 images and downloads them
    for (let i = 0; i < 10; i++) {
      const file = fs.createWriteStream(`./memes/memes${i}.jpg`);
      https.get(downloadedImages[i], function (response) {
        response.pipe(file);
      });
    }

    $.html();

    console.log('Images downloaded');
  });
