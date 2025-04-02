# WatchBuddy - vB-0.1

WatchBuddy is a **Chrome extension** that allows you to watch videos from **Google Drive** in sync with your friends. It offers a seamless and interactive viewing experience with real-time video controls and live chat features.

---

## 🚀 Features

### 🔹 Synchronized Video Playback
- Play, pause, and seek videos in sync with your friends.
- Seamless synchronization using **Firebase Firestore**.

### 🔹 Real-Time Chat
- Instant messaging powered by **WebRTC**, with minimal delay.
- **Peer-to-peer** connection to reduce server dependency.

### 🔹 Secure Authentication
- Quick and secure login with **Google OAuth** integration.

### 🔹 Google Drive API Support
- Watch videos directly from **Google Drive**, no need for external hosting.

### 🔹 Efficient Data Management
- Low-latency updates with Firestore.
- **PeerJS** is used to manage WebRTC connections (hidden in the repository for security reasons).
- A dedicated **utils folder** for helper functions and configurations (also hidden).
- **Imgur API** integration for image hosting (also included in the utils folder for free use).

---

## 🛠️ Technologies Used
- **Vue 3 + Vite + Pinia** for a reactive and high-performance interface.
- **Firebase Firestore & Authentication** for real-time data management and secure authentication.
- **WebRTC & PeerJS** for peer-to-peer communication.
- **Google Drive API** for uninterrupted video streaming.
- **Imgur API** for free image hosting.

---

## 🔧 Installation & Setup

### Requirements
- Node.js (latest LTS version recommended)
- Google Chrome
- A Firebase project with Firestore and Authentication enabled
- Google Drive API enabled on Google Cloud Console

### Setup Instructions
```sh
# Clone the repository
git clone https://github.com/AtaberkOcalan/watchbuddy.git
cd watchbuddy

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Loading the Extension in Chrome
1. Open **chrome://extensions/** in Google Chrome.
2. Enable **Developer mode** (toggle switch at the top right).
3. Click on **Load unpacked** and select the `dist` folder in your project directory.

---

## 📌 Roadmap & Future Plans
- **Chrome Web Store Release**: Once completed, the extension will be available for everyone on the **Chrome Web Store**.
- **Improved UI/UX**: Enhancements to the user interface for a better experience.
- **YouTube Support**: Adding synchronized watching support for YouTube videos alongside Google Drive.
- **Emoji Reactions in Chat**: Adding real-time emoji reactions for more interactive communication.
- **Customizable Rooms**: Allowing users to manage participants and set room passwords.

---

## 🆓 Free Usage & Storage
WatchBuddy is a **non-profit**, **completely free** project!
- There are no **fees** or **subscriptions** required.
- **Google Drive** and **Firebase's free Firestore and Authentication plans** are used to handle video storage and data management without any additional cost.
- **Imgur API** is also utilized for free image hosting within the project.
- The project is open for anyone to **freely contribute and develop**.

---

## 💡 Contributing
Feedback, contributions, and pull requests are always welcome! If you find a bug or have a feature suggestion, feel free to open an **issue**.

---

🚀 **WatchBuddy - The Synchronized Video Watching Experience that Brings People Closer!** 🎬✨