"use client"
import { FC, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Coins,
  Database,
  DollarSign,
  Globe,
  Landmark,
  PieChart,
  Plus,
  Target,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy, limit, addDoc, updateDoc, doc } from "firebase/firestore";
import { seedDatabase } from "@/lib/seed";
import { toast } from "@/components/ui/use-toast";

export const MainDashboard: FC = () => {
  const firestore = useFirestore();
  const [isSeeding, setIsSeeding] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isPitchbookOpen, setIsPitchbookOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const pitchbookRef = useRef<HTMLDivElement>(null);
  const [isEngagementOpen, setIsEngagementOpen] = useState(false);
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [isEditingAgenda, setIsEditingAgenda] = useState(false);
  const [agendaNotes, setAgendaNotes] = useState("");
  const [engagementType, setEngagementType] = useState<"interaction" | "meeting" | "client" | "deal" | "transaction" | "intel">("interaction");
  const [viewAllCategory, setViewAllCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientId: "",
    type: "Call",
    notes: "",
    date: new Date().toISOString().split('T')[0],
    sentiment: "Neutral",
    title: "",
    attendees: "",
    // New fields
    name: "",
    tier: "Silver",
    industry: "",
    region: "",
    wallet_share: 0,
    revenue_ytd: 0,
    deal_name: "",
    stage: "Pitch",
    value: 0,
    probability: 0,
    amount: 0,
    currency: "USD",
    status: "Pending",
    direction: "Inflow",
    headline: "",
    related_sector: "",
    impact_score: "Low",
    source: ""
  });

  // Data Fetching
  const clientsQuery = query(collection(firestore, "clients"), orderBy("relationship_score", "desc"));
  const { data: clients } = useFirestoreCollectionData(clientsQuery, { idField: "id" });

  const interactionsQuery = query(collection(firestore, "interactions"));
  const { data: interactions } = useFirestoreCollectionData(interactionsQuery, { idField: "id" });

  const marketIntelQuery = query(collection(firestore, "market_intel"));
  const { data: marketIntel } = useFirestoreCollectionData(marketIntelQuery, { idField: "id" });

  const dealsQuery = query(collection(firestore, "deals"));
  const { data: deals } = useFirestoreCollectionData(dealsQuery, { idField: "id" });

  const transactionsQuery = query(collection(firestore, "transactions"));
  const { data: transactions } = useFirestoreCollectionData(transactionsQuery, { idField: "id" });

  const marketRatesQuery = query(collection(firestore, "market_rates"));
  const { data: marketRates } = useFirestoreCollectionData(marketRatesQuery, { idField: "id" });

  const meetingsQuery = query(collection(firestore, "meetings"));
  const { data: meetings } = useFirestoreCollectionData(meetingsQuery, { idField: "id" });

  const sectorExposureQuery = query(collection(firestore, "sector_exposure"), orderBy("order", "asc"));
  const { data: sectorExposure } = useFirestoreCollectionData(sectorExposureQuery, { idField: "id" });

  // Date-based modifier for mock data variation
  const dateModifier = (currentDate.getFullYear() + currentDate.getMonth() + currentDate.getDate()) % 10;
  const volatilityFactor = 1 + ((dateModifier - 5) / 100); // +/- 5% variation

  // Derived Metrics
  const activeOpps = Math.round((clients?.filter((c: any) => c.relationship_score > 70).length || 0) * volatilityFactor);
  const avgScore = clients?.length ? (clients.reduce((acc: number, c: any) => acc + c.relationship_score, 0) / clients.length).toFixed(0) : 0;
  const nextBestActionsCount = Math.round((clients?.filter((c: any) => c.next_best_action).length || 0) * volatilityFactor);
  const totalRevenue = (clients?.reduce((acc: number, c: any) => acc + (c.revenue_ytd || 0), 0) || 0) * volatilityFactor;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: "compact", maximumFractionDigits: 1 }).format(value);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase(firestore);
      toast({ title: "Database Seeded", description: "Refresh if data doesn't appear immediately." });
    } catch (err: any) {
      toast({ title: "Error Seeding", description: err.message, variant: "destructive" });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleExportPdf = () => {
    const content = pitchbookRef.current;
    if (!content || !selectedClient) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map(style => style.outerHTML)
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${selectedClient.name} - Pitchbook</title>
          ${styles}
          <style>
            body { background-color: white; padding: 40px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { margin: 20mm; }
          </style>
        </head>
        <body>
          <div class="mb-8 border-b border-slate-200 pb-4">
            <h1 class="text-3xl font-bold text-slate-900">${selectedClient.name}</h1>
            <p class="text-slate-500">Strategic Discussion Materials • ${currentDate.toLocaleDateString()}</p>
          </div>
          <div class="space-y-8">
            ${content.innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

    const handleUpdateAgenda = async () => {
    if (!selectedMeeting) return;
    try {
      const meetingRef = doc(firestore, "meetings", selectedMeeting.id);
      await updateDoc(meetingRef, {
        notes: agendaNotes
      });
      toast({ title: "Agenda Updated", description: "Meeting notes have been saved." });
      setIsEditingAgenda(false);
      setSelectedMeeting({ ...selectedMeeting, notes: agendaNotes });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleSubmitEngagement = async () => {
    // Validation for types that require a client
    if (["interaction", "meeting", "deal", "transaction"].includes(engagementType) && !formData.clientId) {
      toast({ title: "Missing Client", description: "Please select a client.", variant: "destructive" });
      return;
    }
    
    const client = clients?.find((c: any) => c.id === formData.clientId);

    try {
      if (engagementType === "interaction") {
        await addDoc(collection(firestore, "interactions"), {
          client_id: client.id,
          client_name: client.name,
          type: formData.type,
          sentiment: formData.sentiment,
          notes: formData.notes,
          date: new Date(formData.date).toISOString()
        });
        toast({ title: "Interaction Logged", description: "The interaction has been recorded." });
      } else if (engagementType === "meeting") {
        await addDoc(collection(firestore, "meetings"), {
          client_name: client.name,
          title: formData.title,
          date: new Date(formData.date).toISOString(),
          type: "Upcoming",
          attendees: formData.attendees.split(",").map(s => s.trim()),
          notes: formData.notes
        });
        toast({ title: "Meeting Scheduled", description: "The meeting has been added to the calendar." });
      } else if (engagementType === "client") {
        await addDoc(collection(firestore, "clients"), {
          name: formData.name,
          tier: formData.tier,
          industry: formData.industry,
          region: formData.region,
          wallet_share: Number(formData.wallet_share),
          revenue_ytd: Number(formData.revenue_ytd),
          relationship_score: 50, // Default starting score
          personalization_tags: ["New Client"],
          next_best_action: "Initial Onboarding",
          last_contact: new Date().toISOString()
        });
        toast({ title: "Client Added", description: "New client profile created." });
      } else if (engagementType === "deal") {
        await addDoc(collection(firestore, "deals"), {
          client_name: client.name,
          deal_name: formData.deal_name,
          stage: formData.stage,
          value: Number(formData.value),
          probability: Number(formData.probability),
          type: formData.type // Reusing type field for deal type
        });
        toast({ title: "Deal Recorded", description: "New deal added to pipeline." });
      } else if (engagementType === "transaction") {
        await addDoc(collection(firestore, "transactions"), {
          client_name: client.name,
          type: formData.type, // Reusing type field
          amount: Number(formData.amount),
          currency: formData.currency,
          status: formData.status,
          date: new Date(formData.date).toISOString(),
          direction: formData.direction
        });
        toast({ title: "Transaction Logged", description: "Transaction details saved." });
      } else if (engagementType === "intel") {
        await addDoc(collection(firestore, "market_intel"), {
          headline: formData.headline,
          related_sector: formData.related_sector,
          impact_score: formData.impact_score,
          source: formData.source,
          time: "Just now"
        });
        toast({ title: "Intel Added", description: "Market intelligence feed updated." });
      }
      setIsEngagementOpen(false);
      setFormData({
        clientId: "",
        type: "Call",
        notes: "",
        date: new Date().toISOString().split('T')[0],
        sentiment: "Neutral",
        title: "",
        attendees: "",
        name: "",
        tier: "Silver",
        industry: "",
        region: "",
        wallet_share: 0,
        revenue_ytd: 0,
        deal_name: "",
        stage: "Pitch",
        value: 0,
        probability: 0,
        amount: 0,
        currency: "USD",
        status: "Pending",
        direction: "Inflow",
        headline: "",
        related_sector: "",
        impact_score: "Low",
        source: ""
      });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col space-y-6 pb-8">
      {/* Header */}
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
      

      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pipeline Velocity
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+{Math.abs(activeOpps * 2.5).toFixed(1)}%</div>
            <p className="text-xs text-slate-500">
              Pipeline velocity vs last quarter
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Opportunities
            </CardTitle>
            <Briefcase className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeOpps}</div>
            <p className="text-xs text-slate-500">
              Clients with score &gt; 70
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              YTD Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-slate-500">
              Across all coverage
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Next Best Actions
            </CardTitle>
            <Zap className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{nextBestActionsCount}</div>
            <p className="text-xs text-slate-500">
              Pending actions identified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Left Column: Recommended Actions (Span 4) */}
        <div className="col-span-4 space-y-4">
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
                      <div className={`h-full ${item.color}`} style={{ width: item.exposure }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction Banking */}
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
        </div>

        {/* Right Column: Client Movers & Feed (Span 3) */}
        <div className="col-span-3 space-y-4">
          {/* Live Deals Card */}
          <Card className="shadow-md border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-slate-900">Live Deals</CardTitle>
                  <CardDescription>Active transactions in execution.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('deals')}>View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deals?.slice(0, 5).map((deal: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                        <Target className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 line-clamp-1">{deal.deal_name}</p>
                        <p className="text-xs text-slate-500">{deal.client_name} • {deal.stage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(deal.value)}</p>
                      <p className="text-xs text-slate-500">{deal.probability}% Prob.</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meetings Card */}
          <Card className="shadow-md border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-slate-500" />
                    Client Meetings
                  </CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('meetings')}>View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetings?.slice(0, 5).map((meeting: any, i: number) => (
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
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-slate-900">Market Intelligence</CardTitle>
                  <CardDescription>Live feed impacting your coverage.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('intel')}>View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketIntel?.slice(0, 4).map((intel: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 line-clamp-1">{intel.headline}</p>
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
              </div>
            </CardContent>
          </Card>

          {/* Forex & Commodities */}
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
        </div>
      </div>

      {/* Bottom Section: Market Intelligence */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Market Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <PieChart className="h-10 w-10 text-amber-500" />
              <div>
                <p className="text-2xl font-bold text-slate-900">Bullish</p>
                <p className="text-xs text-slate-500">Tech & Energy leading</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Volatility Index (VIX)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <BarChart3 className="h-10 w-10 text-slate-400" />
              <div>
                <p className="text-2xl font-bold text-slate-900">{(18.4 + (dateModifier * 0.5)).toFixed(2)}</p>
                <p className="text-xs text-slate-500">{(dateModifier % 2 === 0 ? '-' : '+')}{(1.2 + (dateModifier * 0.1)).toFixed(1)}% today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">10Y Treasury</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <TrendingUp className="h-10 w-10 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-slate-900">{(4.82 + (dateModifier * 0.05)).toFixed(2)}%</p>
                <p className="text-xs text-slate-500">+{5 + dateModifier}bps today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Pitchbook Generator Modal */}
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

      {/* Engagement Logging Modal */}
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
                  onChange={(e) => setFormData({...formData, clientId: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, sentiment: e.target.value})}
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
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Q4 Strategy Review" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="attendees">Attendees</Label>
                  <Input id="attendees" value={formData.attendees} onChange={(e) => setFormData({...formData, attendees: e.target.value})} placeholder="e.g. John Doe, Jane Smith" />
                </div>
              </>
            ) : engagementType === "client" ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="name">Client Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Company Name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tier">Tier</Label>
                    <select id="tier" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.tier} onChange={(e) => setFormData({...formData, tier: e.target.value})}>
                      <option>Platinum</option>
                      <option>Gold</option>
                      <option>Silver</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} placeholder="e.g. Tech" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="region">Region</Label>
                    <Input id="region" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} placeholder="e.g. NA, EMEA" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="wallet">Wallet Share (%)</Label>
                    <Input id="wallet" type="number" value={formData.wallet_share} onChange={(e) => setFormData({...formData, wallet_share: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="revenue">YTD Revenue ($)</Label>
                  <Input id="revenue" type="number" value={formData.revenue_ytd} onChange={(e) => setFormData({...formData, revenue_ytd: Number(e.target.value)})} />
                </div>
              </>
            ) : engagementType === "deal" ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="deal_name">Deal Name</Label>
                  <Input id="deal_name" value={formData.deal_name} onChange={(e) => setFormData({...formData, deal_name: e.target.value})} placeholder="Project X" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="deal_type">Type</Label>
                    <select id="deal_type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      <option>M&A</option>
                      <option>IPO</option>
                      <option>Debt</option>
                      <option>Restructuring</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stage">Stage</Label>
                    <select id="stage" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.stage} onChange={(e) => setFormData({...formData, stage: e.target.value})}>
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
                    <Input id="value" type="number" value={formData.value} onChange={(e) => setFormData({...formData, value: Number(e.target.value)})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prob">Probability (%)</Label>
                    <Input id="prob" type="number" value={formData.probability} onChange={(e) => setFormData({...formData, probability: Number(e.target.value)})} />
                  </div>
                </div>
              </>
            ) : engagementType === "transaction" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tx_type">Type</Label>
                    <select id="tx_type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      <option>Wire Transfer</option>
                      <option>FX Settlement</option>
                      <option>Trade Finance</option>
                      <option>Liquidity Sweep</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="direction">Direction</Label>
                    <select id="direction" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.direction} onChange={(e) => setFormData({...formData, direction: e.target.value})}>
                      <option>Inflow</option>
                      <option>Outflow</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <select id="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
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
                  <Input id="headline" value={formData.headline} onChange={(e) => setFormData({...formData, headline: e.target.value})} placeholder="Market News..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sector">Related Sector</Label>
                    <Input id="sector" value={formData.related_sector} onChange={(e) => setFormData({...formData, related_sector: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="source">Source</Label>
                    <Input id="source" value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="impact">Impact Score</Label>
                  <select id="impact" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.impact_score} onChange={(e) => setFormData({...formData, impact_score: e.target.value})}>
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
                <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
            )}

            {["interaction", "meeting"].includes(engagementType) && (
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea id="notes" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Enter details..." />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEngagementOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitEngagement}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meeting Agenda Modal */}
      <Dialog open={isAgendaOpen} onOpenChange={setIsAgendaOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Meeting Agenda</DialogTitle>
            <DialogDescription>
              {selectedMeeting?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Client</Label>
              <div className="col-span-3">{selectedMeeting?.client_name}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Date</Label>
              <div className="col-span-3">
                {selectedMeeting?.date && new Date(selectedMeeting.date).toLocaleString()}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Attendees</Label>
              <div className="col-span-3">
                {selectedMeeting?.attendees?.join(", ") || "No attendees listed"}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right font-bold mt-1">Notes / Agenda</Label>
              <div className="col-span-3">
                {isEditingAgenda ? (
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={agendaNotes}
                    onChange={(e) => setAgendaNotes(e.target.value)}
                  />
                ) : (
                  <div className="min-h-[100px] p-3 bg-slate-50 rounded-md border border-slate-100 text-sm">
                    {selectedMeeting?.notes || "No agenda details available."}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {isEditingAgenda ? (
              <>
                <Button variant="outline" onClick={() => setIsEditingAgenda(false)}>Cancel</Button>
                <Button onClick={handleUpdateAgenda}>Save Changes</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditingAgenda(true)}>Edit Agenda</Button>
                <Button onClick={() => setIsAgendaOpen(false)}>Close</Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* View All Modal */}
      <Dialog open={!!viewAllCategory} onOpenChange={(open) => !open && setViewAllCategory(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewAllCategory === 'actions' && "All Recommended Actions"}
              {viewAllCategory === 'transactions' && "All Transactions"}
              {viewAllCategory === 'deals' && "All Live Deals"}
              {viewAllCategory === 'meetings' && "All Client Meetings"}
              {viewAllCategory === 'intel' && "All Market Intelligence"}
              {viewAllCategory === 'rates' && "All Rates & Commodities"}
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
    </div>
  );
};
