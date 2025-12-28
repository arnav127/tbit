"use client"
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Zap } from "lucide-react";

interface RecommendedActionsProps {
  clients: any[];
  setViewAllCategory: (category: string) => void;
}

export const RecommendedActions: FC<RecommendedActionsProps> = ({ clients, setViewAllCategory }) => {
  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Zap className="h-5 w-5 text-amber-500" />
              Recommended Actions
            </CardTitle>
            <CardDescription>
              Prioritized outreach based on real-time market events.
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('actions')}>View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {clients?.slice(0, 5).map((client: any, i: number) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900">{client.name}</p>
                  <Badge variant="outline" className="text-xs font-normal text-slate-500 border-slate-200">{client.tier}</Badge>
                </div>
                <p className="text-sm font-medium text-amber-700 flex items-center gap-1">
                  {client.next_best_action}
                  <ArrowUpRight className="h-3 w-3" />
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-normal border-slate-200">
                    {client.industry}
                  </Badge>
                  {client.personalization_tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                <Badge className={client.relationship_score > 90 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-50 text-slate-700 border-slate-100'}>
                  Score: {client.relationship_score}
                </Badge>
                <div className="text-xs font-medium text-slate-400">
                  AI Confidence: {(client.relationship_score * 0.95).toFixed(0)}%
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Wallet Share: {client.wallet_share}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};