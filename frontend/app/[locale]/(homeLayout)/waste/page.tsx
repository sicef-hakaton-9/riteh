"use client";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getWaste } from "@/services/waste";
import WasteMarker from "@/components/map/wasteMarker";

export default function WastePage() {
  const [containers, setContainers] = useState<Container[] | null>(null);

  mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  const getContainers = async () => {
    const data = await getWaste();
    setContainers(data);
  };

  useEffect(() => {
    if (!containers) {
      getContainers();
    }

    const map = new mapbox.Map({
      center: [14.437854231700783, 45.33365293477826],
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      zoom: 14
    });

    if (containers) {
      containers.map((container: Container) => {
        const el = document.createElement("div");
        const markerRoute = createRoot(el);
        markerRoute.render(<WasteMarker percentage={container.percentage} />);

        new mapbox.Marker(el)
          .setLngLat([container.location.lang, container.location.lat])
          .addTo(map);
      });
    }
  }, [containers]);

  return (
    <main className="w-full min-h-screen">
      <section className="h-screen w-full overflow-hidden">
        <div id="map" className="h-full"></div>
      </section>
    </main>
  );
}
