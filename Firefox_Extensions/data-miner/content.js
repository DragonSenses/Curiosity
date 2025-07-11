chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clickButtons") {
    const videoData = []; // Initialize the array

    // Extract video title
    const titleElement = document.querySelector("#video_title h3.post-title.text a");
    const fullTitle = titleElement ? titleElement.textContent.trim() : "Title not found";
    
    // Extract video date
    const dateElement = document.querySelector("#video_date td.text");
    const videoDate = dateElement ? dateElement.textContent.trim() : "Date not found";
    
    // Split the title into ID and Name
    let videoID = "ID not found";
    let videoName = "Name not found";
    
    if (fullTitle.includes(" ")) { // Check if the format matches "ABC-123 Name of the Movie"
      const splitTitle = fullTitle.split(" ");
      videoID = splitTitle.shift(); // Get the first part (ID)
      videoName = splitTitle.join(" "); // Remaining part is the name
    }
    
    // Store in the array in the desired order: ID, Date, Title
    videoData.push({ id: videoID, date: videoDate, title: videoName });
    
    console.log(videoData); // Verify stored data
    
    function copyToClipboard() {
      // Convert the array to CSV format
      const csvData = videoData.map(item => `${item.id},${item.date},${item.title}`).join("\n");
    
      // Copy CSV string to clipboard
      navigator.clipboard.writeText(csvData).then(() => {
        console.log("Data copied to clipboard as CSV!");
        alert("Data successfully copied to clipboard!"); // Optional user feedback
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
    
    // Call function after extracting data
    copyToClipboard();
  }
});


