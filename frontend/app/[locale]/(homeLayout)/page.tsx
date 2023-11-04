import NewsCard from "@/components/newsCard";
import WeatherCard from "@/components/weatherCard";
import { getForecast, getWeather } from "@/services/weather";

export default async function Index() {
  const weather = await getWeather("Niš");
  const forecast = await getForecast("Niš", 3);

  return (
    <>
      <div className="flex-wrap flex gap-[8px] justify-center">
        <WeatherCard
          temperature={0}
          title={weather.location.name}
          weather={weather.current.condition.text}
          forecast={forecast.forecast.forecastday}
        />
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
