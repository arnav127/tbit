"use client"
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

interface LiveDealsProps {
  deals: any[];
  formatCurrency: (value: number) => string;
  setViewAllCategory: (category: string) => void;
}

export const LiveDeals: FC<LiveDealsProps> = ({ deals, formatCurrency, setViewAllCategory }) => {
  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base text-slate-900">Live Deals</CardTitle>
            <CardDescription>Active transactions in execution.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('deals')}>View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deals?.slice(0, 5).map((deal: any, i: number) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                  <Target className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 line-clamp-1">{deal.deal_name}</p>
                  <p className="text-xs text-slate-500">{deal.client_name} • {deal.stage}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{formatCurrency(deal.value)}</p>
                <p className="text-xs text-slate-500">{deal.probability}% Prob.</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};