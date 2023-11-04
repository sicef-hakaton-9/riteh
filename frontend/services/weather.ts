export async function getWeather(cityName: string) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`;
  const options = {
    headers: {
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST as string,
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string
    },
    method: "GET"
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getForecast(cityName: string, days: number) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=${days}`;
  const options = {
    headers: {
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      "X-RapidAPI-Key": "5e4679d93amshc5861388107f704p1853c9jsn14f5fd88c88d"
    },
    method: "GET"
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}
