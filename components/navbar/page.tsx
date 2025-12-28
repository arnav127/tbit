import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function ResearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-12">
      <section className="bg-slate-950 py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl space-y-4">
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">Global Investment Research</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Insights & Analysis
            </h1>
            <p className="text-lg text-slate-400">
              Fundamental insights, macro-economic analysis, and sector deep dives.
            </p>
          </div>
        </div>
      </section>

      <div className="container -mt-8 space-y-8">
        <div className="grid gap-8 md:grid-cols-3">
            {/* Featured Report */}
            <Card className="md:col-span-2 shadow-lg border-slate-200">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Featured</Badge>
                        <span className="text-sm text-slate-500">Oct 24, 2023</span>
                    </div>
                    <CardTitle className="text-2xl">The Future of AI in Financial Services</CardTitle>
                    <CardDescription className="text-base">
                        An in-depth look at how generative AI is reshaping banking, risk management, and customer experience.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 mb-6">
                        Our latest thematic report explores the transformative potential of large language models...
                    </p>
                    <Button>Read Full Report</Button>
                </CardContent>
            </Card>

            {/* Conviction List */}
            <Card className="shadow-lg border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        Conviction List
                    </CardTitle>
                    <CardDescription>Top rated ideas from our analysts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { ticker: "NVDA", name: "NVIDIA Corp", rating: "Buy", target: "$500" },
                            { ticker: "MSFT", name: "Microsoft", rating: "Buy", target: "$400" },
                            { ticker: "JPM", name: "JPMorgan Chase", rating: "Buy", target: "$170" },
                        ].map((stock, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-bold text-slate-900">{stock.ticker}</p>
                                    <p className="text-xs text-slate-500">{stock.name}</p>
                                </div>
                                <div className="text-right">
                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 mb-1">{stock.rating}</Badge>
                                    <p className="text-xs text-slate-500">Target: {stock.target}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["Macro Economics", "Commodities", "Emerging Markets", "Fixed Income"].map((topic, i) => (
                <Card key={i} className="hover:border-amber-500 transition-colors cursor-pointer group">
                    <CardHeader>
                        <CardTitle className="text-lg group-hover:text-amber-600 transition-colors">{topic}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-500">Latest reports and data.</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}