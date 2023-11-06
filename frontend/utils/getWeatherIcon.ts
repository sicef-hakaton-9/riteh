import sunny from "../public/weather/sunny.png";
import partly_cloudy from "../public/weather/partly_cloudy.png";
import showers from "../public/weather/showers.png";
import cloudy from "../public/weather/cloudy.png";
import overcast from "../public/weather/overcast.png";
import mist from "../public/weather/mist.png";
import rain from "../public/weather/rain.png";

export default function getWeatherIcon(weatherType: string) {
  const weatherIcons = () => {
    switch (weatherType) {
      case "Sunny":
        return sunny;
      case "Partly cloudy":
        return partly_cloudy;
      case "Showers":
        return showers;
      case "Cloudy":
        return cloudy;
      case "Overcast":
        return overcast;
      case "Mist":
        return mist;
      case "Patchy rain possible":
      case "Moderate rain at times":
      case "Heavy rain":
        return rain;
      default:
        return sunny;
    }
  };
  return weatherIcons();
}
