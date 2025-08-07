import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface IndicatorData {
  date: string;
  price: number;
  sma20: number;
  sma50: number;
  ema12: number;
  ema26: number;
  rsi: number;
  macd: number;
  signal: number;
}

const mockIndicatorData: IndicatorData[] = [
  { date: "Jan 1", price: 150, sma20: 148, sma50: 145, ema12: 149, ema26: 147, rsi: 55, macd: 1.2, signal: 1.0 },
  { date: "Jan 2", price: 153, sma20: 149, sma50: 146, ema12: 151, ema26: 148, rsi: 62, macd: 1.5, signal: 1.2 },
  { date: "Jan 3", price: 157, sma20: 151, sma50: 147, ema12: 154, ema26: 150, rsi: 68, macd: 1.8, signal: 1.4 },
  { date: "Jan 4", price: 160, sma20: 153, sma50: 148, ema12: 157, ema26: 152, rsi: 72, macd: 2.1, signal: 1.6 },
  { date: "Jan 5", price: 163, sma20: 155, sma50: 150, ema12: 160, ema26: 154, rsi: 75, macd: 2.3, signal: 1.8 },
  { date: "Jan 6", price: 165, sma20: 157, sma50: 152, ema12: 162, ema26: 156, rsi: 78, macd: 2.4, signal: 2.0 },
  { date: "Jan 7", price: 166, sma20: 159, sma50: 154, ema12: 164, ema26: 158, rsi: 76, macd: 2.2, signal: 2.1 },
];

export const TechnicalIndicators = () => {
  const latestData = mockIndicatorData[mockIndicatorData.length - 1];
  
  const getRSISignal = (rsi: number) => {
    if (rsi > 70) return { signal: "Overbought", color: "text-bearish", variant: "destructive" as const };
    if (rsi < 30) return { signal: "Oversold", color: "text-bullish", variant: "default" as const };
    return { signal: "Neutral", color: "text-muted-foreground", variant: "secondary" as const };
  };

  const getMACDSignal = (macd: number, signal: number) => {
    const diff = macd - signal;
    if (diff > 0) return { signal: "Bullish", color: "text-bullish", icon: TrendingUp };
    if (diff < 0) return { signal: "Bearish", color: "text-bearish", icon: TrendingDown };
    return { signal: "Neutral", color: "text-muted-foreground", icon: Activity };
  };

  const rsiSignal = getRSISignal(latestData.rsi);
  const macdSignal = getMACDSignal(latestData.macd, latestData.signal);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-trading-panel border border-trading-border p-3 rounded-lg shadow-trading">
          <p className="text-sm font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Technical Indicators Summary */}
      <Card className="bg-trading-panel border-trading-border shadow-trading">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-chart-1" />
            Technical Indicators - AAPL
          </CardTitle>
          <CardDescription>
            Real-time technical analysis signals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">RSI (14)</div>
              <div className="text-2xl font-bold">{latestData.rsi.toFixed(1)}</div>
              <Badge variant={rsiSignal.variant} className="text-xs">
                {rsiSignal.signal}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">MACD</div>
              <div className="text-2xl font-bold">{latestData.macd.toFixed(2)}</div>
              <Badge variant={macdSignal.signal === "Bullish" ? "default" : "destructive"} className="text-xs">
                <macdSignal.icon className="w-3 h-3 mr-1" />
                {macdSignal.signal}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">SMA (20)</div>
              <div className="text-2xl font-bold">${latestData.sma20.toFixed(2)}</div>
              <div className={`text-xs ${latestData.price > latestData.sma20 ? 'text-bullish' : 'text-bearish'}`}>
                {latestData.price > latestData.sma20 ? 'Above' : 'Below'} SMA
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">EMA (12)</div>
              <div className="text-2xl font-bold">${latestData.ema12.toFixed(2)}</div>
              <div className={`text-xs ${latestData.price > latestData.ema12 ? 'text-bullish' : 'text-bearish'}`}>
                {latestData.price > latestData.ema12 ? 'Above' : 'Below'} EMA
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moving Averages Chart */}
      <Card className="bg-trading-panel border-trading-border shadow-trading">
        <CardHeader>
          <CardTitle>Moving Averages</CardTitle>
          <CardDescription>Price action with SMA and EMA overlays</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockIndicatorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--trading-border))" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={3}
                  dot={false}
                  name="Price"
                />
                <Line
                  type="monotone"
                  dataKey="sma20"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="SMA 20"
                />
                <Line
                  type="monotone"
                  dataKey="ema12"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  name="EMA 12"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* RSI Chart */}
      <Card className="bg-trading-panel border-trading-border shadow-trading">
        <CardHeader>
          <CardTitle>RSI (Relative Strength Index)</CardTitle>
          <CardDescription>Momentum oscillator (0-100)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockIndicatorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--trading-border))" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={70} stroke="hsl(var(--bearish))" strokeDasharray="3 3" />
                <ReferenceLine y={30} stroke="hsl(var(--bullish))" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="rsi"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={false}
                  name="RSI"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};