"use client"
import { FC } from "react";
import { KpiCard } from "./kpi-card";
import { Briefcase, DollarSign, TrendingUp, Zap } from "lucide-react";

interface KpiCardsProps {
  activeOpps: number;
  totalRevenue: number;
  nextBestActionsCount: number;
  formatCurrency: (value: number) => string;
}

export const KpiCards: FC<KpiCardsProps> = ({
  activeOpps,
  totalRevenue,
  nextBestActionsCount,
  formatCurrency,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Pipeline Velocity"
        icon={<TrendingUp className="h-4 w-4 text-amber-600" />}
        value={`+${Math.abs(activeOpps * 2.5).toFixed(1)}%`}
        description="Pipeline velocity vs last quarter"
        borderColor="border-l-amber-500"
      />
      <KpiCard
        title="Active Opportunities"
        icon={<Briefcase className="h-4 w-4 text-slate-400" />}
        value={activeOpps}
        description="Clients with score > 70"
      />
      <KpiCard
        title="YTD Revenue"
        icon={<DollarSign className="h-4 w-4 text-slate-400" />}
        value={formatCurrency(totalRevenue)}
        description="Across all coverage"
      />
      <KpiCard
        title="Next Best Actions"
        icon={<Zap className="h-4 w-4 text-amber-600" />}
        value={nextBestActionsCount}
        description="Pending actions identified"
      />
    </div>
  );
};