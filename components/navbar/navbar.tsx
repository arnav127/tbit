import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <>
      <div className="animate-in fade-in w-full">
        <nav className="container px-6 md:px-8 py-4">
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center">
                <img
                  src="/assets/Goldman_Sachs.svg"
                  alt="Goldman Sachs Nexus Logo"
                  className="h-12 w-12 mr-4"
                />
                <span className="text-xl font-semibold tracking-tighter text-slate-800 mr-6">
                  Goldman Sachs Nexus
                </span>
              </div>
            </Link>
            <div className="hidden md:flex justify-between grow">
              <div>
                <Link href="#1" className={buttonVariants({ variant: "link" })}>
                  Features
                </Link>
                <Link href="#2" className={buttonVariants({ variant: "link" })}>
                  About
                </Link>
                <Link href="#3" className={buttonVariants({ variant: "link" })}>
                  Acknowledgement
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <NavbarUserLinks />
              </div>
            </div>
            <div className="grow md:hidden flex justify-end">
              <NavbarMobile />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
