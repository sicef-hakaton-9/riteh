import WeatherCard from "@/components/weatherCard";
import { getForecast, getWeather } from "@/services/weather";
import News from "@/components/news";

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
      <News />
    </>
  );
}
