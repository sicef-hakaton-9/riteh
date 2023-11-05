/* eslint-disable no-undef */
"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";

const CheckoutLoader = ({
  productId,
  setCheckoutData
}: {
  productId: string;
  setCheckoutData: Dispatch<SetStateAction<CheckoutData>>;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  function reroute() {
    router.push("/billing");
  }

  return (
    <Script
      src="https://cdn.paddle.com/paddle/paddle.js"
      onReady={() => {
        if (process.env.NODE_ENV !== "production") {
          Paddle.Environment.set("sandbox");
        }
        Paddle.Setup({
          eventCallback: (data: any) => {
            if (data.event?.includes("Checkout")) {
              const prices = data.eventData.checkout.prices.customer;

              setCheckoutData({
                currency: prices.currency,
                subtotal: prices.subtotal,
                tax: prices.total_tax,
                tax_rate: (prices.items[0].tax_rate * 100).toFixed(0),
                total: prices.unit
              });
            }

            if (data.event === "Checkout.Complete") {
              console.log(data);
              toast({
                title: "Thank you for your purchase",
                variant: "success"
              });

              setTimeout(reroute, 3000);
            }
          },
          vendor: 11035
        });

        Paddle.Checkout.open({
          frameInitialHeight: 1000,
          frameStyle:
            "width:100%; min-width: 412px; border: none; padding: 0 1.75rem 0;",
          frameTarget: "paddle-checkout",
          method: "inline",
          product: productId
        });
      }}
    />
  );
};

export default CheckoutLoader;
