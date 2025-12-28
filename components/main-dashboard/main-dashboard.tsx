"use client"
import { FC, useState, useRef } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy, addDoc, updateDoc, doc } from "firebase/firestore";
import { seedDatabase } from "@/lib/seed";
import { toast } from "@/components/ui/use-toast";

import { DashboardHeader } from "./components/dashboard-header";
import { KpiCards } from "./components/kpi-cards";
import { RecommendedActions } from "./components/recommended-actions";
import { SectorExposure } from "./components/sector-exposure";
import { TransactionBanking } from "./components/transaction-banking";
import { LiveDeals } from "./components/live-deals";
import { ClientMeetings } from "./components/client-meetings";
import { MarketIntelligence } from "./components/market-intelligence";
import { RatesAndCommodities } from "./components/rates-and-commodities";
import { MarketSentiment } from "./components/market-sentiment";
import { PitchbookGeneratorModal } from "./components/pitchbook-generator-modal";
import { EngagementLoggingModal } from "./components/engagement-logging-modal";
import { MeetingAgendaModal } from "./components/meeting-agenda-modal";
import { ViewAllModal } from "./components/view-all-modal";

const sectorColors: Record<string, string> = {
  "Technology": "bg-blue-500",
  "Healthcare": "bg-green-500",
  "Financials": "bg-amber-500",
  "Energy": "bg-red-500",
  "Consumer": "bg-purple-500",
};

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
            <p className="text-slate-500">Strategic Discussion Materials • ${currentDate.toLocaleDateString()}</p>
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
    if (["interaction", "meeting", "deal", "transaction"].includes(engagementType) && !formData.clientId) {
      toast({ title: "Missing Client", description: "Please select a client.", variant: "destructive" });
      return;
    }
    
    const client = clients?.find((c: any) => c.id === formData.clientId);

    if (!client) {
      toast({ title: "Client not found", description: "Please select a valid client.", variant: "destructive" });
      return;
    }

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
          relationship_score: 50,
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
          type: formData.type
        });
        toast({ title: "Deal Recorded", description: "New deal added to pipeline." });
      } else if (engagementType === "transaction") {
        await addDoc(collection(firestore, "transactions"), {
          client_name: client.name,
          type: formData.type,
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
      <DashboardHeader
        clients={clients || []}
        handleSeed={handleSeed}
        isSeeding={isSeeding}
        setIsEngagementOpen={setIsEngagementOpen}
        setIsPitchbookOpen={setIsPitchbookOpen}
        setSelectedClient={setSelectedClient}
      />

      <KpiCards
        activeOpps={activeOpps}
        totalRevenue={totalRevenue}
        nextBestActionsCount={nextBestActionsCount}
        formatCurrency={formatCurrency}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-4">
          <RecommendedActions clients={clients || []} setViewAllCategory={setViewAllCategory} />
          <SectorExposure sectorExposure={sectorExposure || []} sectorColors={sectorColors} />
          <TransactionBanking transactions={transactions || []} formatCurrency={formatCurrency} setViewAllCategory={setViewAllCategory} />
        </div>

        <div className="col-span-3 space-y-4">
          <LiveDeals deals={deals || []} formatCurrency={formatCurrency} setViewAllCategory={setViewAllCategory} />
          <ClientMeetings meetings={meetings || []} setViewAllCategory={setViewAllCategory} />
          <MarketIntelligence marketIntel={marketIntel || []} setViewAllCategory={setViewAllCategory} />
          <RatesAndCommodities marketRates={marketRates || []} setViewAllCategory={setViewAllCategory} />
        </div>
      </div>

      <MarketSentiment dateModifier={dateModifier} />

      <PitchbookGeneratorModal
        isPitchbookOpen={isPitchbookOpen}
        setIsPitchbookOpen={setIsPitchbookOpen}
        clients={clients || []}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        currentDate={currentDate}
        handleExportPdf={handleExportPdf}
        pitchbookRef={pitchbookRef}
        formatCurrency={formatCurrency}
        interactions={interactions || []}
        meetings={meetings || []}
        setSelectedMeeting={setSelectedMeeting}
        setAgendaNotes={setAgendaNotes}
        setIsEditingAgenda={setIsEditingAgenda}
        setIsAgendaOpen={setIsAgendaOpen}
      />

      <EngagementLoggingModal
        isEngagementOpen={isEngagementOpen}
        setIsEngagementOpen={setIsEngagementOpen}
        engagementType={engagementType}
        setEngagementType={setEngagementType}
        formData={formData}
        setFormData={setFormData}
        clients={clients || []}
        handleSubmitEngagement={handleSubmitEngagement}
      />

      <MeetingAgendaModal
        isAgendaOpen={isAgendaOpen}
        setIsAgendaOpen={setIsAgendaOpen}
        selectedMeeting={selectedMeeting}
        isEditingAgenda={isEditingAgenda}
        setIsEditingAgenda={setIsEditingAgenda}
        agendaNotes={agendaNotes}
        setAgendaNotes={setAgendaNotes}
        handleUpdateAgenda={handleUpdateAgenda}
      />

      <ViewAllModal
        viewAllCategory={viewAllCategory}
        setViewAllCategory={setViewAllCategory}
        clients={clients || []}
        transactions={transactions || []}
        deals={deals || []}
        meetings={meetings || []}
        marketIntel={marketIntel || []}
        marketRates={marketRates || []}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};
