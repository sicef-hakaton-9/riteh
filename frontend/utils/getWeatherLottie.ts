import sunny from "@/public/weather/lottie/sunny.json";
import clearMoon from "@/public/weather/lottie/clear_moon.json";
import partlyCloudy from "@/public/weather/lottie/partly_cloudy.json";
// import partlyCloudyMoon from "@/public/weather/lottie/partly_cloudy_moon.json";
import rainThunder from "@/public/weather/lottie/rain_thunder.json";

export default function getWeatherLottie(weather: string) {
  switch (weather) {
    case "Sunny":
      return sunny as object;
    case "Clear":
      return clearMoon as object;
    case "Partly cloudy":
      return partlyCloudy as object;
    case "Cloudy":
      return partlyCloudy as object;
    case "Overcast":
      return partlyCloudy as object;
    case "Mist":
      return partlyCloudy as object;
    case "Patchy rain possible":
      return rainThunder as object;
    case "Moderate rain":
      return rainThunder as object;
    case "Heavy rain":
      return rainThunder as object;
    default:
      return sunny as object;
  }
}
