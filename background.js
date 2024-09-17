chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.captureVisibleTab(null, {}, (image) => {
      chrome.storage.local.set({ screenshot: image });
    });
  });