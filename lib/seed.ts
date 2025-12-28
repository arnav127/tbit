import { Firestore, writeBatch, doc, collection } from "firebase/firestore";

export const seedDatabase = async (db: Firestore) => {
  const batch = writeBatch(db);

  const clients = [
    {
      name: "Wayne Enterprises",
      tier: "Platinum",
      relationship_score: 98,
      personalization_tags: ["ESG Focused", "Infrastructure"],
      next_best_action: "Pitch Green Bond Series B",
      industry: "Conglomerate",
      region: "North America",
      wallet_share: 45,
      revenue_ytd: 12500000,
    },
    {
      name: "Stark Industries",
      tier: "Platinum",
      relationship_score: 92,
      personalization_tags: ["Aggressive Growth", "Tech M&A"],
      next_best_action: "Review Cross-Border Acquisition",
      industry: "Technology",
      region: "North America",
      wallet_share: 65,
      revenue_ytd: 28000000,
    },
    {
      name: "Acme Corp",
      tier: "Gold",
      relationship_score: 75,
      personalization_tags: ["Cost Reduction", "Retail"],
      next_best_action: "Discuss FX Hedging Strategy",
      industry: "Consumer Goods",
      region: "EMEA",
      wallet_share: 20,
      revenue_ytd: 4500000,
    },
    {
      name: "Cyberdyne Systems",
      tier: "Silver",
      relationship_score: 45,
      personalization_tags: ["AI Research", "High Risk"],
      next_best_action: "Re-engage CFO",
      industry: "Technology",
      region: "North America",
      wallet_share: 10,
      revenue_ytd: 1200000,
    },
    {
      name: "Massive Dynamic",
      tier: "Gold",
      relationship_score: 82,
      personalization_tags: ["Biotech", "Defensive"],
      next_best_action: "Propose Share Buyback",
      industry: "Healthcare",
      region: "North America",
      wallet_share: 35,
      revenue_ytd: 8900000,
    },
    {
      name: "Oscorp",
      tier: "Silver",
      relationship_score: 60,
      personalization_tags: ["Chemicals", "Volatility"],
      next_best_action: "Send Market Volatility Report",
      industry: "Materials",
      region: "North America",
      wallet_share: 15,
      revenue_ytd: 2100000,
    },
    {
      name: "LexCorp",
      tier: "Platinum",
      relationship_score: 89,
      personalization_tags: ["Real Estate", "Tax Efficiency"],
      next_best_action: "Structured Note Offering",
      industry: "Real Estate",
      region: "North America",
      wallet_share: 55,
      revenue_ytd: 15600000,
    },
    {
      name: "Globex",
      tier: "Gold",
      relationship_score: 78,
      personalization_tags: ["Logistics", "Emerging Markets"],
      next_best_action: "Trade Finance Facility",
      industry: "Industrials",
      region: "EMEA",
      wallet_share: 30,
      revenue_ytd: 6700000,
    },
    {
      name: "Soylent Corp",
      tier: "Silver",
      relationship_score: 55,
      personalization_tags: ["Food & Bev", "Sustainability"],
      next_best_action: "ESG Rating Advisory",
      industry: "Consumer Goods",
      region: "APAC",
      wallet_share: 12,
      revenue_ytd: 900000,
    },
    {
      name: "Tyrell Corp",
      tier: "Platinum",
      relationship_score: 94,
      personalization_tags: ["Robotics", "Long-term Hold"],
      next_best_action: "Private Placement",
      industry: "Technology",
      region: "North America",
      wallet_share: 70,
      revenue_ytd: 32000000,
    },
    {
      name: "Hooli",
      tier: "Gold",
      relationship_score: 70,
      personalization_tags: ["SaaS", "IPO Readiness"],
      next_best_action: "Pre-IPO Roadshow Prep",
      industry: "Technology",
      region: "North America",
      wallet_share: 25,
      revenue_ytd: 5400000,
    },
    {
      name: "E Corp",
      tier: "Platinum",
      relationship_score: 30,
      personalization_tags: ["Conglomerate", "Distressed"],
      next_best_action: "Restructuring Dialogue",
      industry: "Conglomerate",
      region: "North America",
      wallet_share: 80,
      revenue_ytd: 45000000,
    },
  ];

  const marketIntel = [
    { headline: "Fed Signals Rate Pause", related_sector: "Macro", impact_score: "High", source: "Bloomberg", time: "10m ago" },
    { headline: "Tech Sector Rally Continues", related_sector: "Technology", impact_score: "Medium", source: "Reuters", time: "1h ago" },
    { headline: "Energy Prices Spike on Geopolitical Tension", related_sector: "Energy", impact_score: "High", source: "FT", time: "2h ago" },
    { headline: "New ESG Disclosure Rules Announced", related_sector: "Regulatory", impact_score: "Medium", source: "WSJ", time: "4h ago" },
    { headline: "Consumer Confidence Dips", related_sector: "Consumer", impact_score: "Low", source: "CNBC", time: "5h ago" },
  ];

  const deals = [
    { client_name: "Stark Industries", deal_name: "Project Iron", stage: "Execution", value: 2500000000, probability: 90, type: "M&A" },
    { client_name: "Wayne Enterprises", deal_name: "Gotham Bond Issuance", stage: "Pitch", value: 500000000, probability: 40, type: "DCM" },
    { client_name: "Tyrell Corp", deal_name: "Nexus 6 IPO", stage: "Mandate", value: 1200000000, probability: 75, type: "ECM" },
    { client_name: "Massive Dynamic", deal_name: "Bio-Tech Acquisition", stage: "Due Diligence", value: 300000000, probability: 60, type: "M&A" },
  ];

  const transactions = [
    { client_name: "Wayne Enterprises", type: "Wire Transfer", amount: 15000000, currency: "USD", status: "Completed", date: new Date().toISOString(), direction: "Outflow" },
    { client_name: "Stark Industries", type: "FX Settlement", amount: 5000000, currency: "EUR", status: "Completed", date: new Date(Date.now() - 86400000).toISOString(), direction: "Inflow" },
    { client_name: "Acme Corp", type: "Trade Finance LC", amount: 750000, currency: "USD", status: "Pending", date: new Date(Date.now() + 86400000).toISOString(), direction: "Outflow" },
    { client_name: "Globex", type: "Liquidity Sweep", amount: 2300000, currency: "GBP", status: "Completed", date: new Date().toISOString(), direction: "Inflow" },
    { client_name: "Tyrell Corp", type: "Payroll Batch", amount: 4500000, currency: "USD", status: "Processing", date: new Date().toISOString(), direction: "Outflow" },
  ];

  const marketRates = [
    { category: "Forex", symbol: "EUR/USD", price: 1.0542, change: -0.0025, trend: "down" },
    { category: "Forex", symbol: "GBP/USD", price: 1.2150, change: 0.0012, trend: "up" },
    { category: "Forex", symbol: "USD/JPY", price: 149.85, change: 0.55, trend: "up" },
    { category: "Commodities", symbol: "Gold", price: 1985.50, change: 12.40, trend: "up" },
    { category: "Commodities", symbol: "Brent Crude", price: 88.20, change: -1.10, trend: "down" },
    { category: "Commodities", symbol: "Natural Gas", price: 3.45, change: 0.05, trend: "up" },
  ];

  const meetings = [
    { client_name: "Wayne Enterprises", title: "Q4 Strategic Review", date: new Date(Date.now() + 86400000 * 2).toISOString(), type: "Upcoming", attendees: ["Bruce W.", "Lucius F."] },
    { client_name: "Stark Industries", title: "M&A Deal Closing", date: new Date(Date.now() + 86400000 * 5).toISOString(), type: "Upcoming", attendees: ["Tony S.", "Pepper P."] },
    { client_name: "Tyrell Corp", title: "IPO Roadshow Prep", date: new Date(Date.now() - 86400000 * 2).toISOString(), type: "Past", outcome: "Positive - Moving to next stage", notes: "Client requested updated valuation model." },
    { client_name: "Massive Dynamic", title: "Risk Management Audit", date: new Date(Date.now() - 86400000 * 5).toISOString(), type: "Past", outcome: "Neutral - Follow up required", notes: "Concerns about FX exposure." },
  ];

  clients.forEach((client) => {
    const clientId = client.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const clientRef = doc(collection(db, "clients"), clientId);
    batch.set(clientRef, {
      ...client,
      id: clientId,
      last_contact: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString(),
    });

    // Add interactions
    const interactionRef = doc(collection(db, "interactions"));
    batch.set(interactionRef, {
      client_id: clientId,
      client_name: client.name,
      type: ["Call", "Email", "Dinner", "Meeting"][Math.floor(Math.random() * 4)],
      sentiment: ["Positive", "Neutral", "Negative"][Math.floor(Math.random() * 3)],
      notes: "Discussed strategic initiatives and Q4 outlook.",
      date: new Date(Date.now() - Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000)).toISOString(),
    });
  });

  marketIntel.forEach((intel, idx) => {
    const intelRef = doc(collection(db, "market_intel"), `intel-${idx}`);
    batch.set(intelRef, intel);
  });

  deals.forEach((deal, idx) => {
    const dealRef = doc(collection(db, "deals"), `deal-${idx}`);
    batch.set(dealRef, deal);
  });

  transactions.forEach((tx, idx) => {
    const ref = doc(collection(db, "transactions"), `tx-${idx}`);
    batch.set(ref, tx);
  });

  marketRates.forEach((rate, idx) => {
    const ref = doc(collection(db, "market_rates"), `rate-${idx}`);
    batch.set(ref, rate);
  });

  meetings.forEach((meeting, idx) => {
    const ref = doc(collection(db, "meetings"), `meeting-${idx}`);
    batch.set(ref, meeting);
  });

  await batch.commit();
};