
import { useState, useEffect, useCallback, useRef } from "react";
import { AnalyticsData, HistoricalData } from "@/types/analytics";
import { createWebSocketService } from "@/services/websocket-service";
import { useToast } from "@/hooks/use-toast";

// Maximum number of data points to store in history
const MAX_HISTORY_LENGTH = 20;

// Format timestamp for display
const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false});
};

export const useAnalytics = () => {
  const [currentData, setCurrentData] = useState<AnalyticsData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    labels: [],
    pageViews: [],
    activeUsers: [],
    avgSessionDurations: []
  });
  
  const webSocketServiceRef = useRef(createWebSocketService());
  const { toast } = useToast();

  // Calculate trends based on the last two data points
  const trends = {
    activeUsers: calculateTrend(historicalData.activeUsers),
    pageViews: calculateTrend(historicalData.pageViews),
    avgSessionDuration: calculateTrend(historicalData.avgSessionDurations)
  };

  // Update historical data with new data point
  const updateHistoricalData = useCallback((data: AnalyticsData) => {
    setHistoricalData(prev => {
      // Format the timestamp for display
      const formattedTime = formatTimestamp(data.timestamp);
      
      // Add new data to arrays, limiting to MAX_HISTORY_LENGTH items
      const labels = [...prev.labels, formattedTime].slice(-MAX_HISTORY_LENGTH);
      const pageViews = [...prev.pageViews, data.page_views].slice(-MAX_HISTORY_LENGTH);
      const activeUsers = [...prev.activeUsers, data.active_users].slice(-MAX_HISTORY_LENGTH);
      const avgSessionDurations = [...prev.avgSessionDurations, data.avg_session_duration].slice(-MAX_HISTORY_LENGTH);
      
      return { labels, pageViews, activeUsers, avgSessionDurations };
    });
  }, []);

  // Handle new data from WebSocket
  const handleWebSocketMessage = useCallback((data: AnalyticsData) => {
    setCurrentData(data);
    updateHistoricalData(data);
    setIsLoading(false);
  }, [updateHistoricalData]);

  // Connect and setup WebSocket
  useEffect(() => {
    const webSocketService = webSocketServiceRef.current;
    
    webSocketService.setCallbacks({
      onOpen: () => {
        setIsConnected(true);
        toast({
          title: "Connection established",
          description: "Receiving real-time analytics data",
        });
      },
      onMessage: handleWebSocketMessage,
      onClose: () => {
        setIsConnected(false);
        toast({
          title: "Connection lost",
          description: "Attempting to reconnect...",
          variant: "destructive",
        });
      },
      onError: () => {
        setIsConnected(false);
        toast({
          title: "Connection error",
          description: "Unable to receive analytics data",
          variant: "destructive",
        });
      }
    });
    
    webSocketService.connect();
    
    return () => {
      webSocketService.disconnect();
    };
  }, [handleWebSocketMessage, toast]);

  return {
    currentData,
    historicalData,
    isConnected,
    isLoading,
    trends
  };
};

// Calculate trend (positive, negative, or neutral) based on recent data
function calculateTrend(data: number[]): 'up' | 'down' | 'neutral' {
  if (data.length < 2) return 'neutral';
  
  const current = data[data.length - 1];
  const previous = data[data.length - 2];
  
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'neutral';
}
