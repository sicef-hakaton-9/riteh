import RoadworkPage from "@/components/map/roadwork";
import { Cameras } from "@/constants/cameras";
import { getRoadwork } from "@/lib/actions";
import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function CameraPage() {
  const locale = useLocale();
  const t = await getTranslator(locale);
  const markers = await getRoadwork();

  return (
    <main className="flex w-full h-full flex-col justify-start items-start p-6">
      <h1 className="heading1">{await t("camera.title")}</h1>
      <Tabs defaultValue="cameras" className="w-full mt-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cameras">{t("tabs.cameras")}</TabsTrigger>
          <TabsTrigger value="roadworks">{t("tabs.roadworks")}</TabsTrigger>
        </TabsList>
        <TabsContent value="cameras">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-2 rounded-lg">
            {Cameras.map((camera) => (
              <div
                className="flex flex-col justify-start items-start w-full basis-1/3"
                key={camera.id}
              >
                <Image
                  src={`https://m.hak.hr/cam.asp?id=${camera.id}`}
                  width={500}
                  height={500}
                  alt={camera.name}
                />
                <p className="body-semibold">{camera.name}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="roadworks" className="h-[75vh]">
          {markers ? <RoadworkPage markers={markers} /> : null}
        </TabsContent>
      </Tabs>
    </main>
  );
}
