// import { Button } from "@/components/ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from "@/components/ui/dialog";
// import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/navbar/navbar";
import NewsCard from "@/components/newsCard";
// import DataTableDemo from "@/components/dataTable/demo";
// import Graph from "@/components/lineGraph";
// import ImageUpload from "@/components/imageUpload";
// import { Textarea } from "@/components/ui/textarea";
// import { useSession } from "next-auth/react";
import WeatherCard from "@/components/weatherCard";
import { getForecast, getWeather } from "@/services/weather";

export default async function Index() {
  // const { toast } = useToast();
  // const session = useSession();

  // console.log(session);

  const weather = await getWeather("Niš");
  const forecast = await getForecast("Niš", 3);

  return (
    <>
      <Navbar />
      <div className="flex-wrap flex gap-[8px] justify-center">
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button>Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => {
            toast({
              description: "Friday, February 10, 2023 at 5:57 PM",
              title: "Scheduled: Catch up"
            });
          }}
        >
          Show Toast
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload image</DialogTitle>
              <DialogDescription>Upload image and query for image</DialogDescription>
            </DialogHeader>
            <ImageUpload />
            <Textarea />
            <Button className="w-full">Send</Button>
          </DialogContent>
        </Dialog>
        <DataTableDemo />
        <div className="w-full p-8">
          <Graph
            xKey={"person"}
            yKey={"money"}
            data={[
              {
                money: 100,
                person: 1
              },
              {
                money: 200,
                person: 2
              },
              {
                money: 10,
                person: 3
              }
            ]}
            height={300}
          /> 
        </div> */}
        <WeatherCard
          temperature={0}
          title={weather.location.name}
          weather={weather.current.condition.text}
          forecast={forecast.forecast.forecastday}
        />
      </div>
      <div className="px-4">
        <div className="flex justify-between">
          <p className="font-bold text-xl">--Recent news</p>
          <p className="text-sm">--View more</p>
        </div>
        <div className="flex gap-2 justify-around">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </>
  );
}
