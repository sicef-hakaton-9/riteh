"use client";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslations } from "next-intl";

import { getParkingsWithLocation } from "@/lib/actions";
import ParkingMarker from "@/components/map/marker";

export default function ParkingPage() {
  const [parkings, setParkings] = useState<Parking[] | null>(null);

  const t = useTranslations("parking");

  mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  const getParking = async () => {
    const data = await getParkingsWithLocation();
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
        markerRoute.render(
          <ParkingMarker
            parking={parking}
            capacityTranslation={t("capacity")}
            slotsTranslation={t("slots")}
            priceTranslation={t("price")}
            gotoTranslation={t("goto")}
            lang={parking.location.lang}
            lat={parking.location.lat}
          />
        );

        new mapbox.Marker(el)
          .setLngLat([parking.location.lang, parking.location.lat])
          .addTo(map);
      });
    }
  }, [parkings, t]);

  return (
    <div className="w-full min-h-screen">
      <section className="h-screen w-full md:overflow-hidden">
        <div id="map" className="h-full"></div>
      </section>
    </div>
  );
}
