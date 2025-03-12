require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public')); // Serve static files from 'public' folder

// Helper function to extract tweet ID from URL (supporting both twitter.com and x.com)
function extractTweetId(url) {
  const match = url.match(/(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/);
  return match ? match[1] : null;
}

// Helper function to get app-only bearer token for Twitter/X API v2
async function getAppBearerToken() {
  const API_KEY = process.env.API_KEY; // Access API key from .env
  const API_SECRET = process.env.API_SECRET; // Access API secret from .env
  if (!API_KEY || !API_SECRET) {
    throw new Error('API_KEY and API_SECRET must be set in .env file');
  }

  const credentials = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

  try {
    const response = await axios.post(
      'https://api.twitter.com/2/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Bearer Token Error:', error.response?.status, error.response?.data || error.message);
    throw new Error('Failed to get bearer token: ' + (error.response?.data?.errors?.[0]?.message || error.message));
  }
}

// Helper function to get tweet data using tweet ID and bearer token (Twitter API v2)
async function getTweetData(tweetId, bearerToken) {
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys&media.fields=url,variants`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Tweet Data Error:', error.response?.status, error.response?.data || error.message);
    throw new Error('Failed to get tweet data: ' + (error.response?.data?.errors?.[0]?.message || error.message));
  }
}

// Helper function to extract video URL from tweet data (Twitter API v2 format)
function extractVideoUrl(tweetData) {
  const media = tweetData.includes?.media?.[0];
  if (media && media.type === 'video') {
    const variants = media.variants;
    // Select the variant with the highest bitrate (assuming mp4 format)
    const bestVariant = variants
      .filter(v => v.content_type === 'video/mp4')
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];
    return bestVariant.url;
  }
  return null;
}

// API endpoint to handle download requests
app.get('/download', async (req, res) => {
  const tweetUrl = req.query.url;

  // Extract tweet ID
  const tweetId = extractTweetId(tweetUrl);
  if (!tweetId) {
    return res.json({ error: 'Invalid tweet URL' });
  }

  try {
    const bearerToken = await getAppBearerToken();
    const tweetData = await getTweetData(tweetId, bearerToken);
    const videoUrl = extractVideoUrl(tweetData);

    if (videoUrl) {
      res.json({ videoUrl });
    } else {
      res.json({ error: 'No video found in the tweet' });
    }
  } catch (error) {
    console.error('Fetch Error:', error.message);
    res.json({ error: 'Error fetching video: ' + error.message });
  }
});

// Function to start the server with a fallback port
function startServer(port) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1); // Try the next port
    } else {
      console.error('Server error:', err);
    }
  });
}

// Start the server on port 3000, with automatic port increment if needed
startServer(3000);