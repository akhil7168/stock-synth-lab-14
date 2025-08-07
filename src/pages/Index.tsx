import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity, Brain, BarChart3, PieChart, Zap, Globe } from "lucide-react";
import { LivePrices } from "@/components/LivePrices";
import { CandlestickChart } from "@/components/CandlestickChart";
import { TechnicalIndicators } from "@/components/TechnicalIndicators";
import { StockComparison } from "@/components/StockComparison";
import { TopMovers } from "@/components/TopMovers";
import { IndexPerformance } from "@/components/IndexPerformance";
import { CompanyProfile } from "@/components/CompanyProfile";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [predictions, setPredictions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async (formData: any) => {
    setIsLoading(true);
    // Simulate API call with mock data
    setTimeout(() => {
      const mockPredictions = {
        symbol: formData.symbol,
        model: formData.model,
        predictions: {
          lstm: {
            prices: [150, 152, 148, 155, 158, 160, 162],
            accuracy: 85.2,
            rmse: 2.34,
            mae: 1.89,
            trainingTime: 45
          },
          rnn: {
            prices: [149, 151, 147, 154, 156, 159, 161],
            accuracy: 82.7,
            rmse: 2.67,
            mae: 2.12,
            trainingTime: 32
          }
        },
        actualPrices: [148, 149, 150, 151, 152, 153, 154],
        dates: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07']
      };
      setPredictions(mockPredictions);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary shadow-glow">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Stock Synth Lab
                </h1>
                <p className="text-muted-foreground">AI-Powered Stock Price Prediction</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              Live Market Data
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">
            Predict Stock Prices with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Models
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare LSTM and RNN neural networks for accurate stock price forecasting using real-time market data
          </p>
        </div>

        {/* Live Prices */}
        <LivePrices />

        {/* Main Trading Dashboard */}
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-trading-panel border border-trading-border">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Live
            </TabsTrigger>
            <TabsTrigger value="candlestick" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Technical
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="movers" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Movers
            </TabsTrigger>
            <TabsTrigger value="indices" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Indices
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6 mt-6">
            <TopMovers />
          </TabsContent>

          <TabsContent value="candlestick" className="space-y-6 mt-6">
            <CandlestickChart />
          </TabsContent>

          <TabsContent value="technical" className="space-y-6 mt-6">
            <TechnicalIndicators />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6 mt-6">
            <StockComparison />
          </TabsContent>

          <TabsContent value="movers" className="space-y-6 mt-6">
            <TopMovers />
          </TabsContent>

          <TabsContent value="indices" className="space-y-6 mt-6">
            <IndexPerformance />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <CompanyProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;