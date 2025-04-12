
import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  isConnected: boolean;
  className?: string;
}

export const ConnectionStatus = ({ isConnected, className }: ConnectionStatusProps) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn(
        "w-2 h-2 rounded-full",
        isConnected ? "bg-green-500 animate-pulse-subtle" : "bg-red-500"
      )}></div>
      <p className="text-xs text-muted-foreground">
        {isConnected ? "Connected" : "Disconnected"}
      </p>
    </div>
  );
};
