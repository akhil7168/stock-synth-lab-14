import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, DollarSign, Users, Briefcase, Calendar, Globe } from "lucide-react";

interface CompanyData {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  marketCap: string;
  price: number;
  pe: number;
  eps: number;
  dividend: number;
  dividendYield: number;
  beta: number;
  volume: string;
  avgVolume: string;
  high52w: number;
  low52w: number;
  description: string;
  ceo: string;
  employees: string;
  founded: string;
  headquarters: string;
  website: string;
}

const mockCompanyData: CompanyData = {
  symbol: "AAPL",
  name: "Apple Inc.",
  sector: "Technology",
  industry: "Consumer Electronics",
  marketCap: "2.7T",
  price: 175.23,
  pe: 28.45,
  eps: 6.16,
  dividend: 0.96,
  dividendYield: 0.55,
  beta: 1.24,
  volume: "67.2M",
  avgVolume: "58.9M",
  high52w: 199.62,
  low52w: 124.17,
  description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets.",
  ceo: "Tim Cook",
  employees: "164,000",
  founded: "1976",
  headquarters: "Cupertino, California",
  website: "www.apple.com"
};

export const CompanyProfile = () => {
  const getMetricColor = (value: number, type: 'pe' | 'beta' | 'yield') => {
    switch (type) {
      case 'pe':
        if (value < 15) return 'text-bullish';
        if (value > 30) return 'text-bearish';
        return 'text-neutral';
      case 'beta':
        if (value < 1) return 'text-bullish';
        if (value > 1.5) return 'text-bearish';
        return 'text-neutral';
      case 'yield':
        if (value > 3) return 'text-bullish';
        if (value < 1) return 'text-bearish';
        return 'text-neutral';
      default:
        return 'text-foreground';
    }
  };

  const currentPosition = ((mockCompanyData.price - mockCompanyData.low52w) / (mockCompanyData.high52w - mockCompanyData.low52w)) * 100;

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card className="bg-trading-panel border-trading-border shadow-trading">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Building2 className="w-6 h-6 text-chart-1" />
                {mockCompanyData.name}
              </CardTitle>
              <CardDescription className="text-lg mt-1">
                {mockCompanyData.symbol} • {mockCompanyData.sector}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              ${mockCompanyData.price.toFixed(2)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {mockCompanyData.description}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Metrics */}
        <Card className="bg-trading-panel border-trading-border shadow-trading">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-chart-1" />
              Key Financial Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Market Cap</div>
                <div className="text-xl font-bold">{mockCompanyData.marketCap}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">P/E Ratio</div>
                <div className={`text-xl font-bold ${getMetricColor(mockCompanyData.pe, 'pe')}`}>
                  {mockCompanyData.pe.toFixed(2)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">EPS (TTM)</div>
                <div className="text-xl font-bold">${mockCompanyData.eps.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Beta</div>
                <div className={`text-xl font-bold ${getMetricColor(mockCompanyData.beta, 'beta')}`}>
                  {mockCompanyData.beta.toFixed(2)}
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Dividend</div>
                <div className="text-lg font-semibold">${mockCompanyData.dividend.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Yield</div>
                <div className={`text-lg font-semibold ${getMetricColor(mockCompanyData.dividendYield, 'yield')}`}>
                  {mockCompanyData.dividendYield.toFixed(2)}%
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Volume</div>
                <div className="text-lg font-semibold">{mockCompanyData.volume}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Avg Volume</div>
                <div className="text-lg font-semibold">{mockCompanyData.avgVolume}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="bg-trading-panel border-trading-border shadow-trading">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-chart-1" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">CEO</div>
                  <div className="font-semibold">{mockCompanyData.ceo}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Employees</div>
                  <div className="font-semibold">{mockCompanyData.employees}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Founded</div>
                  <div className="font-semibold">{mockCompanyData.founded}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Headquarters</div>
                  <div className="font-semibold">{mockCompanyData.headquarters}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Website</div>
                  <div className="font-semibold text-primary">{mockCompanyData.website}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Industry</span>
                <Badge variant="outline">{mockCompanyData.industry}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sector</span>
                <Badge variant="secondary">{mockCompanyData.sector}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 52-Week Range */}
      <Card className="bg-trading-panel border-trading-border shadow-trading">
        <CardHeader>
          <CardTitle>52-Week Price Range</CardTitle>
          <CardDescription>
            Current position within the yearly trading range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">52W Low</div>
                <div className="text-lg font-bold text-bearish">${mockCompanyData.low52w.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Current</div>
                <div className="text-xl font-bold">${mockCompanyData.price.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">52W High</div>
                <div className="text-lg font-bold text-bullish">${mockCompanyData.high52w.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-2 bg-secondary rounded-full">
                <div 
                  className="h-2 bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${currentPosition}%` }}
                ></div>
              </div>
              <div 
                className="absolute top-0 w-1 h-2 bg-foreground rounded-full transform -translate-x-1/2"
                style={{ left: `${currentPosition}%` }}
              ></div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Current price is at {currentPosition.toFixed(1)}% of the 52-week range
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};