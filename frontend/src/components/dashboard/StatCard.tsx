
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  description?: string;
  className?: string;
  isLoading?: boolean;
}

export const StatCard = ({
  title,
  value,
  trend = 'neutral',
  icon,
  description,
  className,
  isLoading = false
}: StatCardProps) => {
  const renderTrendIcon = () => {
    switch(trend) {
      case 'up':
        return <ArrowUp className="text-green-500" size={16} />;
      case 'down':
        return <ArrowDown className="text-red-500" size={16} />;
      default:
        return <ArrowRight className="text-gray-400" size={16} />;
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-md"></div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center">{renderTrendIcon()}</div>
          </div>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};
