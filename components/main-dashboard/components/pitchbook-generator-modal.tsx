"use client"
import { FC, MutableRefObject } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, ChevronLeft, Clock, Target, User } from "lucide-react";

interface PitchbookGeneratorModalProps {
  isPitchbookOpen: boolean;
  setIsPitchbookOpen: (isOpen: boolean) => void;
  clients: any[];
  selectedClient: any;
  setSelectedClient: (client: any) => void;
  currentDate: Date;
  handleExportPdf: () => void;
  pitchbookRef: MutableRefObject<HTMLDivElement | null>;
  formatCurrency: (value: number) => string;
  interactions: any[];
  meetings: any[];
  setSelectedMeeting: (meeting: any) => void;
  setAgendaNotes: (notes: string) => void;
  setIsEditingAgenda: (isEditing: boolean) => void;
  setIsAgendaOpen: (isOpen: boolean) => void;
}

export const PitchbookGeneratorModal: FC<PitchbookGeneratorModalProps> = ({
  isPitchbookOpen,
  setIsPitchbookOpen,
  clients,
  selectedClient,
  setSelectedClient,
  currentDate,
  handleExportPdf,
  pitchbookRef,
  formatCurrency,
  interactions,
  meetings,
  setSelectedMeeting,
  setAgendaNotes,
  setIsEditingAgenda,
  setIsAgendaOpen,
}) => {
  return (
    <Dialog open={isPitchbookOpen} onOpenChange={setIsPitchbookOpen}>
      <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto bg-slate-50 p-0 gap-0">
        {!selectedClient ? (
          <div className="p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900">Select Client for Pitchbook</DialogTitle>
              <DialogDescription>
                Choose a client to generate a personalized strategic proposal based on real-time intelligence.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients?.map((client: any) => (
                <Card
                  key={client.id}
                  className="cursor-pointer hover:border-amber-500 hover:shadow-md transition-all group"
                  onClick={() => setSelectedClient(client)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">{client.industry}</Badge>
                      <Badge className={client.relationship_score > 80 ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-slate-100 text-slate-700 hover:bg-slate-100"}>
                        {client.relationship_score} Score
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-amber-700 transition-colors">{client.name}</CardTitle>
                    <CardDescription>{client.tier} Tier • {client.region}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-500 mb-2">Next Best Action:</p>
                    <p className="text-sm font-medium text-slate-900 line-clamp-2">{client.next_best_action}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Pitchbook Header */}
            <div className="bg-slate-900 text-white p-6 sticky top-0 z-10 shadow-md flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800" onClick={() => setSelectedClient(null)}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
                <div>
                  <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                  <p className="text-sm text-slate-400">Strategic Discussion Materials • {currentDate.toLocaleDateString()}</p>
                </div>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={handleExportPdf}>
                Export PDF
              </Button>
            </div>

            {/* Pitchbook Content */}
            <div ref={pitchbookRef} className="p-8 space-y-8 max-w-4xl mx-auto w-full bg-white min-h-screen shadow-sm my-8">

              {/* Executive Summary */}
              <section className="space-y-4 border-b border-slate-100 pb-8">
                <h3 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="h-6 w-6 text-amber-600" />
                  Executive Summary
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Given the recent volatility in the <strong>{selectedClient.industry}</strong> sector and your current positioning in <strong>{selectedClient.region}</strong>,
                  we have identified a strategic opportunity to optimize your capital structure.
                  Our proprietary models suggest a <strong>{(selectedClient.relationship_score * 0.9).toFixed(1)}%</strong> probability of success for
                  <strong> {selectedClient.next_best_action}</strong>.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Wallet Share</p>
                    <p className="text-2xl font-bold text-slate-900">{selectedClient.wallet_share}%</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">YTD Revenue</p>
                    <p className="text-2xl font-bold text-slate-900">{formatCurrency(selectedClient.revenue_ytd)}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Relationship Score</p>
                    <p className="text-2xl font-bold text-slate-900">{selectedClient.relationship_score}/100</p>
                  </div>
                </div>
              </section>

              {/* Strategic Opportunities */}
              <section className="space-y-6 border-b border-slate-100 pb-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-600" />
                  Strategic Opportunities & Propensity
                </h3>
                <div className="space-y-4">
                  {[
                    { name: selectedClient.next_best_action, prob: 92, type: "Primary Recommendation" },
                    { name: "FX Risk Management Framework", prob: 78, type: "Cross-Sell" },
                    { name: "Supply Chain Finance Optimization", prob: 65, type: "Cross-Sell" },
                    { name: "Strategic M&A Advisory", prob: 45, type: "Long-term" }
                  ].map((opp, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-900">{opp.name} <span className="text-slate-400 font-normal ml-2">- {opp.type}</span></span>
                        <span className="font-bold text-slate-700">{opp.prob}% Match</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${opp.prob}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Interactions */}
              <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  Recent Engagement
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {interactions?.filter((i: any) => i.client_name === selectedClient.name).length === 0 ? (
                    <p className="text-slate-500 italic">No recent interactions recorded.</p>
                  ) : (
                    interactions?.filter((i: any) => i.client_name === selectedClient.name).map((interaction: any, i: number) => (
                      <div key={i} className="flex gap-4 p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                        <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{interaction.type}</p>
                          <p className="text-sm text-slate-600 mt-1">{interaction.notes}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs font-normal">{new Date(interaction.date).toLocaleDateString()}</Badge>
                            <Badge variant="outline" className={interaction.sentiment === 'Positive' ? "text-green-600 border-green-200" : "text-slate-500"}>
                              {interaction.sentiment}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Upcoming Meetings */}
              <section className="space-y-6 pt-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  Scheduled Meetings
                </h3>
                <div className="space-y-3">
                  {meetings?.filter((m: any) => m.client_name === selectedClient.name && m.type === 'Upcoming').length === 0 ? (
                    <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-slate-500">
                      No upcoming meetings scheduled.
                      <Button variant="link" className="text-amber-600 h-auto p-0 ml-2">Schedule Now</Button>
                    </div>
                  ) : (
                    meetings?.filter((m: any) => m.client_name === selectedClient.name && m.type === 'Upcoming').map((meeting: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-amber-50/50 border border-amber-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-amber-600" />
                          <div>
                            <p className="font-medium text-slate-900">{meeting.title}</p>
                            <p className="text-sm text-slate-500">{new Date(meeting.date).toLocaleDateString()} • {meeting.attendees?.join(", ")}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-200 text-amber-700 hover:bg-amber-100"
                          onClick={() => {
                            setSelectedMeeting(meeting);
                            setAgendaNotes(meeting.notes || "");
                            setIsEditingAgenda(false);
                            setIsAgendaOpen(true);
                          }}
                        >
                          View Agenda
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <div className="pt-8 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-widest">Goldman Sachs Confidential</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
