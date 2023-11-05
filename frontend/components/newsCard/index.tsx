import Image from "next/image";
import { Card } from "../ui/card";

export default function NewsCard({
  description,
  image,
  title
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <>
      <Card className="w-full h-full max-w-[400px] max-h-[300px] relative">
        <div className="w-full h-[150px] relative">
          <Image
            src={image ? image : ""}
            alt="article thumbnail"
            fill
            className="rounded-t-md object-cover"
          />
        </div>
        <div className="h-[150px] p-3 overflow-hidden text-ellipsis">
          <h2 className="text-2xl font-bold line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
        </div>
      </Card>
    </>
  );
}
