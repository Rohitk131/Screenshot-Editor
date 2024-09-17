document.getElementById('capture').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'capture' }, (response) => {
      chrome.storage.local.get('screenshot', (data) => {
        const img = document.getElementById('screenshot');
        img.src = data.screenshot;
        img.style.display = 'block';
      });
    });
  });