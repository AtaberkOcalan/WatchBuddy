# WatchBuddy - vB-0.1

WatchBuddy is a **Chrome extension** that enables users to watch videos stored on **Google Drive** in sync with their friends. With real-time video control and instant chat, it ensures a seamless and interactive viewing experience.

---

## 🚀 Features

### 🔹 Synchronized Video Playback
- Play, pause, and seek videos in real time with your friends.
- Smooth synchronization powered by **Firebase Firestore**.

### 🔹 Real-Time Chat
- **WebRTC-based** instant messaging for lag-free communication.
- Peer-to-peer connection to minimize server dependency and ensure fast message delivery.

### 🔹 Secure Authentication
- **Google OAuth** integration for a quick and secure login process.

### 🔹 Google Drive API Support
- Stream videos directly from **Google Drive**, eliminating the need for external hosting.

### 🔹 Efficient Data Handling
- Firestore ensures low-latency updates for a smooth viewing experience.
- PeerJS is used to handle WebRTC connections efficiently (hidden from public repository for security).
- A dedicated **utils folder** (hidden from the repository) manages utility functions and configurations.

---

## 🛠️ Technologies Used
- **Vue 3 + Vite + Pinia** for a reactive and high-performance UI.
- **Firebase Firestore & Authentication** for real-time data management and secure user authentication.
- **WebRTC & PeerJS** for direct peer-to-peer communication.
- **Google Drive API** for seamless video streaming.

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js (latest LTS recommended)
- Google Chrome
- Firebase Project Setup with Firestore and Authentication enabled
- Google Drive API enabled in your Google Cloud Console

### Installation Steps
```sh
# Clone the repository
git clone https://github.com/yourusername/watchbuddy.git
cd watchbuddy

# Install dependencies
npm install

# Run the development server
npm run dev
```

### Load the Extension into Chrome
1. Open **chrome://extensions/** in Google Chrome.
2. Enable **Developer mode** (toggle in the top right corner).
3. Click **Load unpacked** and select the `dist` folder from the project.

---

## 📌 Roadmap & Future Plans
- **Improved UI/UX**: Enhancements in user interface for a better experience.
- **Support for YouTube Videos**: Expanding beyond Google Drive to support synchronized YouTube playback.
- **Emoji Reactions in Chat**: Real-time emoji responses for more engaging communication.
- **Customizable Rooms**: Allowing users to set passwords and manage participants.

---

## 💡 Contributing
Contributions, feedback, and pull requests are welcome! If you find a bug or have a feature request, feel free to open an issue.

---

🚀 **WatchBuddy - Bringing People Together Through Synchronized Video Watching!** 🎬✨