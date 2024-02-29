// Import the modules
const http = require("http");
const fs = require("fs");

// Pathname for downloaded images
const outputPath = './downloads/';
const createFilePath = (url) => {
  const filename = url.split('/').pop(); // Extract filename from URL
  return `${outputPath}${filename}`;
};

/**
 * Given an array of URLs to images, downloads the images to the file system.
 * @param {URL[]} hrefs an array of Images
 */
export default async function downloadImages(hrefs){
  // Loop over the array and make a request for each href
  hrefs.forEach((href) => {
    // Define the file name and path using the index and the extension
    // const ext = path.extname(href);
    // const fileName = "image" + index + ext;
    // const filePath = path.join("./", fileName);
  
    const filePath = createFilePath(href);
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

