// Import the libraries
// const axios = require("axios");
// const cheerio = require("cheerio");
import axios from "axios";
import { load } from "cheerio";

export default async function scrapeImages(url, selector) {
  try {
    const response = await axios.get(url); // Await the response
    console.log(response);

    // Parse the HTML content using Cheerio
    const $ = load(response.data);

    const links = $(selector);
    // console.log(links);
    
    const imageUrls = [];

    links.each((index, element) => {
      const href = $(element).attr("href");
      const text = $(element).text();

      console.log(`Link ${index + 1}: ${text} - ${href}`);
      imageUrls.push(new URL(href));
    });

    console.log(`imageUrls:\n${imageUrls}\n`);
    return imageUrls;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
}

/* Constants */

// Define the webpage URL
// const url = "https://example.com";

/* To scrape all the <a> tags with the class "sample image" from a given webpage 
let selector = "a.sample_image";
*/
// Define the CSS selector for the <a> tags with the class "sample image"
// let selector = "a.sample_image";
// a.image_magnify

/* This code will print something like:

Link 1: Sample Image 1 - https://example.com/image1.jpg
Link 2: Sample Image 2 - https://example.com/image2.jpg
Link 3: Sample Image 3 - https://example.com/image3.jpg

returns array of image URLs
*/
/* 
export default async function scrapeImages(url, selector){
  let imageUrls = [];
  // Fetch the HTML content of the webpage
  await axios.get(url)
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

        // Store the data
        imageUrls.push(new URL(`${href}`));
      });
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });

    console.log(`imageUrls:
    ${imageUrls}
    `);

    // if (imageUrls.length === 0) {
    //   return [];
    // }
    
    return imageUrls;
}
*/
