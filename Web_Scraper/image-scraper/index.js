import 'dotenv/config';

import downloadImages from "./downloadImages.js";
import scrapeImages from "./imageScraper.js";

/* Constants */
// relative: './downloads/'
// Windows: 'C:/Users/YourUsername/Desktop/MyDownloads/'
const outputPath = `${process.env.OUTPUT_PATH}`;

// Define the webpage URL
const url = `${process.env.TARGET_URL}`;

/* To scrape all the <a> tags with the class "sample image" from a given webpage 
let selector = "a.sample_image";
*/
// Define the CSS selector for the <a> tags with the class "sample image"
let selector = "a.sample_image";

// Scrape imageUrls
const data = await scrapeImages(url, selector);

if (data.length !== 0) {
  // Given an array of URLs, download the data
  await downloadImages(data, outputPath);
}