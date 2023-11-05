import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function BillingPage() {
  const locale = useLocale();
  const t = await getTranslator(locale);

  return (
    <main className="p-6">
      <h1 className="heading1">{t("billing.title")}</h1>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-5 mt-10">
        <Link href="/billing/65811">
          <Card className="w-full">
            <CardContent className="flex justify-center items-center flex-col p-5">
              <Image
                src="/images/autotrolej-logo.png"
                width={100}
                height={100}
                alt="autotrolej logo"
              />
              <h1 className="base-semibold pt-5">Autotrolej d.o.o.</h1>
              <p className="pt-2">{t("billing.autotrolej")}</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/billing/65812">
          <Card className="w-full h-full flex justify-center items-end">
            <CardContent className="flex justify-center items-center flex-col p-5">
              <Image
                src="/images/rijeka-plus-logo.png"
                width={100}
                height={100}
                alt="rijeka plus logo"
              />
              <h1 className="base-semibold pt-5">Rijeka Plus d.o.o.</h1>
              <p className="pt-2">{t("billing.rijeka-plus")}</p>
            </CardContent>
          </Card>
        </Link>
      </section>
    </main>
  );
}
