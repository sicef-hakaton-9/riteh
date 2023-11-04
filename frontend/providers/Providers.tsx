"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/toaster";
import GlobalHooks from "./GlobalHooks";

export default function Provider({
  children,
  locale,
  messages,
  session
}: {
  children: React.ReactNode;
  session: Session;
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SessionProvider session={session}>
          {children}
          <GlobalHooks />
        </SessionProvider>
        <Toaster />
      </NextIntlClientProvider>
    </>
  );
}
