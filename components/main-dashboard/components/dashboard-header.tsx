"use client"
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Database, Plus, Zap } from "lucide-react";

interface DashboardHeaderProps {
  clients: any[];
  handleSeed: () => void;
  isSeeding: boolean;
  setIsEngagementOpen: (isOpen: boolean) => void;
  setIsPitchbookOpen: (isOpen: boolean) => void;
  setSelectedClient: (client: any) => void;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  clients,
  handleSeed,
  isSeeding,
  setIsEngagementOpen,
  setIsPitchbookOpen,
  setSelectedClient,
}) => {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Morning Briefing</h2>
        <p className="text-slate-500">
          Personalized coverage strategy and AI-driven insights.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {clients?.length === 0 && (
          <Button variant="secondary" onClick={handleSeed} disabled={isSeeding}>
            <Database className="mr-2 h-4 w-4" />
            {isSeeding ? "Seeding..." : "Seed Data"}
          </Button>
        )}
        <Button variant="outline" className="border-slate-300 text-slate-700" onClick={() => setIsEngagementOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Log
        </Button>
        <Button
          className="bg-amber-600 hover:bg-amber-700 text-white border-none"
          onClick={() => {
            setIsPitchbookOpen(true);
            setSelectedClient(null);
          }}
        >
          <Zap className="mr-2 h-4 w-4" />
          Generate Pitchbook
        </Button>
      </div>
    </div>
  );
};