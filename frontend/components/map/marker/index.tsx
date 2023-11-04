import Image from "next/image";
import React from "react";

export default function ParkingMarker({ id }: { id: string }) {
  console.log(id);
  return (
    <div>
      <Image
        src="/images/parking-icon.png"
        height={40}
        width={40}
        alt="parking icon"
      />
    </div>
  );
}
