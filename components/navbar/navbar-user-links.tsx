"use client";

import { UserNav } from "@/components/navbar/user-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { useUser } from "reactfire";

export const NavbarUserLinks: FC = () => {
  const { data, hasEmitted } = useUser();

  return (
    <>
      {hasEmitted && data ? (
        <>
          <Link href="/app" className={buttonVariants({ variant: "ghost", className: "text-slate-300 hover:text-white hover:bg-slate-800" })}>
            Dashboard
          </Link>
          <UserNav />
        </>
      ) : (
        <>
          <Link href="/login" className={buttonVariants({ className: "bg-amber-600 hover:bg-amber-700 text-white border-none" })}>
            Login / Register &rarr;
          </Link>
        </>
      )}
    </>
  );
};
