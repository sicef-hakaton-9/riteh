"use client";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getBusLocation, getBusStops } from "@/lib/actions";
import BusMarker from "@/components/map/buses";
import StopMarker from "@/components/map/stops";
import { useTranslations } from "next-intl";

export default function BusesPage() {
  const [busses, setBusses] = useState<Bus[] | null>(null);
  const [stops, setStops] = useState<Stop[] | null>(null);

  const t = useTranslations("parking");

  mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  const getBusses = async () => {
    const data = await getBusLocation();

    setBusses(data);
  };

  const getStops = async () => {
    const data = await getBusStops();
    setStops(data);
  };

  useEffect(() => {
    if (!busses) {
      getStops();
      getBusses();
    }

    const map = new mapbox.Map({
      center: [14.437854231700783, 45.33365293477826],
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      zoom: 14
    });

    if (busses) {
      busses.map((bus: Bus) => {
        const el = document.createElement("div");
        const markerRoute = createRoot(el);
        markerRoute.render(<BusMarker bus={bus} />);

        new mapbox.Marker(el)
          .setLngLat([bus.location.lang, bus.location.lat])
          .addTo(map);
      });
    }

    if (stops) {
      stops.map((stop: Stop) => {
        const stopEl = document.createElement("div");
        const markerRoute = createRoot(stopEl);
        markerRoute.render(<StopMarker stop={stop} gotoTranslation={t("goto")} />);

        new mapbox.Marker(stopEl)
          .setLngLat([stop.location.lang, stop.location.lat])
          .addTo(map);
      });
    }
  });

  return (
    <div className="w-full min-h-screen">
      <section className="h-screen w-full overflow-hidden">
        <div id="map" className="h-full"></div>
      </section>
    </div>
  );
}
