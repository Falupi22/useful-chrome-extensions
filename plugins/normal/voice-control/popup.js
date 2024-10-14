document.getElementById("message").onclick = function () {
    console.log("shit");
    chrome.storage.local.get("muted", function (result) {
        console.log(result);
        // Check if result is undefined or doesn't exist in storage
        if (result.muted === undefined) {
            // Set default value in storage

            chrome.storage.local.set({ muted: false }, function () { });
            return;
        }

        // Determine the muted status
        const text = result.muted ? "muted." : "not muted.";

        // Update the message in the popup
        document.getElementById("message").innerHTML = `${result.muted} tabs have been toggled`;
    });
};
