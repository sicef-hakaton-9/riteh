"use client";

import { Card } from "@/components/ui/card";

export default function PageClient({
  initialData
}: {
  initialData: {
    title: string;
    description: string;
    category: "traffic" | "trash";
  }[];
}) {
  return (
    <>
      <div className="p-5 w-full flex gap-5">
        {initialData.map((ticket) => (
          <>
            <Card className="w-[200px] h-[100px]">
              <div className="flex p-3">
                <div>
                  <p>{ticket.title}</p>
                  <p className="text-gray-500">{ticket.description}</p>
                </div>
              </div>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
