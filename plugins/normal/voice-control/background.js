chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "muteAudioTabs",
    title: "Toggle mute of all audio tabs",
    contexts: ["all"]
  });
});


chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "muteAudioTabs") {
    // Query all tabs
    const tabs = await chrome.tabs.query({});
    let mutedTabs = 0;
    // Loop through tabs and mute those that are playing audio
    for (const tab of tabs) {
      // Check if the tab is playing audio
      if (tab.audible) {
        mutedTabs++;
        chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
      }
    }

    chrome.storage.local.set({ muted: mutedTabs });

    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 370,  // Set your desired width
      height: 220, // Set your desired height
      top: 100,    // Set a specific top position
      left: 100    // Set a specific left position
    }, (newWindow) => {
      // Optionally handle the new window here
      console.log('Popup opened with ID:', newWindow.id);
    });
  }
})