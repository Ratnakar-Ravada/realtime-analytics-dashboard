
export interface AnalyticsData {
  timestamp: string;
  active_users: number;
  page_views: number;
  avg_session_duration: number;
}

export interface HistoricalData {
  labels: string[];
  pageViews: number[];
  activeUsers: number[];
  avgSessionDurations: number[];
}
