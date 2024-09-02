chrome.contextMenus.create({
  id: "muteAudioTabs",
  title: "Mute all audio tabs",
  contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "muteAudioTabs") {
    // Query all tabs
    const tabs = await chrome.tabs.query({});

    // Loop through tabs and mute those that are playing audio
    for (const tab of tabs) {
      // Check if the tab is playing audio
      if (tab.audible) {
        chrome.tabs.update(tab.id, { muted: true });
      }
    }
  }
});