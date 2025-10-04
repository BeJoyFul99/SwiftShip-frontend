import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  delta: number;
  deltaLabel?: string;
}

export default function StatCard({
  title,
  value,
  delta,
  deltaLabel,
}: StatCardProps) {
  const isPositive = delta > 0;
  const isNeutral = delta === 0;

  return (
    <Card className="panel blur-bg text-foreground border-border min-w-[200px] w-full">
      <CardHeader className="pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <Badge
            variant={
              isNeutral ? "secondary" : isPositive ? "default" : "destructive"
            }
            className={`flex items-center gap-1 ${
              isPositive
                ? "bg-success/20 text-success hover:bg-success/30"
                : isNeutral
                ? "bg-muted text-muted-foreground"
                : "bg-destructive/20 text-destructive hover:bg-destructive/30"
            }`}
          >
            {isNeutral ? (
              <Minus className="h-3 w-3" />
            ) : isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(delta)}%
          </Badge>
        </div>
        {deltaLabel && (
          <p className="text-xs text-muted-foreground mt-1">{deltaLabel}</p>
        )}
      </CardContent>
    </Card>
  );
}
