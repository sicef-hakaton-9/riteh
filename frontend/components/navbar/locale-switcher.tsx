"use client";

import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

import { locales } from "@/constants/locales";

import { ListItem } from "./navbar";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();

  const getFlag = (locale?: string) => {
    switch (locale) {
      case "hr":
        return "/images/croatia.png";
      case "en":
        return "/images/uk.png";
      case "sr":
        return "/images/serbia.png";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="hidden sm:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Image
                  src={getFlag(locale)}
                  width={20}
                  height={20}
                  alt="flag"
                  className="mx-2"
                />
                {locale?.toUpperCase()}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {locales.map((locale: string) => {
                  return (
                    <Link href={`/${locale}`} locale={locale} key={locale}>
                      <ListItem>
                        <div className="flex pr-7">
                          <Image
                            src={getFlag(locale)}
                            width={20}
                            height={20}
                            alt="flag"
                            className="mx-2"
                          />
                          {locale.toUpperCase()}
                        </div>
                      </ListItem>
                    </Link>
                  );
                })}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="sm:hidden grid gap-4 py-4">
        {locales.map((locale: string) => {
          return (
            <Link href={`/${locale}`} locale={locale} key={locale}>
              <div className="flex pr-7 items-center">
                <Image
                  src={getFlag(locale)}
                  width={40}
                  height={40}
                  alt="flag"
                  className="mr-4"
                />
                {locale.toUpperCase()}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
