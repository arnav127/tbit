"use client"
import { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EngagementLoggingModalProps {
  isEngagementOpen: boolean;
  setIsEngagementOpen: (isOpen: boolean) => void;
  engagementType: "interaction" | "meeting" | "client" | "deal" | "transaction" | "intel";
  setEngagementType: (type: "interaction" | "meeting" | "client" | "deal" | "transaction" | "intel") => void;
  formData: any;
  setFormData: (data: any) => void;
  clients: any[];
  handleSubmitEngagement: () => void;
}

export const EngagementLoggingModal: FC<EngagementLoggingModalProps> = ({
  isEngagementOpen,
  setIsEngagementOpen,
  engagementType,
  setEngagementType,
  formData,
  setFormData,
  clients,
  handleSubmitEngagement,
}) => {
  return (
    <Dialog open={isEngagementOpen} onOpenChange={setIsEngagementOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record Activity</DialogTitle>
          <DialogDescription>
            Log new data into the Nexus platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <Button
              variant={engagementType === "interaction" ? "default" : "outline"}
              onClick={() => setEngagementType("interaction")}
              className="w-full text-xs"
            >
              Interaction
            </Button>
            <Button
              variant={engagementType === "meeting" ? "default" : "outline"}
              onClick={() => setEngagementType("meeting")}
              className="w-full text-xs"
            >
              Meeting
            </Button>
            <Button
              variant={engagementType === "client" ? "default" : "outline"}
              onClick={() => setEngagementType("client")}
              className="w-full text-xs"
            >
              New Client
            </Button>
            <Button
              variant={engagementType === "deal" ? "default" : "outline"}
              onClick={() => setEngagementType("deal")}
              className="w-full text-xs"
            >
              New Deal
            </Button>
            <Button
              variant={engagementType === "transaction" ? "default" : "outline"}
              onClick={() => setEngagementType("transaction")}
              className="w-full text-xs"
            >
              Transaction
            </Button>
            <Button
              variant={engagementType === "intel" ? "default" : "outline"}
              onClick={() => setEngagementType("intel")}
              className="w-full text-xs"
            >
              Market Intel
            </Button>
          </div>

          {["interaction", "meeting", "deal", "transaction"].includes(engagementType) && (
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <select
                id="client"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              >
                <option value="">Select a client...</option>
                {clients?.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}

          {engagementType === "interaction" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option>Call</option>
                  <option>Email</option>
                  <option>Meeting</option>
                  <option>Dinner</option>
                  <option>Golf</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sentiment">Sentiment</Label>
                <select
                  id="sentiment"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.sentiment}
                  onChange={(e) => setFormData({ ...formData, sentiment: e.target.value })}
                >
                  <option>Positive</option>
                  <option>Neutral</option>
                  <option>Negative</option>
                </select>
              </div>
            </div>
          ) : engagementType === "meeting" ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="title">Meeting Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Q4 Strategy Review" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="attendees">Attendees</Label>
                <Input id="attendees" value={formData.attendees} onChange={(e) => setFormData({ ...formData, attendees: e.target.value })} placeholder="e.g. John Doe, Jane Smith" />
              </div>
            </>
          ) : engagementType === "client" ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Client Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Company Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tier">Tier</Label>
                  <select id="tier" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.tier} onChange={(e) => setFormData({ ...formData, tier: e.target.value })}>
                    <option>Platinum</option>
                    <option>Gold</option>
                    <option>Silver</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} placeholder="e.g. Tech" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="region">Region</Label>
                  <Input id="region" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} placeholder="e.g. NA, EMEA" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wallet">Wallet Share (%)</Label>
                  <Input id="wallet" type="number" value={formData.wallet_share} onChange={(e) => setFormData({ ...formData, wallet_share: Number(e.target.value) })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="revenue">YTD Revenue ($)</Label>
                <Input id="revenue" type="number" value={formData.revenue_ytd} onChange={(e) => setFormData({ ...formData, revenue_ytd: Number(e.target.value) })} />
              </div>
            </>
          ) : engagementType === "deal" ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="deal_name">Deal Name</Label>
                <Input id="deal_name" value={formData.deal_name} onChange={(e) => setFormData({ ...formData, deal_name: e.target.value })} placeholder="Project X" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="deal_type">Type</Label>
                  <select id="deal_type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    <option>M&A</option>
                    <option>IPO</option>
                    <option>Debt</option>
                    <option>Restructuring</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stage">Stage</Label>
                  <select id="stage" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value })}>
                    <option>Pitch</option>
                    <option>Mandate</option>
                    <option>Execution</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="value">Value ($)</Label>
                  <Input id="value" type="number" value={formData.value} onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prob">Probability (%)</Label>
                  <Input id="prob" type="number" value={formData.probability} onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })} />
                </div>
              </div>
            </>
          ) : engagementType === "transaction" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tx_type">Type</Label>
                  <select id="tx_type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    <option>Wire Transfer</option>
                    <option>FX Settlement</option>
                    <option>Trade Finance</option>
                    <option>Liquidity Sweep</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="direction">Direction</Label>
                  <select id="direction" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.direction} onChange={(e) => setFormData({ ...formData, direction: e.target.value })}>
                    <option>Inflow</option>
                    <option>Outflow</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Completed</option>
                    <option>Failed</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Input id="headline" value={formData.headline} onChange={(e) => setFormData({ ...formData, headline: e.target.value })} placeholder="Market News..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sector">Related Sector</Label>
                    <Input id="sector" value={formData.related_sector} onChange={(e) => setFormData({ ...formData, related_sector: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="source">Source</Label>
                    <Input id="source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="impact">Impact Score</Label>
                  <select id="impact" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.impact_score} onChange={(e) => setFormData({ ...formData, impact_score: e.target.value })}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </>
            )}

            {engagementType !== "intel" && (
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
            )}

            {["interaction", "meeting"].includes(engagementType) && (
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea id="notes" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Enter details..." />
              </div>
            )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEngagementOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitEngagement}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
