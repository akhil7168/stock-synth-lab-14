import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3, TrendingUp, TrendingDown, Globe } from "lucide-react";

interface IndexData {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  icon: string;
  color: string;
}

interface ChartData {
  time: string;
  NIFTY: number;
  SENSEX: number;
  SP500: number;
  NASDAQ: number;
}

const indexData: IndexData[] = [
  {
    name: "NIFTY 50",
    symbol: "NIFTY",
    value: 19845.35,
    change: 127.45,
    changePercent: 0.65,
    icon: "🇮🇳",
    color: "hsl(var(--chart-1))"
  },
  {
    name: "BSE SENSEX",
    symbol: "SENSEX", 
    value: 66589.93,
    change: 298.67,
    changePercent: 0.45,
    icon: "🇮🇳",
    color: "hsl(var(--chart-2))"
  },
  {
    name: "S&P 500",
    symbol: "SP500",
    value: 4567.18,
    change: -23.42,
    changePercent: -0.51,
    icon: "🇺🇸",
    color: "hsl(var(--chart-3))"
  },
  {
    name: "NASDAQ",
    symbol: "NASDAQ",
    value: 14356.87,
    change: 45.23,
    changePercent: 0.32,
    icon: "🇺🇸",
    color: "hsl(var(--chart-4))"
  },
  {
    name: "FTSE 100",
    symbol: "FTSE",
    value: 7634.12,
    change: -12.78,
    changePercent: -0.17,
    icon: "🇬🇧",
    color: "hsl(var(--chart-5))"
  },
  {
    name: "DAX",
    symbol: "DAX",
    value: 15892.44,
    change: 67.89,
    changePercent: 0.43,
    icon: "🇩🇪",
    color: "hsl(var(--chart-1))"
  }
];

const chartData: ChartData[] = [
  { time: "9:00", NIFTY: 19720, SENSEX: 66291, SP500: 4590, NASDAQ: 14311 },
  { time: "10:00", NIFTY: 19735, SENSEX: 66320, SP500: 4585, NASDAQ: 14325 },
  { time: "11:00", NIFTY: 19750, SENSEX: 66350, SP500: 4580, NASDAQ: 14340 },
  { time: "12:00", NIFTY: 19780, SENSEX: 66400, SP500: 4575, NASDAQ: 14355 },
  { time: "13:00", NIFTY: 19810, SENSEX: 66450, SP500: 4570, NASDAQ: 14370 },
  { time: "14:00", NIFTY: 19830, SENSEX: 66520, SP500: 4567, NASDAQ: 14357 },
  { time: "15:00", NIFTY: 19845, SENSEX: 66590, SP500: 4567, NASDAQ: 14357 },
];

export const IndexPerformance = () => {
  const getPriceColor = (change: number) => {
    if (change > 0) return "text-price-up";
    if (change < 0) return "text-price-down";
    return "text-price-neutral";
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-trading-panel border border-trading-border p-3 rounded-lg shadow-trading">
          <p className="text-sm font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Index Overview Cards */}
      <Card className="bg-trading-panel border-trading-border shadow-trading">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-chart-1" />
            Global Index Performance
          </CardTitle>
          <CardDescription>
            Real-time performance of major stock indices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {indexData.map((index) => (
              <div
                key={index.symbol}
                className="p-4 rounded-lg bg-gradient-trading border border-trading-border hover:shadow-neon transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{index.icon}</span>
                    <div>
                      <div className="font-bold text-lg">{index.symbol}</div>
                      <div className="text-xs text-muted-foreground">{index.name}</div>
                    </div>
                  </div>
                  <Badge variant={index.change >= 0 ? "default" : "destructive"} className="text-xs">
                    {getTrendIcon(index.change)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {index.value.toLocaleString()}
                  </div>
                  <div className={`flex items-center gap-1 ${getPriceColor(index.change)}`}>
                    {getTrendIcon(index.change)}
                    <span className="font-semibold">
                      {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                    </span>
                    <span className="text-sm">
                      ({index.change >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Index Performance Chart */}
      <Card className="bg-trading-panel border-trading-border shadow-trading">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-chart-1" />
            Intraday Performance
          </CardTitle>
          <CardDescription>
            Today's trading session performance comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--trading-border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="NIFTY"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  name="NIFTY 50"
                />
                <Line
                  type="monotone"
                  dataKey="SENSEX"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  name="SENSEX"
                />
                <Line
                  type="monotone"
                  dataKey="SP500"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                  name="S&P 500"
                />
                <Line
                  type="monotone"
                  dataKey="NASDAQ"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={false}
                  name="NASDAQ"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Regional Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-bullish border-trading-border shadow-trading">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-primary-foreground/80">Asian Markets</div>
                <div className="text-2xl font-bold text-primary-foreground">+0.55%</div>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-bearish border-trading-border shadow-trading">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-primary-foreground/80">US Markets</div>
                <div className="text-2xl font-bold text-primary-foreground">-0.09%</div>
              </div>
              <TrendingDown className="w-8 h-8 text-primary-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-bullish border-trading-border shadow-trading">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-primary-foreground/80">European Markets</div>
                <div className="text-2xl font-bold text-primary-foreground">+0.13%</div>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};