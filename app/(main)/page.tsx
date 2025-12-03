import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="grow flex flex-col items-center justify-evenly">
        <section className="space-y-6">
          <div className="container flex flex-col items-center gap-8 text-center">
            <Badge variant="destructive">Note: This application is created as part of an assignment for TBIT at IIM Ahmedabad and has no relation to Goldman Sachs</Badge>
            <Badge className="space-x-4 font-normal text-sm">
              <p>
                <span className="font-bold">Trade Data</span>
              </p>
              <p>
                <span className="font-bold">Relationship Data</span>
              </p>
              <p>
                <span className="font-bold">Payment Data</span>
              </p>
            </Badge>
            <h1 className="max-w-4xl font-heading font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              Goldman Sachs Nexus
            </h1>
            <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              The unified Goldman portal to access Pricing and Risk information from SecDB along with Contact Information 
              from Salesforce and Cash Flows from the TxB Platform
            </p>
            <div className="space-x-4">
              <Link href="/login">
                <Button size="lg">Login / Register &rarr;</Button>
              </Link>
              <Link target="_blank" href="https://github.com/arnav127/tbit">
                <Button size="lg" variant="link">
                  View Code on GitHub &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
