chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url && tab.url.startsWith("http")) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      await chrome.scripting.executeScript({
        files: ['downloader.js'],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      await chrome.scripting.executeScript({
        files: ["remove.js"],
        target: { tabId: tab.id },
      });
    }

  } else {
    console.error("Cannot execute script on this URL:", tab.url);
  }
});
