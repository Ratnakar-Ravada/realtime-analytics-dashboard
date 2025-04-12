
import { AnalyticsData } from "@/types/analytics";

type WebSocketCallbacks = {
  onOpen?: () => void;
  onMessage?: (data: AnalyticsData) => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
};

export class WebSocketService {
  private socket: WebSocket | null = null;
  private callbacks: WebSocketCallbacks = {};
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      console.log('WebSocket is already connected or connecting');
      return;
    }

    console.log('Connecting to WebSocket...');
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      if (this.callbacks.onOpen) {
        this.callbacks.onOpen();
      }
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as AnalyticsData;
        if (this.callbacks.onMessage) {
          this.callbacks.onMessage(data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
      if (this.callbacks.onClose) {
        this.callbacks.onClose();
      }
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
    };
  }

  setCallbacks(callbacks: WebSocketCallbacks) {
    this.callbacks = callbacks;
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts += 1;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.log('Max reconnect attempts reached');
    }
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}

// // Mock WebSocket Server for local development
// export class MockWebSocketService {
//   private callbacks: WebSocketCallbacks = {};
//   private interval: NodeJS.Timeout | null = null;
//   private isConnected = false;

//   connect() {
//     if (this.isConnected) {
//       console.log('MockWebSocket is already connected');
//       return;
//     }

//     console.log('MockWebSocket connecting...');
    
//     // Simulate connection delay
//     setTimeout(() => {
//       this.isConnected = true;
//       console.log('MockWebSocket connected');
      
//       if (this.callbacks.onOpen) {
//         this.callbacks.onOpen();
//       }
      
//       // Start generating mock data
//       this.startMockDataGeneration();
//     }, 500);
//   }

//   setCallbacks(callbacks: WebSocketCallbacks) {
//     this.callbacks = callbacks;
//   }

//   disconnect() {
//     this.isConnected = false;
//     if (this.interval) {
//       clearInterval(this.interval);
//       this.interval = null;
//     }
    
//     if (this.callbacks.onClose) {
//       this.callbacks.onClose();
//     }
//   }

//   private startMockDataGeneration() {
//     const initialActiveUsers = Math.floor(Math.random() * 50) + 50; // 50-100
//     const initialPageViews = Math.floor(Math.random() * 100) + 100; // 100-200
//     const initialAvgDuration = Math.random() * 3 + 2; // 2-5 minutes
    
//     let activeUsers = initialActiveUsers;
//     let pageViews = initialPageViews;
//     let avgSessionDuration = initialAvgDuration;
    
//     this.interval = setInterval(() => {
//       if (!this.isConnected) return;
      
//       // Simulate data fluctuations with realistic trends
//       activeUsers = Math.max(10, Math.min(200, 
//         activeUsers + (Math.random() * 10 - 5))); // -5 to +5 change
      
//       pageViews = Math.max(20, Math.min(300, 
//         pageViews + (Math.random() * 20 - 8))); // -8 to +12 change
      
//       avgSessionDuration = Math.max(0.5, Math.min(10, 
//         avgSessionDuration + (Math.random() * 0.6 - 0.3))); // -0.3 to +0.3 change
      
//       const mockData: AnalyticsData = {
//         timestamp: new Date().toISOString(),
//         active_users: Math.round(activeUsers),
//         page_views: Math.round(pageViews),
//         avg_session_duration: Number(avgSessionDuration.toFixed(1))
//       };
      
//       if (this.callbacks.onMessage) {
//         this.callbacks.onMessage(mockData);
//       }
//     }, 2000); // Send data every 2 seconds
//   }

//   isConnected(): boolean {
//     return this.isConnected;
//   }
// }

// Choose the appropriate service based on environment
export const createWebSocketService = () => {
  // For local development, use the mock service
  return new WebSocketService('https://realtime-analytics-dashboard-ws.onrender.com');
  
  // For production with actual WebSocket server:
  // return new WebSocketService('wss://your-websocket-server.com/analytics');
};
