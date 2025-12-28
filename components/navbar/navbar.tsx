import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <nav className="container flex h-14 items-center px-6 md:px-8">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <div className="h-6 w-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm flex items-center justify-center">
              <span className="text-[10px] font-bold text-slate-950">GS</span>
            </div>
            <span className="hidden font-bold text-slate-100 sm:inline-block">
              GS Nexus
            </span>
          </Link>
          <div className="flex items-center space-x-6 text-sm font-medium text-slate-300">
            <Link href="#1" className="hover:text-amber-500 transition-colors">
              Features
            </Link>
            <Link href="#2" className="hover:text-amber-500 transition-colors">
              About
            </Link>
            <Link href="#3" className="hover:text-amber-500 transition-colors">
              Acknowledgement
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center mr-auto">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-slate-100">GS Nexus</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-4">
            <NavbarUserLinks />
          </div>
          <div className="md:hidden">
            <NavbarMobile />
          </div>
        </div>
      </nav>
    </header>
  );
};
