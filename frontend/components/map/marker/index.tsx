"use client";

import Image from "next/image";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

export default function ParkingMarker({
  capacityTranslation,
  gotoTranslation,
  parking,
  lang,
  priceTranslation,
  lat,
  slotsTranslation
}: {
  parking: Parking;
  capacityTranslation: string;
  slotsTranslation: string;
  priceTranslation: string;
  gotoTranslation: string;
  lang: number;
  lat: number;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src="/images/parking-icon.png"
          height={40}
          width={40}
          alt="parking icon"
        />
      </PopoverTrigger>
      <PopoverContent className="flex justify-start items-center flex-col">
        <section className="flex justify-center items-center w-full">
          <div>{parking.name}</div>
          <div
            className={`w-2 h-2 rounded-full ml-3 ${
              parking.capacity === parking.free_spots ? "bg-red-400" : "bg-green-400"
            }`}
          />
        </section>
        <section className="mt-5 flex flex-col gap-2 justify-start items-start w-full">
          <div>
            {capacityTranslation}: {parking.capacity}
          </div>
          <div>
            {slotsTranslation}: {parking.free_spots}
          </div>
          <div>
            {priceTranslation}: {parking.price}
          </div>

          <Link
            href={`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${lat},${lang}`}
            target="_blank"
            className="w-full bg-primary rounded-sm py-2 px-3 text-white text-center"
          >
            {gotoTranslation}
          </Link>
        </section>
      </PopoverContent>
    </Popover>
  );
}
