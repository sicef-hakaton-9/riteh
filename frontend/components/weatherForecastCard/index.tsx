import getWeatherIcon from "@/utils/getWeatherIcon";
import Image from "next/image";

export default function WeatherForecastCard({
  temperature,
  title,
  weather
}: {
  weather: string;
  temperature: number;
  title: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-1 ">
        <p className="text-xs text-gray-400">{title}</p>
        <div className="w-[25px] h-[25px] relative">
          <Image src={getWeatherIcon(weather)} alt="weather icon" fill />
        </div>
        <p>{temperature + "°"}</p>
      </div>
    </>
  );
}
