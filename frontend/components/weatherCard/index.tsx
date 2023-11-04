"use client";

// import getWeatherIcon from "@/utils/getWeatherIcon";
import { Card } from "../ui/card";
// import Image from "next/image";
import WeatherForecastCard from "../weatherForecastCard";
import Player from "react-lottie-player";
import getWeatherLottie from "@/utils/getWeatherLottie";
import { useRef } from "react";

export default function WeatherCard({
  // forecast,
  temperature,
  title,
  weather
}: {
  temperature: number;
  title: string;
  forecast?: object[];
  weather: string;
}) {
  const playerRef = useRef<HTMLDivElement>(null);

  // const onLoad = () => {
  //   if (playerRef.current) {
  //     // Add the animation class to the image
  //     playerRef.current.classList.add("animate-popInBounce");
  //   }
  // };

  return (
    <>
      <Card className="w-[400px] h-[220px]">
        <div className="flex items-center p-2 gap-2">
          <div>
            <Player
              ref={playerRef}
              play
              loop
              className="w-[120px] h-[120px] animation-popInBounce"
              animationData={getWeatherLottie(weather)}
              // onLoad={() => onLoad()}
            />
          </div>
          <div>
            <p className="text-lg font-medium">{title}</p>
            <p>{temperature}</p>
            <p>{weather}</p>
          </div>
        </div>
        <div className="hide-scrollbar px-[16px] overflow-hidden overflow-x-scroll">
          <div className=" flex gap-8">
            <WeatherForecastCard weather="Sunny" temperature={20} />
            <WeatherForecastCard weather="Partly cloudy" temperature={17} />
            <WeatherForecastCard weather="Sunny" temperature={20} />
            <WeatherForecastCard weather="Sunny" temperature={20} />
            <WeatherForecastCard weather="Sunny" temperature={20} />
            <WeatherForecastCard weather="Sunny" temperature={20} />
            <WeatherForecastCard weather="Sunny" temperature={20} />
          </div>
        </div>
      </Card>
    </>
  );
}
