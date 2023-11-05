import Graph from "@/components/lineGraph";
import NewsCard from "@/components/newsCard";
import { Card } from "@/components/ui/card";
import WeatherCard from "@/components/weatherCard";
import { getWindCalc } from "@/lib/actions";
import { getForecast } from "@/services/weather";

export default async function Index() {
  const forecast = await getForecast("Rijeka", 3);
  const data = await getWindCalc();

  return (
    <>
      <div className="flex gap-[8px] justify-start mb-4 md:m-4">
        <WeatherCard
          temperature={forecast.current.temp_c}
          title={forecast.location.name}
          weather={forecast.current.condition.text}
          forecast={forecast.forecast.forecastday}
        />
        <Card className="flex w-full">
          <Graph xKey={"day"} yKey={"energyGenerated"} data={data} height={220} />
        </Card>
      </div>
      <div className="md:px-4">
        <div className="flex justify-between">
          <p className="font-bold text-xl">--Recent news</p>
          <p className="text-sm">--View more</p>
        </div>
        <div className="flex gap-2 justify-around md:flex-row flex-col">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </>
  );
}
