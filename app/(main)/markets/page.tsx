import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function MarketsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-12">
      {/* Hero */}
      <section className="bg-slate-950 py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl space-y-4">
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">Global Markets</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Market Intelligence
            </h1>
            <p className="text-lg text-slate-400">
              Real-time pricing, liquidity, and risk analytics across asset classes.
            </p>
          </div>
        </div>
      </section>

      <div className="container -mt-8 space-y-8">
        {/* Indices Grid */}
        <div className="grid gap-4 md:grid-cols-4">
            {/* Mock Indices */}
            {[
                { name: "S&P 500", value: "4,325.12", change: "+0.45%", up: true },
                { name: "NASDAQ", value: "13,450.22", change: "+0.82%", up: true },
                { name: "FTSE 100", value: "7,650.10", change: "-0.12%", up: false },
                { name: "Nikkei 225", value: "32,100.50", change: "+1.20%", up: true },
            ].map((index, i) => (
                <Card key={i} className="shadow-lg border-slate-200">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{index.name}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{index.value}</h3>
                            </div>
                            <div className={`flex items-center ${index.up ? 'text-green-600' : 'text-red-600'}`}>
                                {index.up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                <span className="text-sm font-bold">{index.change}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Market Commentary</CardTitle>
                        <CardDescription>Daily insights from the trading desk.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="secondary" className="text-xs">Macro</Badge>
                                    <span className="text-xs text-slate-500">2 hours ago</span>
                                </div>
                                <h4 className="text-base font-semibold text-slate-900">Yield Curve Inversion Deepens as Fed Signals Higher for Longer</h4>
                                <p className="text-sm text-slate-600 mt-1">Treasury yields surged across the curve following the latest FOMC minutes...</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="bg-slate-950 text-white border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Activity className="h-5 w-5 text-amber-500" />
                            Volatility Alert
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">VIX Index</span>
                                    <span className="font-bold">18.45</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-[45%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">MOVE Index</span>
                                    <span className="font-bold">125.20</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 w-[75%]"></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
