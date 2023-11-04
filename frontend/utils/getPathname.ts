import { headers } from "next/headers";
import { locales } from "@/constants/locales";
import ReqHeaders from "@/constants/enums/ReqHeaders";

function removeLocaleFromUrl(url: string) {
  let tempString = url;
  const removeLocale = (locale: string) => {
    tempString = tempString.replace(`/${locale}`, "");
    if (!tempString) {
      tempString = "/";
    }
  };

  locales.forEach((locale) => {
    removeLocale(locale);
  });

  return tempString;
}

export default function getPathname() {
  const url = headers().get(ReqHeaders.PATHNAME);

  if (url) {
    return removeLocaleFromUrl(url);
  } else return null;
}
