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
const currentImages = [];

// Create a request to fetch HTML from URL
void fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((response) => response.text())
  .then((html) => {
    // Declare a variable html
    const $ = cheerio.load(html);

    // Get images URLs and put them into an array
    $('img').each((i, element) => {
      const imageUrl = $(element).attr('src'); // Reference for the image element
      currentImages.push(imageUrl);
    });
    // Taking first ten images and put them into new array
    for (let i = 0; i < 10; i++) {
      const images = currentImages[i];
      downloadedImages.push(images);
    }

    // Loop through the first 10 images and downloads them
    for (let i = 0; i < 10; i++) {
      // Add 0 before an image number if necessary
      const path =
        i === 9 ? `./memes/memes${i + 1}.jpg` : `./memes/memes0${i + 1}.jpg`;
      const file = fs.createWriteStream(path);
      https.get(downloadedImages[i], function (response) {
        response.pipe(file);
      });
    }

    $.html();

    console.log('Images downloaded');
  });
