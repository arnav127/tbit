"use client"
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface MarketIntelligenceProps {
  marketIntel: any[];
  setViewAllCategory: (category: string) => void;
}

export const MarketIntelligence: FC<MarketIntelligenceProps> = ({ marketIntel, setViewAllCategory }) => {
  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base text-slate-900">Market Intelligence</CardTitle>
            <CardDescription>Live feed impacting your coverage.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('intel')}>View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketIntel?.slice(0, 4).map((intel: any, i: number) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 line-clamp-1">{intel.headline}</p>
                  <p className="text-xs text-slate-500">{intel.source} • {intel.time}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className={intel.impact_score === 'High' ? 'text-red-600 border-red-200 bg-red-50' : 'text-slate-500'}>
                  {intel.impact_score}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};