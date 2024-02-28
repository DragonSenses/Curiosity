// Import the modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Define the array of hrefs
const hrefs = [
  "http://example.com/image1.jpg", 
  "http://example.com/image2.jpg", 
  "http://example.com/image3.jpg"
];

// Loop over the array and make a request for each href
hrefs.forEach((href, index) => {
  // Define the file name and path using the index and the extension
  const ext = path.extname(href);
  const fileName = "image" + index + ext;
  const filePath = path.join("./", fileName);

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
      console.log("Download completed: " + fileName);
    });
  }).on("error", (error) => {
    // Handle the error
    console.error(error);

    // Delete the file
    fs.unlink(filePath, () => {
      // Log a message
      console.log("Download failed: " + fileName);
    });
  });
});
