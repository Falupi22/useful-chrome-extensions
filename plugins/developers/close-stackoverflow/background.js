chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "closeStackOverflowTabs",
    title: "Close all Stack Overflow tabs",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "closeStackOverflowTabs") {
    // Query all tabs
    const tabs = await chrome.tabs.query({});

    // Filter and close tabs with "stackoverflow" in their URL
    for (const tab of tabs) {
      if (tab.url.startsWith("https://stackoverflow.com")) {
        chrome.tabs.remove(tab.id);
      }
    }
  }
});
