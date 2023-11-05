"use client";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getparkingswithlocation } from "@/lib/actions";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ParkingMarker from "@/components/map/marker";

export default function ParkingPage() {
  const [parkings, setParkings] = useState<Parking[] | null>(null);

  mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  const getParking = async () => {
    const data = await getparkingswithlocation();
    setParkings(data);
  };

  useEffect(() => {
    if (!parkings) {
      getParking();
    }

    const map = new mapbox.Map({
      center: [14.437854231700783, 45.33365293477826],
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      zoom: 14
    });

    if (parkings) {
      parkings.map((parking: Parking) => {
        const el = document.createElement("div");
        const markerRoute = createRoot(el);
        markerRoute.render(<ParkingMarker />);

        new mapbox.Marker(el)
          .setLngLat([parking.location.lang, parking.location.lat])
          .addTo(map);
      });
    }
  }, [parkings]);

  return (
    <main className="w-full min-h-screen">
      <section className="h-screen w-full overflow-hidden">
        <div id="map" className="h-full"></div>
      </section>
      <Sheet>
        <SheetTrigger
          asChild
          className="absolute bottom-0 h-20 w-full !rounded-t-lg rounded-b-none bg-white shadow-none tab text-text z-[999] hover:bg-white"
        >
          <Button className="tab">Rijeka Parking</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          {parkings?.map((parking: Parking) => (
            <a
              href={parking.link}
              key={parking.name}
              className="flex justify-between items-center"
            >
              <div>{parking.name}</div>
            </a>
          ))}
        </SheetContent>
      </Sheet>
    </main>
  );
}
