"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getRoadworkReason } from "@/lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RoadworkMarker({ marker }: { marker: Roadwork }) {
  const [reason, setReason] = useState<string>("");

  async function getDesc() {
    const response = await getRoadworkReason(marker.id || "");
    setReason(response || "");
  }

  useEffect(() => {
    getDesc();
  }, []);

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src="/images/roadwork.png"
          height={60}
          width={60}
          alt="roadwork icon"
        />
      </PopoverTrigger>
      {reason ? (
        <PopoverContent className="flex justify-center items-center w-full flex-col">
          <p
            dangerouslySetInnerHTML={{ __html: reason }}
            className="max-w-[250px] max-h-[200px] overflow-y-scroll body-regular"
          />
        </PopoverContent>
      ) : null}
    </Popover>
  );
}
