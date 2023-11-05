"use client";

import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslations } from "next-intl";
import RoadworkMarker from "../roadworkMarker";

export default function RoadworkPage({ markers }: { markers: Roadwork[] }) {
  const t = useTranslations("parking");

  mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  useEffect(() => {
    const map = new mapbox.Map({
      center: [14.437854231700783, 45.33365293477826],
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      zoom: 13
    });

    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        const el = document.createElement("div");
        const markerRoute = createRoot(el);
        markerRoute.render(<RoadworkMarker marker={markers[i]} />);

        new mapbox.Marker(el)
          .setLngLat([markers[i].location.lat || 0, markers[i].location.lang || 0])
          .addTo(map);
      }
    }
  }, [markers, t]);

  return (
    <section className="h-full w-full overflow-hidden">
      <div id="map" className="h-full"></div>
    </section>
  );
}
