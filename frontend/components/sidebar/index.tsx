"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Bus,
  Home,
  Newspaper,
  ParkingSquare,
  // Receipt,
  Tag,
  Trash2
} from "lucide-react";
import LocaleSwitcher from "../navbar/locale-switcher";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Endpoints from "@/constants/enums/Endpoints";
import { Separator } from "../ui/separator";

export default function Sidebar() {
  const t = useTranslations();
  const session = useSession();

  const items = [
    {
      href: Endpoints.HOME,
      icon: <Home className="h-5 w-5" />,
      label: t("sidebar.home")
    },
    {
      href: Endpoints.NEWS,
      icon: <Newspaper className="h-5 w-5" />,
      label: t("sidebar.news")
    },
    {
      href: Endpoints.PARKING,
      icon: <ParkingSquare className="h-5 w-5" />,
      label: t("sidebar.parking")
    },
    {
      href: Endpoints.BUSES,
      icon: <Bus className="h-5 w-5" />,
      label: t("sidebar.buses")
    },
    {
      href: Endpoints.WASTE,
      icon: <Trash2 className="h-5 w-5" />,
      label: t("sidebar.waste")
    },
    {
      href: Endpoints.TICKETING,
      icon: <Tag className="h-5 w-5" />,
      label: t("sidebar.ticketing")
    }
    // {
    //   href: Endpoints.BILLS,
    //   icon: <Receipt className="h-5 w-5" />,
    //   label: t("sidebar.bills")
    // }
  ];

  return (
    <div
      id="sidebar"
      className="sm:sticky hidden sm:block left-0 top-0 z-40 h-screen w:1/4 xl:w-1/5 transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
          logo
        </div>
        <ul className="space-y-2 text-sm font-medium">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
              >
                {item.icon}
                <span className="ml-3 flex-1 whitespace-nowrap">{item.label}</span>
              </Link>
            </li>
          ))}
          <Separator />
          <LocaleSwitcher />
        </ul>
        <div className="mt-auto flex">
          {session.status === "loading" ? (
            <Skeleton className="w-full h-[30px] rounded-md m-3" />
          ) : session.data ? (
            <div className="flex w-full justify-between m-3">
              <span className="text-sm font-medium text-black dark:text-white">
                {session.data?.user.email}
              </span>
              <LogOut
                className="h-5 w-5 cursor-pointer"
                onClick={async () => signOut()}
              />
            </div>
          ) : (
            <div className="m-3">
              <Button className="mr-2" variant={"blue"}>
                <span>{t("auth.login")}</span>
              </Button>
              <Button>
                <span>{t("auth.register")}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
