"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Endpoints from "@/constants/enums/Endpoints";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PageClient({
  initialData
}: {
  initialData: {
    title: string;
    description: string;
    category: "traffic" | "trash";
    imageUrl: string;
    id: string;
    x: number;
    y: number;
  }[];
}) {
  const t = useTranslations();
  const router = useRouter();
  return (
    <>
      <div className="p-5 w-full flex gap-5 flex-wrap justify-center md:justify-start">
        {initialData.map((ticket) => (
          <>
            <Card className="w-[300px] h-auto">
              <div className="w-full relative h-[100px] object-cover ">
                <Image
                  src={ticket.imageUrl}
                  fill
                  alt="ticket cover"
                  className="rounded-t-md object-cover"
                />
              </div>
              <div className="flex p-3">
                <div>
                  <p className="line-clamp-2">{ticket.title}</p>
                  <p className="text-gray-500 line-clamp-2">{ticket.description}</p>
                </div>
              </div>
              <div className="w-full flex justify-end p-3">
                <Button
                  onClick={() => {
                    router.push(
                      Endpoints.TICKET_VIEW(ticket.id, ticket.x, ticket.y)
                    );
                  }}
                >
                  {t("viewOnMap")}
                </Button>
              </div>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
