document.getElementById('mute-tabs').addEventListener('click', async () => {
    // Query all tabs
    const tabs = await chrome.tabs.query({});

    // Loop through tabs and mute those that are playing audio
    for (const tab of tabs) {
        if (tab.audible) {
            chrome.tabs.update(tab.id, { muted: true });
        }
    }
});
