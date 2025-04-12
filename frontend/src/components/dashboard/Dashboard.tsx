
import { useAnalytics } from "@/hooks/use-analytics";
import { StatCard } from "@/components/dashboard/StatCard";
import { PageViewsChart } from "@/components/dashboard/PageViewsChart";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { Users, BarChart2 } from "lucide-react";

export const Dashboard = () => {
  const { currentData, historicalData, isConnected, isLoading, trends } = useAnalytics();

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Website Traffic Dashboard</h1>
        <ConnectionStatus isConnected={isConnected} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Active Users"
          value={currentData?.active_users?.toString() || "0"}
          trend={trends.activeUsers}
          icon={<Users />}
          description="Users currently on the site"
          isLoading={isLoading}
        />
        <StatCard
          title="Page Views"
          value={currentData?.page_views?.toString() || "0"}
          trend={trends.pageViews}
          icon={<BarChart2 />}
          description="Total views in the last minute"
          isLoading={isLoading}
        />
        <ProgressBar
          title="Avg. Session Duration"
          value={currentData?.avg_session_duration || 0}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <PageViewsChart
          title="Page Views Over Time"
          data={{
            labels: historicalData.labels,
            values: historicalData.pageViews,
          }}
          isLoading={isLoading}
        />
      </div>
      
      <footer className="text-center text-xs text-muted-foreground mt-6">
        <p>Data updates in real-time via WebSocket connection</p>
      </footer>
    </div>
  );
};
