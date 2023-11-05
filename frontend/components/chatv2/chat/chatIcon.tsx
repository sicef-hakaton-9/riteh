"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ChatIcon() {
  const t = useTranslations();

  const contacts = [
    {
      image: "/images/ri-cistoca.png",
      name: t("sidebar.waste")
    },
    {
      image: "/images/ri-parking.png",
      name: t("sidebar.parking")
    },
    {
      image: "/images/autotrolej.png",
      name: t("sidebar.buses")
    }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="fixed bottom-0 right-0 bg-primary p-4 m-7 z-40 rounded-full cursor-pointer">
          <MessageCircle className="w-5 h-5 z-50" color="white" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-between gap-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Image
                src={contact.image}
                width={80}
                height={80}
                alt="contact"
                className="rounded-lg mb-2"
              />
              {contact.name}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
