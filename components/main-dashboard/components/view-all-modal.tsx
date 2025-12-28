"use client"
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, Clock, Target } from "lucide-react";

interface ViewAllModalProps {
  viewAllCategory: string | null;
  setViewAllCategory: (category: string | null) => void;
  clients: any[];
  transactions: any[];
  deals: any[];
  meetings: any[];
  marketIntel: any[];
  marketRates: any[];
  formatCurrency: (value: number) => string;
}

export const ViewAllModal: FC<ViewAllModalProps> = ({
  viewAllCategory,
  setViewAllCategory,
  clients,
  transactions,
  deals,
  meetings,
  marketIntel,
  marketRates,
  formatCurrency,
}) => {
  const titles: Record<string, string> = {
    actions: "All Recommended Actions",
    transactions: "All Transactions",
    deals: "All Live Deals",
    meetings: "All Client Meetings",
    intel: "All Market Intelligence",
    rates: "All Rates & Commodities",
  };

  return (
    <Dialog open={!!viewAllCategory} onOpenChange={(open) => !open && setViewAllCategory(null)}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {viewAllCategory && titles[viewAllCategory]}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {viewAllCategory === 'actions' && clients?.map((client: any, i: number) => (
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
              </div>
            </div>
          ))}

          {viewAllCategory === 'transactions' && transactions?.map((tx: any, i: number) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${tx.direction === 'Inflow' ? 'bg-green-100' : 'bg-slate-100'}`}>
                  {tx.direction === 'Inflow' ? <ArrowDownRight className="h-4 w-4 text-green-600" /> : <ArrowUpRight className="h-4 w-4 text-slate-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{tx.client_name}</p>
                  <p className="text-xs text-slate-500">{tx.type} • {new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{formatCurrency(tx.amount)}</p>
                <p className="text-xs text-slate-500">{tx.status}</p>
              </div>
            </div>
          ))}

          {viewAllCategory === 'deals' && deals?.map((deal: any, i: number) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                  <Target className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{deal.deal_name}</p>
                  <p className="text-xs text-slate-500">{deal.client_name} • {deal.stage}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{formatCurrency(deal.value)}</p>
                <p className="text-xs text-slate-500">{deal.probability}% Prob.</p>
              </div>
            </div>
          ))}

          {viewAllCategory === 'meetings' && meetings?.map((meeting: any, i: number) => (
            <div key={i} className="flex gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <div className="mt-1">
                {meeting.type === 'Upcoming' ?
                  <Clock className="h-4 w-4 text-amber-500" /> :
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                }
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{meeting.title}</p>
                <p className="text-xs text-slate-500">{meeting.client_name} • {new Date(meeting.date).toLocaleDateString()}</p>
                {meeting.outcome && <p className="text-xs text-slate-600 mt-1 italic">"{meeting.outcome}"</p>}
              </div>
            </div>
          ))}

          {viewAllCategory === 'intel' && marketIntel?.map((intel: any, i: number) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{intel.headline}</p>
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

          {viewAllCategory === 'rates' && marketRates?.map((rate: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-2 border-b border-slate-100 last:border-0">
              <span className="text-sm text-slate-500 font-medium">{rate.symbol}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-900">{rate.price}</span>
                <span className={`text-xs ${rate.change > 0 ? 'text-green-600' : 'text-red-600'}`}>{rate.change > 0 ? '+' : ''}{rate.change}</span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};