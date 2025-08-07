import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Crown, Target } from "lucide-react";

interface StockMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

const topGainers: StockMover[] = [
  { symbol: "NVDA", name: "NVIDIA Corp", price: 875.12, change: 47.23, changePercent: 5.72, volume: "52.1M", marketCap: "2.1T" },
  { symbol: "TSLA", name: "Tesla Inc", price: 238.45, change: 18.67, changePercent: 8.49, volume: "89.3M", marketCap: "758B" },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 142.78, change: 8.92, changePercent: 6.67, volume: "45.7M", marketCap: "231B" },
  { symbol: "AAPL", name: "Apple Inc", price: 175.23, change: 7.34, changePercent: 4.37, volume: "67.2M", marketCap: "2.7T" },
  { symbol: "MSFT", name: "Microsoft Corp", price: 378.85, change: 12.45, changePercent: 3.40, volume: "28.9M", marketCap: "2.8T" },
];

const topLosers: StockMover[] = [
  { symbol: "META", name: "Meta Platforms", price: 298.42, change: -23.78, changePercent: -7.38, volume: "31.4M", marketCap: "753B" },
  { symbol: "NFLX", name: "Netflix Inc", price: 387.65, change: -18.92, changePercent: -4.65, volume: "12.8M", marketCap: "172B" },
  { symbol: "AMZN", name: "Amazon.com Inc", price: 145.78, change: -6.43, changePercent: -4.22, volume: "41.6M", marketCap: "1.5T" },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 142.56, change: -5.23, changePercent: -3.54, volume: "25.7M", marketCap: "1.8T" },
  { symbol: "CRM", name: "Salesforce Inc", price: 267.89, change: -7.82, changePercent: -2.84, volume: "8.3M", marketCap: "265B" },
];

const MoverCard = ({ stock, rank }: { stock: StockMover; rank: number }) => {
  const isGainer = stock.changePercent > 0;
  
  return (
    <div className="p-4 rounded-lg bg-gradient-trading border border-trading-border hover:shadow-neon transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            rank <= 3 ? 'bg-gradient-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            {rank}
          </div>
          <div>
            <div className="font-bold text-lg">{stock.symbol}</div>
            <div className="text-xs text-muted-foreground truncate max-w-32">{stock.name}</div>
          </div>
        </div>
        <Badge variant={isGainer ? "default" : "destructive"} className="text-xs">
          {isGainer ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${stock.price.toFixed(2)}</span>
          <div className={`text-right ${isGainer ? 'text-price-up' : 'text-price-down'}`}>
            <div className="font-semibold">
              {isGainer ? '+' : ''}${Math.abs(stock.change).toFixed(2)}
            </div>
            <div className="text-sm">
              ({isGainer ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Vol: {stock.volume}</span>
          <span>Cap: {stock.marketCap}</span>
        </div>
      </div>
    </div>
  );
};

export const TopMovers = () => {
  return (
    <Card className="bg-trading-panel border-trading-border shadow-trading">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-chart-1" />
          Top Market Movers
        </CardTitle>
        <CardDescription>
          Today's biggest gainers and losers in the market
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary border border-trading-border">
            <TabsTrigger value="gainers" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Top Losers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gainers" className="space-y-4 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-bullish" />
              <span className="font-semibold text-bullish">Today's Champions</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topGainers.map((stock, index) => (
                <MoverCard key={stock.symbol} stock={stock} rank={index + 1} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="losers" className="space-y-4 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-bearish" />
              <span className="font-semibold text-bearish">Today's Decliners</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topLosers.map((stock, index) => (
                <MoverCard key={stock.symbol} stock={stock} rank={index + 1} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};