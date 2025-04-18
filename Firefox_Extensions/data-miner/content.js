chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clickButtons") {
    const buttonsDiv = document.querySelector('#content #bigcontainer #info-block #info .buttons');
    if (buttonsDiv) {
      const favoriteButton = buttonsDiv.querySelector('#favorite');
      const downloadLink = buttonsDiv.querySelector('#download');
      
      if (favoriteButton) favoriteButton.click();
      
      if (downloadLink) {
        setTimeout(() => {
          downloadLink.click();
        }, 1265); // 1000 milliseconds = 1 second || Avg Human Reaction Time is 265ms
      }
    }
  }
});


function getVideoTitle() {
  const titleDiv = document.querySelector("body.main div#content div#rightcolumn div#video_title");
  if (!titleDiv) {
    console.error("video_title div not found!");
    return null;
  }

  const titleElement = titleDiv.querySelector("h3.post-title.text a"); // Target the <a> tag
  if (!titleElement) {
    console.error("Anchor tag inside post-title not found!");
    return null;
  }

  return titleElement.textContent.trim(); // Extract text safely
}

// Example usage
console.log(getVideoTitle()); // Should log: "ABC-931 Example Name"