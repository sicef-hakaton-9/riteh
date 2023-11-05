"use client";

// import getWeatherIcon from "@/utils/getWeatherIcon";
import { Card } from "../ui/card";
// import Image from "next/image";
import WeatherForecastCard from "../weatherForecastCard";
import Player from "react-lottie-player";
import getWeatherLottie from "@/utils/getWeatherLottie";
import { useRef } from "react";
import dayjs from "dayjs";
import { useLocale } from "next-intl";

export default function WeatherCard({
  forecast,
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
  const locale = useLocale();

  return (
    <>
      <Card className="w-full h-full max-w-[400px] max-h-[220px]">
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
            <p>{temperature}°</p>
            <p>{weather}</p>
          </div>
          <div className="flex w-full justify-around">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {forecast?.map((day: any) => (
              <WeatherForecastCard
                key={day.date}
                title={dayjs(day.date).toDate().toLocaleDateString(locale, {
                  weekday: "short"
                })}
                weather={day.day.condition.text}
                temperature={day.day.avgtemp_c}
              />
            ))}
          </div>
        </div>
        <div className="hide-scrollbar px-[16px] overflow-hidden overflow-x-scroll">
          <div className="flex gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(forecast?.[0] as { hour: object[] }).hour.map((hour: any) => (
              <WeatherForecastCard
                key={hour.time_epoch}
                title={dayjs(hour.time).toDate().toLocaleTimeString(locale, {
                  hour: "2-digit"
                })}
                weather={hour.condition.text}
                temperature={hour.temp_c}
              />
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
