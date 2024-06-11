const tabs = await chrome.tabs.query({
  url: [
    "https://developer.chrome.com/docs/webstore/*",
    "https://developer.chrome.com/docs/extensions/*",
  ]
});

// Create a collator for string comparison
const collator = new Intl.Collator();

// Sort the tabs array based on tab titles
tabs.sort((a, b) => collator.compare(a.title, b.title));

// Get the template element with the ID "li_template"
const template = document.getElementById("li_template");

// Initialize a Set to store cloned elements
const elements = new Set();

// Iterate through each tab
for (const tab of tabs) {
  // Clone the first child of the template content
  const element = template.content.firstElementChild.cloneNode(true);

  // Extract the title and remove any trailing hyphens
  const title = tab.title.split("-")[0].trim();

  // Extract the pathname from the tab URL
  const pathname = new URL(tab.url).pathname.slice("/docs".length);

  // Set the text content for the title and pathname elements
  element.querySelector(".title").textContent = title;
  element.querySelector(".pathname").textContent = pathname;

  // Add a click event listener to the anchor tag
  element.querySelector("a").addEventListener("click", async () => {
    // Need to focus window as well as the active tab
    // Update the active tab and focused window
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  // Add the cloned element to the Set
  elements.add(element);
}

// Append all elements from the Set to the <ul> element
document.querySelector("ul").append(...elements);

// Add button to group tabs as "DOCS"
const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id);
  if (tabIds.length) {
    const group = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(group, { title: "DOCS" });
  }
});