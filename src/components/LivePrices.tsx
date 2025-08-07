import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

const mockStocks: StockPrice[] = [
  { symbol: "AAPL", price: 175.23, change: 2.34, changePercent: 1.35, volume: "45.2M" },
  { symbol: "MSFT", price: 378.85, change: -1.23, changePercent: -0.32, volume: "28.7M" },
  { symbol: "GOOGL", price: 142.56, change: 0.89, changePercent: 0.63, volume: "22.1M" },
  { symbol: "TSLA", price: 238.45, change: -5.67, changePercent: -2.32, volume: "67.8M" },
  { symbol: "AMZN", price: 145.78, change: 3.21, changePercent: 2.25, volume: "31.5M" },
  { symbol: "NVDA", price: 875.12, change: 12.34, changePercent: 1.43, volume: "41.2M" },
];

export const LivePrices = () => {
  const getPriceColor = (change: number) => {
    if (change > 0) return "text-price-up";
    if (change < 0) return "text-price-down";
    return "text-price-neutral";
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getBadgeVariant = (change: number) => {
    if (change > 0) return "default";
    if (change < 0) return "destructive";
    return "secondary";
  };

  return (
    <Card className="bg-trading-panel border-trading-border shadow-trading">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          Live Stock Prices (Delayed 15min)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="p-4 rounded-lg bg-gradient-trading border border-trading-border hover:shadow-neon transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg">{stock.symbol}</span>
                <Badge variant={getBadgeVariant(stock.change)} className="text-xs">
                  {getTrendIcon(stock.change)}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
                <div className={`flex items-center gap-1 text-sm ${getPriceColor(stock.change)}`}>
                  {getTrendIcon(stock.change)}
                  <span>${Math.abs(stock.change).toFixed(2)}</span>
                  <span>({stock.changePercent.toFixed(2)}%)</span>
                </div>
                <div className="text-xs text-muted-foreground">Vol: {stock.volume}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};