# 🚗 Real-Time Vehicle Tracker

A **real-time location tracking web application** built with Node.js, Socket.IO, and Leaflet.js. Multiple users can share their live GPS location simultaneously, and every connected client sees all markers update on a shared interactive map — instantly, with no page refresh.

---

## 🌐 Live Demo

> Clone and run locally (see [Getting Started](#-getting-started)).

---

## ✨ Features

- 📍 **Real-time GPS tracking** using the browser's native Geolocation API
- ⚡ **Instant updates** via WebSocket (Socket.IO) — no polling, no delay
- 🗺️ **Interactive map** powered by [Leaflet.js](https://leafletjs.com/) + OpenStreetMap tiles
- 👥 **Multi-user support** — every connected device gets its own numbered marker
- 🗑️ **Auto-removal** of markers when a user disconnects
- 📌 **Custom icons** for static points of interest (Home, Office)
- 🖥️ Lightweight server-side rendering with **EJS templates**

---

## 🛠️ Tech Stack

| Layer      | Technology                         |
|------------|-------------------------------------|
| Runtime    | Node.js                             |
| Framework  | Express.js                          |
| Real-time  | Socket.IO (v4.7.5)                  |
| Templating | EJS                                 |
| Maps       | Leaflet.js (v1.9.4) + OpenStreetMap |
| Frontend   | Vanilla JavaScript, HTML5, CSS3     |

---

## 📁 Project Structure

```
Real_time_vehicle_tracker/
├── app.js                   # Express + Socket.IO server
├── package.json             # Dependencies and start script
├── views/
│   └── index.ejs            # Main HTML template (map UI)
└── public/
    ├── css/
    │   └── stylesheet.css   # Full-screen map styling
    ├── js/
    │   └── script.js        # Client-side: geolocation + Leaflet logic
    └── icons/
        ├── metro.png        # Custom marker icon (Home)
        └── office.png       # Custom marker icon (Office)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes bundled with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/Real_time_vehicle_tracker.git

# 2. Navigate into the project folder
cd Real_time_vehicle_tracker

# 3. Install dependencies
npm install

# 4. Start the server
npm start
```

### Open the app

Open your browser and go to:

```
http://localhost:3000
```

> 💡 **Tip:** Open the same URL on **multiple browser tabs or devices on the same network** to see all markers appear and move in real-time.

---

## ⚙️ How It Works

```
Browser A (phone/tab)           Server (Node.js)         Browser B (laptop)
      |                               |                          |
      |-- send-location (lat, lng) -->|                          |
      |                               |-- receive-location ----> |
      |                               |   (id, lat, lng, #)      |
      |                               |                          |
      |                               |<-- send-location --------|
      |<-- receive-location ----------|                          |
```

1. Each client watches its GPS position using `navigator.geolocation.watchPosition`.
2. Whenever the position changes, the client emits a `send-location` event over a WebSocket.
3. The server re-broadcasts the event to **all** connected clients as `receive-location`.
4. Each client updates or creates the corresponding Leaflet marker on the map.
5. On disconnect, the server broadcasts `user-disconnected` so clients can remove the stale marker.

---

## 📦 Dependencies

| Package     | Version   | Purpose                            |
|-------------|-----------|-------------------------------------|
| express     | ^4.19.2   | HTTP server and routing             |
| socket.io   | ^4.7.5    | Real-time bidirectional events      |
| ejs         | ^3.1.10   | Server-side HTML templating         |

---

## 🔮 Possible Improvements

- [ ] Add a database (e.g., MongoDB) to persist location history
- [ ] User authentication — login before tracking begins
- [ ] Route polyline drawing to show the path a device has travelled
- [ ] Custom marker labels / device names  
- [ ] HTTPS + production deployment (e.g., Railway, Render, or Heroku)

---

## 👨‍💻 Author

**Pankaj**  
Feel free to connect on [LinkedIn](https://linkedin.com) or check out my other projects on [GitHub](https://github.com).

---

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).
