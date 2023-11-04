import Image from "next/image";
import { Card } from "../ui/card";

export default function NewsCard() {
  return (
    <>
      <Card className="w-full h-full max-w-[400px] max-h-[300px] relative">
        <div className="w-full h-[150px] relative">
          <Image
            src={
              "https://www.shutterstock.com/image-photo/cars-city-traffic-jams-stream-260nw-185515808.jpg"
            }
            alt="article thumbnail"
            fill
            className="rounded-t-md object-cover"
          />
        </div>
        <div className="h-[150px] p-3 overflow-hidden text-ellipsis">
          <h2 className="text-2xl font-bold line-clamp-2">
            --Heavy traffic at interstate
          </h2>
          <p className="text-sm text-gray-500 line-clamp-3">
            --People are reporting long lines at the interstate. Reportedly there has
            been an accident involving two cars.People are reporting long lines at
            the interstate. Reportedly there has been an accident involving two
            cars.People are reporting long lines at the interstate. Reportedly there
            has been an accident involving two cars.
          </p>
        </div>
      </Card>
    </>
  );
}
