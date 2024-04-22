/* Event listener to download an image with just right click */
const onImageClick = (event) => {
  // Prevent the default context menu
  event.preventDefault();

  // Extract the filename from the image source URL
  const urlParts = imageElement.src.split('/');
  const filename = urlParts[urlParts.length - 1];

  // Create a dummy anchor element
  const anchor = document.createElement('a');
  anchor.href = imageElement.src;
  anchor.download = filename; // Set the desired filename

  // Trigger a click on the anchor element
  anchor.click();
};

// Add an event listener to the image element
const imageElement = document.querySelector('img'); // Replace with your actual image selector
imageElement.addEventListener('contextmenu', onImageClick);
