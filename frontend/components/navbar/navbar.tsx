"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";

import { NavbarMobile } from "./navbar-mobile";
import { forwardRef } from "react";

const Navbar = () => {
  return (
    <>
      <div className="justify-between items-center px-6 flex sm:hidden mt-4 mb-4">
        <Image src="/images/nextCity.png" width={70} height={70} alt="logo" />
        <NavbarMobile />
      </div>
    </>
  );
};

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ children, className, title, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

export { Navbar, ListItem };
