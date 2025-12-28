import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, DollarSign, FileText } from "lucide-react";

export default function BankingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-12">
      <section className="bg-slate-950 py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl space-y-4">
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">Investment Banking</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Deal Flow & Advisory
            </h1>
            <p className="text-lg text-slate-400">
              Comprehensive financing and strategic advisory solutions.
            </p>
          </div>
        </div>
      </section>

      <div className="container -mt-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
            <Card className="shadow-lg border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Mandates</CardTitle>
                    <Briefcase className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">14</div>
                    <p className="text-xs text-slate-500">+2 from last month</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$4.2B</div>
                    <p className="text-xs text-slate-500">Estimated fees: $85M</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pitch Activity</CardTitle>
                    <FileText className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-slate-500">Proposals sent this week</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Closed deals and tombstones.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {[
                        { client: "Stark Industries", type: "M&A Advisory", deal: "Acquisition of Hammer Tech", value: "$2.5B", date: "Oct 2023" },
                        { client: "Wayne Enterprises", type: "Debt Capital Markets", deal: "Green Bond Issuance", value: "$500M", date: "Sep 2023" },
                        { client: "Cyberdyne Systems", type: "Equity Capital Markets", deal: "Follow-on Offering", value: "$1.2B", date: "Aug 2023" },
                    ].map((deal, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-slate-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{deal.client}</p>
                                    <p className="text-sm text-slate-500">{deal.type} • {deal.deal}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900">{deal.value}</p>
                                <p className="text-xs text-slate-500">{deal.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
