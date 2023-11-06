"use client";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSearchParams } from "next/navigation";

import { getTicketMapMarker } from "@/lib/actions";
import TicketMarker from "@/components/map/ticket";

export default function TicketMapPage() {
  const searchParams = useSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  const getTicket = async () => {
    const data = await getTicketMapMarker(searchParams.get("id") || "");
    setTicket(data.ticket);
  };

  useEffect(() => {
    if (!ticket) {
      getTicket();
    }

    const map = new mapbox.Map({
      center: [Number(searchParams.get("y")), Number(searchParams.get("x"))],
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 14
    });

    if (ticket) {
      const el = document.createElement("div");
      const markerRoute = createRoot(el);
      markerRoute.render(<TicketMarker ticket={ticket} />);

      new mapbox.Marker(el)
        .setLngLat([
          Number(searchParams.get("y")) || 0,
          Number(searchParams.get("x")) || 0
        ])
        .addTo(map);
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
