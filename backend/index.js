import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

console.log('WebSocket server is running on ws://localhost:3000');

function generateAnalyticsData() {
  const now = new Date().toISOString();
  const active_users = Math.floor(Math.random() * 100) + 1;
  const page_views = Math.floor(Math.random() * 200) + 1;
  const avg_session_duration = (Math.random() * 10).toFixed(1);

  return {
    timestamp: now,
    active_users,
    page_views,
    avg_session_duration: parseFloat(avg_session_duration),
  };
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  const sendData = () => {
    const data = generateAnalyticsData();
    ws.send(JSON.stringify(data));
  };

  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      sendData();
    }
  }, 5000); // send every 5seconds

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});
