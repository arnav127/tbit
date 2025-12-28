import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, BarChart3, Globe, Lock, Users, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold text-slate-100 sm:inline-block">
                GS Nexus
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium text-slate-300">
              <Link href="#" className="hover:text-amber-500 transition-colors">Markets</Link>
              <Link href="#" className="hover:text-amber-500 transition-colors">Banking</Link>
              <Link href="#" className="hover:text-amber-500 transition-colors">Research</Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 bg-slate-950">
          <div className="container flex flex-col items-center gap-4 text-center">
            <Badge variant="outline" className="border-amber-500/40 text-amber-500 uppercase tracking-widest">
              Internal Prototype
            </Badge>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              Goldman Sachs <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 px-1">Nexus</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-slate-400 sm:text-xl sm:leading-8">
              Unified portal for Pricing, Risk, and Relationship Management. 
              Leveraging data intelligence to drive client success.
            </p>
            <div className="space-x-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white border-none">
                  Enter Platform
                </Button>
              </Link>
              <Link target="_blank" href="https://github.com/arnav127/tbit">
                <Button size="lg" variant="outline" className="text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white">
                  View Code
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-8 md:py-12 lg:py-24 -mt-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8">
            <Card className="bg-white/95 backdrop-blur border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Activity className="h-5 w-5 text-amber-600" />
                  Market Intelligence
                </CardTitle>
                <CardDescription>
                  Real-time pricing and risk information directly from SecDB.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Live feeds, volatility indices, and personalized market summaries tailored to your coverage.
              </CardContent>
            </Card>
            
            <Card className="bg-white/95 backdrop-blur border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Users className="h-5 w-5 text-amber-600" />
                  Client 360
                </CardTitle>
                <CardDescription>
                  Integrated Salesforce contact data and relationship history.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Holistic view of client interactions, deal flow, and coverage team coordination.
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Zap className="h-5 w-5 text-amber-600" />
                  Actionable Insights
                </CardTitle>
                <CardDescription>
                  AI-driven pitch recommendations and timing signals.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Predictive analytics to identify the right product for the right client at the right time.
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-slate-900">
              Data-Driven Banking
            </h2>
            <p className="max-w-[85%] leading-normal text-slate-500 sm:text-lg sm:leading-7">
              Nexus aggregates data from across the firm to provide a single source of truth for bankers.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
            <div className="relative overflow-hidden rounded-lg border bg-slate-50 p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <BarChart3 className="h-12 w-12 text-slate-900" />
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900">Analytics</h3>
                  <p className="text-sm text-slate-500">Deep dive into portfolio performance.</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-slate-50 p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Globe className="h-12 w-12 text-slate-900" />
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900">Global Reach</h3>
                  <p className="text-sm text-slate-500">Cross-border payment flows and FX.</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-slate-50 p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Lock className="h-12 w-12 text-slate-900" />
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900">Secure</h3>
                  <p className="text-sm text-slate-500">Enterprise-grade security and compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 md:px-8 md:py-0 border-t bg-slate-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-slate-500 md:text-left">
            Built for TBIT project at IIM Ahmedabad. No official relation to Goldman Sachs.
          </p>
        </div>
      </footer>
    </div>
  );
}
