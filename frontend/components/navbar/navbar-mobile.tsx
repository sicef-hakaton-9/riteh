"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import {
  Bus,
  Home,
  Newspaper,
  ParkingSquare,
  Receipt,
  Tag,
  Trash2
} from "lucide-react";

export function NavbarMobile() {
  const t = useTranslations();

  const items = [
    {
      href: "/",
      icon: <Home className="h-5 w-5" />,
      label: t("sidebar.home")
    },
    {
      href: "/news",
      icon: <Newspaper className="h-5 w-5" />,
      label: t("sidebar.news")
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
    },
    {
      href: "/bills",
      icon: <Receipt className="h-5 w-5" />,
      label: t("sidebar.bills")
    }
  ];

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <HamburgerMenuIcon className="h-6 w-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
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
        </SheetContent>
      </Sheet>
    </div>
  );
}