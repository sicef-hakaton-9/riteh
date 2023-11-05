import Graph from "@/components/lineGraph";
import { Card } from "@/components/ui/card";
import WeatherCard from "@/components/weatherCard";
import { getWindCalc } from "@/lib/actions";
import News from "@/components/news";
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
        <Card className="flex w-full flex-col text-text">
          <p className="px-4 py-2">Energija vjetra dobivena u proteklih 10 dana</p>
          <Graph xKey={"day"} yKey={"energyGenerated"} data={data} height={220} />
        </Card>
      </div>
      <News />
    </>
  );
}
