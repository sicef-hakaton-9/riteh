"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function BusMarker({ bus }: { bus: Bus }) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-12 h-12 bg-secondary rounded-full flex justify-center items-center text-white body-semibold">
          {bus.number}
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex justify-start items-center flex-col">
        <section className="flex justify-center items-center w-full">
          <div>{bus.number}</div>
        </section>
        <section className="mt-5 flex flex-col gap-2 justify-start items-start w-full"></section>
      </PopoverContent>
    </Popover>
  );
}
