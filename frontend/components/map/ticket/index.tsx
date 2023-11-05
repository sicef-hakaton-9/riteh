"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function TicketMarker({ ticket }: { ticket: Ticket }) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-5 h-5 bg-red rounded-full" />
      </PopoverTrigger>
      <PopoverContent className="flex justify-center items-center w-full flex-col">
        <section className="flex gap-2 justify-start items-start w-full flex-col">
          <h1 className="text-black body-semibold text-start">{ticket.title}</h1>
          <p className="text-text small-regular">{ticket.description}</p>
        </section>
      </PopoverContent>
    </Popover>
  );
}
