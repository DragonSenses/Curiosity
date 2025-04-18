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
        }, 1000); // 1000 milliseconds = 1 second
      }
    }
  }
});
