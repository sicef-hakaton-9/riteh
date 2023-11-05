import NewsCard from "@/components/newsCard";
import WeatherCard from "@/components/weatherCard";
import { getForecast } from "@/services/weather";

export default async function Index() {
  const forecast = await getForecast("Niš", 3);

  return (
    <>
      <div className="flex-wrap flex gap-[8px] justify-start mb-4 md:m-4">
        <WeatherCard
          temperature={forecast.current.temp_c}
          title={forecast.location.name}
          weather={forecast.current.condition.text}
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
