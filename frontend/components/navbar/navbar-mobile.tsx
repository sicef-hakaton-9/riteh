"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { Bus, Home, LogOut, ParkingSquare, Tag, Trash2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Endpoints from "@/constants/enums/Endpoints";

export function NavbarMobile() {
  const t = useTranslations();
  const session = useSession();
  const router = useRouter();

  const items = [
    {
      href: "/",
      icon: <Home className="h-5 w-5" />,
      label: t("sidebar.home")
    },
    {
      href: "/parking",
      icon: <ParkingSquare className="h-5 w-5" />,
      label: t("sidebar.parking")
    },
    {
      href: "/buses",
      icon: <Bus className="h-5 w-5" />,
      label: t("sidebar.buses")
    },
    {
      href: "/waste",
      icon: <Trash2 className="h-5 w-5" />,
      label: t("sidebar.waste")
    },
    {
      href: "/ticketing",
      icon: <Tag className="h-5 w-5" />,
      label: t("sidebar.ticketing")
    }
  ];

  if (session.data?.user.role === "business") {
    items.push({
      href: "/admin-tickets",
      icon: <Tag className="h-5 w-5" />,
      label: t("sidebar.adminTickets")
    });
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <HamburgerMenuIcon className="h-6 w-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <div className="grid gap-4 py-4">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
              >
                {item.icon}
                <span className="ml-3 flex-1 whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <span className="ml-3 flex-1 whitespace-nowrap">
              {t("chooseLanguage")}
            </span>
            <LocaleSwitcher />
          </div>
          <div className="mt-auto flex gap-2 justify-end">
            {session.data ? (
              <>
                {session.data?.user.email}
                <LogOut
                  onClick={() => {
                    signOut();
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    router.push(Endpoints.LOGIN);
                  }}
                >
                  {t("auth.login")}
                </Button>
                <Button
                  onClick={() => {
                    router.push(Endpoints.REGISTER);
                  }}
                >
                  {t("auth.register")}
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
