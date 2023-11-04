import Provider from "@/providers/Providers";
import "@/styles/global.css";
import type { Session } from "next-auth";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";
import type { Metadata } from "next";
import getPathname from "@/utils/getPathname";
import removeTrailingSlash from "@/utils/removeTrailingSlash";
import clsx from "clsx";
import Sidebar from "@/components/sidebar";
import { Navbar } from "@/components/navbar/navbar";

const locales = ["en", "hr", "sr"];

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
    session: Session;
  };
}

const poppins = Poppins({
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default async function LocaleLayout({ children, params }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === params.locale);
  if (!isValidLocale) notFound();

  const messages = (await import(`../../messages/${params.locale}.json`)).default;

  return (
    <html lang={params.locale}>
      <body className={clsx(poppins.className, "min-h-screen")}>
        <Provider
          locale={params.locale}
          messages={messages}
          session={params.session}
        >
          <Sidebar />
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale();
  const t = await getTranslator(locale);
  const pathname = getPathname();

  return {
    alternates: {
      canonical: `/${locale}${removeTrailingSlash(pathname || "")}`,
      languages: {
        en: `/en${removeTrailingSlash(pathname || "")}`,
        hr: `/hr${removeTrailingSlash(pathname || "")}`,
        sr: `/sr${removeTrailingSlash(pathname || "")}`
      }
    },
    description: t("meta.main.description"),
    icons: {
      apple: {
        sizes: "180x180",
        url: "/favicon/apple-touch-icon.png"
      },
      icon: [
        {
          sizes: "16x16",
          type: "image/png",
          url: "/favicon/favicon-16x16.png"
        },
        {
          sizes: "32x32",
          type: "image/png",
          url: "/favicon/favicon-32x32.png"
        }
      ],
      other: {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg"
      },
      shortcut: "/favicon/favicon.ico"
    },
    manifest: "/site.webmanifest",
    metadataBase: new URL(process.env.FRONTEND_URL as string),
    openGraph: {
      description: t("meta.main.description"),
      images: [
        {
          height: 635,
          url: process.env.FRONTEND_URL + "/images/OpenGraph.png",
          width: 1200
        }
      ],
      locale: locale,
      title: t("meta.main.title"),
      type: "website",
      url: `/${locale}${removeTrailingSlash(pathname || "")}`
    },
    other: {
      google: "notranslate"
    },
    themeColor: "#ffffff",
    title: {
      default: t("meta.main.title"),
      template: "%s | App"
    },
    twitter: {
      card: "summary_large_image"
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION
    }
  };
}
