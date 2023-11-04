"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

export default function StopMarker({
  gotoTranslation,
  stop
}: {
  stop: Stop;
  gotoTranslation: string;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-2 h-2 bg-primary rounded-full" />
      </PopoverTrigger>
      <PopoverContent className="flex justify-center items-center w-full flex-col">
        <section className="flex justify-start items-center w-full flex-col">
          <div>{stop.name}</div>
          <Link
            href={`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${stop.location.lat},${stop.location.lang}`}
            target="_blank"
            className="w-full bg-primary rounded-sm py-2 px-3 text-white text-center mt-3"
          >
            {gotoTranslation}
          </Link>
        </section>
      </PopoverContent>
    </Popover>
  );
}
