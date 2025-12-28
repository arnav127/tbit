"use client"
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight, Landmark } from "lucide-react";

interface TransactionBankingProps {
  transactions: any[];
  formatCurrency: (value: number) => string;
  setViewAllCategory: (category: string) => void;
}

export const TransactionBanking: FC<TransactionBankingProps> = ({ transactions, formatCurrency, setViewAllCategory }) => {
  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base text-slate-900 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-slate-500" />
              Transaction Banking
            </CardTitle>
            <CardDescription>Recent large cash flows and trade finance.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('transactions')}>View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions?.slice(0, 5).map((tx: any, i: number) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${tx.direction === 'Inflow' ? 'bg-green-100' : 'bg-slate-100'}`}>
                  {tx.direction === 'Inflow' ? <ArrowDownRight className="h-4 w-4 text-green-600" /> : <ArrowUpRight className="h-4 w-4 text-slate-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{tx.client_name}</p>
                  <p className="text-xs text-slate-500">{tx.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{formatCurrency(tx.amount)}</p>
                <p className="text-xs text-slate-500">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};