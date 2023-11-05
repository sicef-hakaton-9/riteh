import WeatherCard from "@/components/weatherCard";
import News from "@/components/news";
import { getForecast } from "@/services/weather";

export default async function Index() {
  const forecast = await getForecast("Rijeka", 3);

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
      <News />
    </>
  );
}
