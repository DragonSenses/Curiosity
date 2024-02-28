// Import the libraries
// const axios = require("axios");
// const cheerio = require("cheerio");
import { get } from "axios";
import { load } from "cheerio";

/* Constants */

// Define the webpage URL
const url = "https://example.com";

// Define the CSS selector for the <a> tags with the class "sample image"
let selector = "a.sample_image";
// a.image_magnify
/* To scrape all the <a> tags with the class "sample image" from a given webpage */

// Fetch the HTML content of the webpage
get(url)
  .then(response => {
    // Parse the HTML content using Cheerio
    const $ = load(response.data);

    // Find all the <a> elements that match the selector
    const links = $(selector);

    // Loop through the links and extract the desired data
    links.each((index, element) => {
      // Get the href attribute of the link
      const href = $(element).attr("href");

      // Get the inner text of the link
      const text = $(element).text();

      // Print the data
      console.log(`Link ${index + 1}: ${text} - ${href}`);
    });
  })
  .catch(error => {
    // Handle the error
    console.error(error);
  });

/* This code will print something like:

Link 1: Sample Image 1 - https://example.com/image1.jpg
Link 2: Sample Image 2 - https://example.com/image2.jpg
Link 3: Sample Image 3 - https://example.com/image3.jpg

*/  