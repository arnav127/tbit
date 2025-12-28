"use client"
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface RatesAndCommoditiesProps {
  marketRates: any[];
  setViewAllCategory: (category: string) => void;
}

export const RatesAndCommodities: FC<RatesAndCommoditiesProps> = ({ marketRates, setViewAllCategory }) => {
  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base text-slate-900 flex items-center gap-2">
              <Coins className="h-5 w-5 text-slate-500" />
              Rates & Commodities
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('rates')}>View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {marketRates?.slice(0, 6).map((rate: any, i: number) => (
            <div key={i} className="flex flex-col p-2 bg-slate-50 rounded-md border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">{rate.symbol}</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-sm font-bold text-slate-900">{rate.price}</span>
                <span className={`text-xs ${rate.change > 0 ? 'text-green-600' : 'text-red-600'}`}>{rate.change > 0 ? '+' : ''}{rate.change}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
