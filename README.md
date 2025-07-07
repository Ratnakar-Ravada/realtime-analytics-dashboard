# 📊 Real-Time Analytics Dashboard with Websockets

Live Demo: [Real-time Analytics Dashboard](https://realtime-analytics-dashboard.vercel.app/)  
Backend (WebSocket): wss://realtime-analytics-dashboard.up.railway.app

Detailed documentation with Flow digrams and Logical explainations can be found here: [Technical Documentation](https://drive.google.com/file/d/1MvpPS1gHhRPMeXJ3Y7UUoOrLXLpwY03F/view?usp=sharing)

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
  - Backend (WebSocket server) on [Railway](https://railway.app)

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

### 1. Backend (WebSocket Server) on Railway

> Note: Vercel doesn't support WebSocket (wss://), so we use Railway free tier which provides WebSocket support and Zero Downtime.

Go to [Railway](https://railway.app)

Log in with Github

Click "New Project" → "Deploy from GitHub Repo"

Select your repo

Set the root directory to `backend`

Set the build command as `npm install`

Railway auto-detects the start command as `npm start` from `package.json` file

Click "Deploy Project"

After deployment, go to the "Network" tab and generate a public domain:

```
https://ws-backend.up.railway.app
```

Use this domain as your production WebSocket URL.

---

### 🌐 Frontend on Vercel

1. Go to [Vercel](https://vercel.com)
2. Import the same GitHub repo
3. Choose:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
4. Add an **Environment Variable**:
   ```
   WS_URL=wss://ws-backend.up.railway.app
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
