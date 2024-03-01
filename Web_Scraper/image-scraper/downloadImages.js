// Import the modules
// const http = require("http");
// const fs = require("fs");
import http from 'http';
import fs from 'fs';

/* Pathname for downloaded images */
// relative: './downloads/'
// Windows: 'C:/Users/YourUsername/Desktop/MyDownloads/'
// 'D:/temp/images/'
// const outputPath = './downloads/';

/*  
const createFilePath = (url) => {
  const filename = url.split('/').pop(); // Extract filename from URL
  return `${outputPath}${filename}`;
};
*/

function createFilePath(url, outputPath) {
  const filename = url.split('/').pop(); // Extract filename from URL
  return `${outputPath}${filename}`;
}

/**
 * Checks if the output path exists. If it does not exist then create
 * the directory (including nested directories).
 * @param {string} path the output path name
 */
function checkOutputPath(path){
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  return;
}

/**
 * Given an array of URLs to images, downloads the images to the file system.
 * @param {URL[]} hrefs an array of Images
 * @param {string} outputPath the path where images will be downloaded to
 */
export default async function downloadImages(hrefs, outputPath){
  checkOutputPath(outputPath);

  console.log(typeof hrefs);
  console.log(hrefs.length === 0);
  // Loop over the array and make a request for each href
  hrefs.forEach((href) => {
    // Define the file name and path using the index and the extension
    // const ext = path.extname(href);
    // const fileName = "image" + index + ext;
    // const filePath = path.join("./", fileName);
  
    const filePath = createFilePath(href, outputPath);
    // const fileName = filePath.split('/').pop();
    // const ext = filePath.extname(href);

    // Create a writable stream
    const file = fs.createWriteStream(filePath);
  
    // Make a request to the href
    http.get(href, (response) => {
      // Pipe the response to the stream
      response.pipe(file);
  
      // Add a callback function to handle the completion of the download
      file.on("finish", () => {
        // Close the stream
        file.close();
  
        // Log a message
        console.log("Download completed: " + filePath);
      });
    }).on("error", (error) => {
      // Handle the error
      console.error(error);
  
      // Delete the file
      fs.unlink(filePath, () => {
        // Log a message
        console.log("Download failed: " + filePath);
      });
    });
  });
}

