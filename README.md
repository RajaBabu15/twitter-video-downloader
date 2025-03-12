# Twitter/X Video Downloader

Welcome to the **Twitter/X Video Downloader**, a simple web application that allows you to download videos from tweets on X (formerly Twitter). This project uses Node.js, Express, and the Twitter/X API to fetch and provide downloadable video links from tweet URLs.

---

## ✨ Features

- **Download Videos:** Extract videos from tweets on X (e.g., `https://x.com/username/status/1234567890`).
- **URL Flexibility:** Supports both `twitter.com` and `x.com` URL formats.
- **Secure API Credential Management:** Uses environment variables to manage API keys and tokens.
- **User-Friendly Interface:** A clean, minimal interface with a single input field and download button.
- **Robust Error Handling:** Provides clear error messages for invalid URLs, tweets without videos, and API issues.

---

## 🛠 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v14 or higher recommended) – [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- An **X (Twitter) Developer Account** to obtain API credentials (API Key, API Secret, and Bearer Token) – [X Developer Portal](https://developer.twitter.com/)

---

## 🚀 Installation and Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/RajaBabu15/twitter-video-downloader.git
cd twitter-video-downloader
```

> **Note:** Replace `RajaBabu15` with your actual GitHub username.

### 2. Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

### 3. Obtain X API Credentials

To use the Twitter/X API, register an app on the X Developer Portal:

- Visit [X Developer Portal](https://developer.twitter.com/en/portal).
- Create a new app and obtain your **API_KEY**, **API_SECRET**, and generate a **BEARER_TOKEN**.
- Ensure your app has read access to tweets and media.

### 4. Create a `.env` File

In the root directory, create a file named `.env` and add your API credentials:

```plaintext
API_KEY=your_actual_x_api_key_here
API_SECRET=your_actual_x_api_secret_here
BEARER_TOKEN=your_actual_bearer_token_here
```

> **Warning:** Do not commit the `.env` file to version control. Add it to your `.gitignore` file.

### 5. Start the Server

Run the Node.js server with:

```bash
node server.js
```

The server will start on port `3000` (or the next available port) and log:

```
Server running on http://localhost:3000
```

### 6. Access the Application

Open your web browser and navigate to: [http://localhost:3000](http://localhost:3000)

---

## 🎯 Usage

1. **Paste a Tweet URL:**  
   Enter a tweet URL from X (e.g., `https://x.com/<handle>/status/123456789012345`) into the input field.
2. **Click "Download":**  
   Click the **Download** button to initiate the process.
3. **Download Video:**  
   If the tweet contains a video, a "Download Video" link will appear. Click the link to download the video.
4. **Error Handling:**  
   If there’s an error (e.g., invalid URL, tweet without video, or API issues), an appropriate error message will be displayed.

---

## 📸 Screenshots

Here's a glimpse of the application interface:

![Twitter/X Video Downloader Interface](https://via.placeholder.com/800x400.png?text=Twitter%2FX+Video+Downloader+Interface)

> Replace the placeholder image URL with an actual screenshot of your app.

---

## 🗂 Project Structure

```
twitter-video-downloader/
├── public/
│   ├── index.html        # Frontend HTML
│   ├── style.css         # CSS styling
│   └── script.js         # Frontend JavaScript logic
├── server.js             # Node.js/Express backend
├── package.json          # Project configuration and dependencies
└── .env                  # Environment variables (not committed to version control)
```

---

## 🔧 Dependencies

| Dependency | Version | Purpose                                  |
|------------|---------|------------------------------------------|
| express    | ^4.18   | Web framework for Node.js                |
| axios      | ^1.6    | HTTP client for API requests             |
| dotenv     | ^16.3   | Loads environment variables from .env    |

Install them via:

```bash
npm install
```

---

## ⚠️ Limitations and Notes

- **API Access:** Requires a paid X API plan (e.g., Basic or higher) for full access to tweet media. Free/Essential tiers may not support all endpoints.
- **Legal Compliance:** Ensure your usage complies with X’s Terms of Service and respects copyright and privacy laws.
- **Rate Limits:** Be mindful of X API rate limits; heavy usage might require caching or throttling.
- **Video URL Expiration:** Video URLs provided by X may expire after some time.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

- Fork this repository.
- Create a new branch for your feature or bugfix.
- Commit your changes and submit a pull request.

For major changes, please open an issue first to discuss your ideas.

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **Author:** Your Name
- **Email:** [rajababu8520456@gmail.com](mailto:rajababu8520456.com)
- **GitHub:** [github.com/RajaBabu15](https://github.com/RajaBabu15)
