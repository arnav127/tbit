"use client"
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";

interface MarketSentimentProps {
  dateModifier: number;
}

export const MarketSentiment: FC<MarketSentimentProps> = ({ dateModifier }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Market Sentiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <PieChart className="h-10 w-10 text-amber-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">Bullish</p>
              <p className="text-xs text-slate-500">Tech & Energy leading</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Volatility Index (VIX)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <BarChart3 className="h-10 w-10 text-slate-400" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{(18.4 + (dateModifier * 0.5)).toFixed(2)}</p>
              <p className="text-xs text-slate-500">{(dateModifier % 2 === 0 ? '-' : '+')}{(1.2 + (dateModifier * 0.1)).toFixed(1)}% today</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">10Y Treasury</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <TrendingUp className="h-10 w-10 text-red-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{(4.82 + (dateModifier * 0.05)).toFixed(2)}%</p>
              <p className="text-xs text-slate-500">+{5 + dateModifier}bps today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
