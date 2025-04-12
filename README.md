# 📊 Real-Time Analytics Dashboard

Live Demo: [https://realtime-analytics-dashboard.vercel.app/](https://realtime-analytics-dashboard.vercel.app/)  
Backend (WebSocket): [https://realtime-analytics-dashboard-ws.onrender.com](https://realtime-analytics-dashboard-ws.onrender.com)

A **real-time analytics dashboard** that monitors key website traffic metrics with sleek visualizations and live updates using WebSockets.

---

## 🚀 Key Features

- 👥 **Active Users**
- 📈 **Page Views**
- ⏱️ **Average Session Duration**

### 🧹 Tech Stack

- **Frontend**: React + Vite, Recharts (for charting), TailwindCSS (for styling), Shadcn UI (for components)
- **Backend**: Node.js with `ws` for WebSocket communication
- **Hosting**:  
  - Frontend on [Vercel](https://vercel.com)  
  - Backend (WebSocket server) on [Render](https://render.com)

---

## 💻 UI Components

- 📈 **Line Chart** for Page Views over time
- 🧾 **Cards** displaying Active Users and Page Views in the last minute
- 📉 **Progress Bar** for Average Session Duration
- ⚡ **Real-time UI updates** every 5 seconds with smooth transitions

---

## 🧪 Mock API (WebSocket)

Simulates dynamic traffic data with random values like:

```json
{
  "timestamp": "2025-04-11T12:01:00Z",
  "active_users": 87,
  "page_views": 152,
  "avg_session_duration": 4.6
}
```

- WebSocket-based streaming
- No need to manually reload the page
- Automatically pushes new data to the frontend every 5 seconds

---

## 🛠️To Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Ratnakar-Ravada/realtime-analytics-dashboard.git
cd realtime-analytics-dashboard
```

### 2. Start Backend (WebSocket Server)

```bash
cd backend
npm install
npm run dev
```

Runs on: `ws://localhost:3000`

### 3. Start Frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:5137`

> Create a `.env` file in the `frontend` directory:

```
WS_URL=ws://localhost:3000
```

Open the frontend in any browser and you should see live mock data being pushed from the WebSocket backend.

---

## 🚀 Deployment Instructions

### 1. Backend (WebSocket Server) on Render

> Note: Vercel doesn't support WebSocket (wss://), so we use Render.

1. Go to [Render](https://render.com)
2. Log in (GitHub login recommended)
3. Click **"New" → "Web Service"**
4. Connect your GitHub repo
5. Fill the form:
   - **Name**: `ws-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free or Starter
6. Click **"Create Web Service"**

Render will assign a public WebSocket URL like:

```
wss://ws-backend.onrender.com
```

---

### 🌐 Frontend on Vercel

1. Go to [Vercel](https://vercel.com)
2. Import the same GitHub repo
3. Choose:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
4. Add an **Environment Variable**:
   ```
   WS_URL=wss://ws-backend.onrender.com
   ```
5. Deploy 🚀

---

## ❗ Assumptions, Limitations & Improvements

### Assumptions
- Mock data is used to simulate traffic, not from a real source
- WebSocket server is stateless with no persistence

### Limitations
- No authentication/security on WebSocket endpoints
- No data persistence or historical analytics

### Future Improvements
- Add user/device filtering options
- Implement authentication (e.g., JWT or OAuth) to secure WebSocket connections
- Real traffic source integration.

---

## 📬 Feedback & Contributions

Feel free to open an issue or submit a PR if you'd like to contribute. All feedback is welcome!

---