import { AuthCard } from "@/components/auth-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[50%] -left-[20%] w-[70%] h-[70%] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-slate-800/20 blur-[80px]" />
      </div>

      <div className="absolute top-8 left-8 z-20">
        <Link href="/">
          <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <section className="w-full max-w-md space-y-8 z-10 px-4">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-amber-900/20">
            <span className="text-slate-950 font-bold text-xl">GS</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="text-slate-400">
            Enter your credentials to access the Nexus platform.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-2xl">
          <AuthCard />
        </div>
      </section>
    </div>
  );
}
