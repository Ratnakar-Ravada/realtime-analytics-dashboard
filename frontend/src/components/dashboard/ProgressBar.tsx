
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  title: string;
  value: number;
  className?: string;
  isLoading?: boolean;
}

export const ProgressBar = ({
  title,
  value,
  className,
  isLoading = false
}: ProgressBarProps) => {
  // Determine color based on value
  const getColor = () => {
    // if (value < 30) return 'text-blue-500';
    // if (value < 70) return 'text-green-500';
    return '#8b5cf6';
  };

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Timer className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 mx-auto bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <>
            <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={cn("absolute top-0 left-0 h-full transition-all duration-500")}
                style={{ width: `${value * 10}%`, backgroundColor: getColor() }}
              ></div>
            </div>
            <div className="mt-2 text-center text-2xl font-bold">
              {value.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">min</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
