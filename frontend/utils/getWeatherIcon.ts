export default function getWeatherIcon(weatherType: string) {
  const weatherIcons = () => {
    switch (weatherType) {
      case "Sunny":
        return "/weather/sunny.png";
      case "Partly cloudy":
        return "/weather/partly_cloudy.png";
      // case "showers":
      // return "/weather/showers.png";
      case "Cloudy":
        return "/weather/cloudy.png";
      case "Overcast":
        return "/weather/overcast.png";
      case "Mist":
        return "/weather/mist.png";
      case "Patchy rain possible":
        return "/weather/patchy_rain.png";
      case "Moderate rain":
        return "/weather/moderate_rain.png";
      case "Heavy rain":
        return "/weather/heavy_rain.png";
      default:
        return "/weather/sunny.png";
    }
  };
  return weatherIcons();
}
