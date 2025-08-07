import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Line, Bar } from "recharts";
import { BarChart3 } from "lucide-react";

interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const mockCandlestickData: CandlestickData[] = [
  { date: "Jan 1", open: 150, high: 155, low: 148, close: 153, volume: 1200000 },
  { date: "Jan 2", open: 153, high: 158, low: 151, close: 156, volume: 1500000 },
  { date: "Jan 3", open: 156, high: 159, low: 154, close: 157, volume: 1100000 },
  { date: "Jan 4", open: 157, high: 162, low: 155, close: 160, volume: 1800000 },
  { date: "Jan 5", open: 160, high: 165, low: 159, close: 163, volume: 1600000 },
  { date: "Jan 6", open: 163, high: 167, low: 161, close: 165, volume: 1400000 },
  { date: "Jan 7", open: 165, high: 168, low: 163, close: 166, volume: 1300000 },
];

const CandlestickBar = (props: any) => {
  const { payload, x, y, width, height } = props;
  if (!payload) return null;
  
  const { open, close, high, low } = payload;
  const isUp = close > open;
  const color = isUp ? "hsl(var(--price-up))" : "hsl(var(--price-down))";
  
  const bodyHeight = Math.abs(close - open) * (height / (high - low));
  const bodyY = y + ((high - Math.max(open, close)) / (high - low)) * height;
  
  const wickTop = y + ((high - high) / (high - low)) * height;
  const wickBottom = y + ((high - low) / (high - low)) * height;
  
  return (
    <g>
      {/* Wick */}
      <line
        x1={x + width / 2}
        y1={wickTop}
        x2={x + width / 2}
        y2={wickBottom}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={x + width * 0.2}
        y={bodyY}
        width={width * 0.6}
        height={bodyHeight}
        fill={color}
        stroke={color}
        fillOpacity={isUp ? 0.8 : 1}
      />
    </g>
  );
};

export const CandlestickChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isUp = data.close > data.open;
      
      return (
        <div className="bg-trading-panel border border-trading-border p-3 rounded-lg shadow-trading">
          <p className="text-sm font-semibold mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Open:</span>
              <span>${data.open.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>High:</span>
              <span className="text-price-up">${data.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Low:</span>
              <span className="text-price-down">${data.low.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Close:</span>
              <span className={isUp ? "text-price-up" : "text-price-down"}>
                ${data.close.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Volume:</span>
              <span>{(data.volume / 1000000).toFixed(1)}M</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-trading-panel border-trading-border shadow-trading">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-chart-1" />
          Candlestick Chart - AAPL
        </CardTitle>
        <CardDescription>
          OHLCV data with volume analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mockCandlestickData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--trading-border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                yAxisId="price"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis 
                yAxisId="volume"
                orientation="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="volume"
                dataKey="volume" 
                fill="hsl(var(--chart-3))" 
                opacity={0.3}
                name="Volume"
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="close"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                name="Close Price"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};