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
  TrafficCone,
  Trash2
} from "lucide-react";
import LocaleSwitcher from "../navbar/locale-switcher";
import Endpoints from "@/constants/enums/Endpoints";
import { Separator } from "../ui/separator";

export default function Sidebar() {
  const t = useTranslations();

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
      href: Endpoints.TRAFFIC,
      icon: <TrafficCone className="h-5 w-5" />,
      label: t("sidebar.traffic")
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
      className="sm:sticky hidden sm:block left-0 top-0 z-40 h-screen w:1/4 lg:w-1/6 transition-transform"
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
        <div className="mt-auto flex ">
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium text-black dark:text-white">
              email@example.com
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-roledescription="more menu"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5 text-black dark:text-white"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
