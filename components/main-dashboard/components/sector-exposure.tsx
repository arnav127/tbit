"use client"
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SectorExposureProps {
  sectorExposure: any[];
  sectorColors: Record<string, string>;
}

export const SectorExposure: FC<SectorExposureProps> = ({ sectorExposure, sectorColors }) => {
  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader>
        <CardTitle className="text-base text-slate-900">Sector Exposure</CardTitle>
        <CardDescription>Portfolio concentration and daily performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sectorExposure?.map((item: any, i: number) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{item.sector}</span>
                <div className="flex gap-4">
                  <span className="text-slate-500">Exp: {item.exposure}</span>
                  <span className={item.performance.startsWith('+') ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{item.performance}</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${sectorColors[item.sector] || "bg-slate-500"}`} style={{ width: item.exposure }}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};