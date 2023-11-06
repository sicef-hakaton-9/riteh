"use client";

import CheckoutLoader from "@/components/checkout";
import { Skeleton } from "@/components/ui/skeleton";
import { Products } from "@/constants/checkout";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Checkout({
  params: { id }
}: {
  params: { id: "65811" | "65812" };
}) {
  const { description, image, title } = Products[id];

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    currency: null,
    subtotal: null,
    tax: null,
    tax_rate: null,
    total: null
  });

  useEffect(() => {}, []);

  return (
    <main className="flex w-full max-md:flex-col justify-center md:items-start items-center">
      <div className="p-6 md:w-1/2 lg:checkout shadow-lg md:h-[100vh]">
        <h2 className="heading4 pb-3">Checkout Summary</h2>
        <Image
          src={image}
          width={500}
          height={250}
          className="h-auto w-full rounded-lg object-cover"
          priority={true}
          alt="course"
        />

        <div className="w-full space-y-4 mt-6">
          <p className="paragraph-semibold">{title}</p>
          <p className="body-regular text-text">{description}</p>

          {checkoutData.total ? (
            <div className="flex flex-col gap-4 pt-7 ease-in animate-in fade-in">
              <div className="body-regular flex w-full items-center justify-between text-text">
                <p>Period: </p>
                <span>1 month</span>
              </div>
              {checkoutData.tax_rate !== "0" && (
                <div className="body-regular flex w-full items-center justify-between text-text">
                  <p>Taxes ({checkoutData.tax_rate}%)</p>
                  <span>
                    {checkoutData.tax} {checkoutData.currency}
                  </span>
                </div>
              )}
              <div className="body-regular flex w-full items-center justify-between">
                <p>Total: </p>
                <span>
                  {checkoutData.total} {checkoutData.currency}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-7">
              <Skeleton className="h-[17px] w-full bg-white-400" />
              <Skeleton className="h-[17px] w-full bg-white-400" />
            </div>
          )}
        </div>
      </div>

      <section className="paddle-checkout md:w-1/2 top-0 md:h-fit lg:sticky bg-primary-400 mt-10 min-h-[60vh] w-full" />
      <CheckoutLoader productId={id} setCheckoutData={setCheckoutData} />
    </main>
  );
}
