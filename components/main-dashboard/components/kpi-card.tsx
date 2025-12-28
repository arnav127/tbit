"use client"
import { FC, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  icon: ReactNode;
  value: string | number;
  description: string;
  borderColor?: string;
}

export const KpiCard: FC<KpiCardProps> = ({ title, icon, value, description, borderColor }) => {
  return (
    <Card className={`shadow-sm ${borderColor ? `border-l-4 ${borderColor}` : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <p className="text-xs text-slate-500">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
