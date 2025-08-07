import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Plus, X, GitCompare } from "lucide-react";

interface ComparisonStock {
  symbol: string;
  name: string;
  color: string;
}

interface ComparisonData {
  date: string;
  [key: string]: number | string;
}

const mockComparisonData: ComparisonData[] = [
  { date: "Jan 1", AAPL: 150, MSFT: 370, GOOGL: 140, TSLA: 240 },
  { date: "Jan 2", AAPL: 153, MSFT: 375, GOOGL: 142, TSLA: 235 },
  { date: "Jan 3", AAPL: 157, MSFT: 380, GOOGL: 145, TSLA: 245 },
  { date: "Jan 4", AAPL: 160, MSFT: 378, GOOGL: 143, TSLA: 238 },
  { date: "Jan 5", AAPL: 163, MSFT: 385, GOOGL: 147, TSLA: 250 },
  { date: "Jan 6", AAPL: 165, MSFT: 390, GOOGL: 149, TSLA: 255 },
  { date: "Jan 7", AAPL: 166, MSFT: 388, GOOGL: 148, TSLA: 252 },
];

const availableStocks = [
  { symbol: "AAPL", name: "Apple Inc.", color: "hsl(var(--chart-1))" },
  { symbol: "MSFT", name: "Microsoft Corp.", color: "hsl(var(--chart-2))" },
  { symbol: "GOOGL", name: "Alphabet Inc.", color: "hsl(var(--chart-3))" },
  { symbol: "TSLA", name: "Tesla Inc.", color: "hsl(var(--chart-4))" },
  { symbol: "AMZN", name: "Amazon.com Inc.", color: "hsl(var(--chart-5))" },
  { symbol: "NVDA", name: "NVIDIA Corp.", color: "hsl(var(--chart-1))" },
];

export const StockComparison = () => {
  const [selectedStocks, setSelectedStocks] = useState<ComparisonStock[]>([
    { symbol: "AAPL", name: "Apple Inc.", color: "hsl(var(--chart-1))" },
    { symbol: "MSFT", name: "Microsoft Corp.", color: "hsl(var(--chart-2))" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const addStock = (stock: ComparisonStock) => {
    if (selectedStocks.length < 5 && !selectedStocks.find(s => s.symbol === stock.symbol)) {
      setSelectedStocks([...selectedStocks, stock]);
      setSearchTerm("");
    }
  };

  const removeStock = (symbol: string) => {
    setSelectedStocks(selectedStocks.filter(s => s.symbol !== symbol));
  };

  const filteredStocks = availableStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(stock => !selectedStocks.find(s => s.symbol === stock.symbol));

  const getPerformance = (symbol: string) => {
    const firstValue = mockComparisonData[0][symbol] as number;
    const lastValue = mockComparisonData[mockComparisonData.length - 1][symbol] as number;
    const change = ((lastValue - firstValue) / firstValue) * 100;
    return change;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-trading-panel border border-trading-border p-3 rounded-lg shadow-trading">
          <p className="text-sm font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: ${entry.value?.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-trading-panel border-trading-border shadow-trading">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-chart-1" />
          Stock Comparison
        </CardTitle>
        <CardDescription>
          Compare performance of multiple stocks side by side
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stock Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search stocks to add..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Search Results */}
          {searchTerm && filteredStocks.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredStocks.slice(0, 4).map((stock) => (
                <Button
                  key={stock.symbol}
                  variant="outline"
                  className="justify-start"
                  onClick={() => addStock(stock)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {stock.symbol} - {stock.name}
                </Button>
              ))}
            </div>
          )}

          {/* Selected Stocks */}
          <div className="flex flex-wrap gap-2">
            {selectedStocks.map((stock) => {
              const performance = getPerformance(stock.symbol);
              return (
                <Badge
                  key={stock.symbol}
                  variant="outline"
                  className="flex items-center gap-2 p-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stock.color }}
                  ></div>
                  <span className="font-medium">{stock.symbol}</span>
                  <span className={`text-xs ${performance >= 0 ? 'text-price-up' : 'text-price-down'}`}>
                    {performance >= 0 ? '+' : ''}{performance.toFixed(2)}%
                  </span>
                  {selectedStocks.length > 1 && (
                    <button
                      onClick={() => removeStock(stock.symbol)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              <Legend />
              {selectedStocks.map((stock) => (
                <Line
                  key={stock.symbol}
                  type="monotone"
                  dataKey={stock.symbol}
                  stroke={stock.color}
                  strokeWidth={2}
                  dot={false}
                  name={stock.symbol}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedStocks.map((stock) => {
            const performance = getPerformance(stock.symbol);
            const currentPrice = mockComparisonData[mockComparisonData.length - 1][stock.symbol] as number;
            
            return (
              <div
                key={stock.symbol}
                className="p-4 rounded-lg bg-gradient-trading border border-trading-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stock.color }}
                  ></div>
                  <span className="font-medium">{stock.symbol}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-bold">${currentPrice.toFixed(2)}</div>
                  <div className={`text-sm ${performance >= 0 ? 'text-price-up' : 'text-price-down'}`}>
                    {performance >= 0 ? '+' : ''}{performance.toFixed(2)}% (7d)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};