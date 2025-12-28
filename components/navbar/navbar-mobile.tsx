"use client";

import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuIcon } from "lucide-react";

export const NavbarMobile = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="-mr-4 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white">
              <MenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col p-1">
              <NavigationMenuLink
                href="#1"
                className={buttonVariants({ variant: "link" })}
              >
                Markets
              </NavigationMenuLink>
              <NavigationMenuLink
                href="#2"
                className={buttonVariants({ variant: "link" })}
              >
                Banking
              </NavigationMenuLink>
              <NavigationMenuLink
                href="#3"
                className={buttonVariants({ variant: "link" })}
              >
                Research
              </NavigationMenuLink>
              <div className="flex flex-col mb-0.5">
                <NavbarUserLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
