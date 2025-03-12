document.getElementById('download-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const url = document.getElementById('tweet-url').value;
    const resultDiv = document.getElementById('result');
  
    try {
      const response = await fetch(`/download?url=${encodeURIComponent(url)}`);
      const data = await response.json();
  
      if (data.videoUrl) {
        resultDiv.innerHTML = `<a href="${data.videoUrl}" download>Download Video</a>`;
      } else {
        resultDiv.innerHTML = `<p>${data.error}</p>`;
      }
    } catch (error) {
      resultDiv.innerHTML = `<p>Failed to connect to the server</p>`;
    }
  });