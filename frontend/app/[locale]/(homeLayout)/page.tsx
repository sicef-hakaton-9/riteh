import NewsCard from "@/components/newsCard";
import WeatherCard from "@/components/weatherCard";
import { getForecast, getWeather } from "@/services/weather";

const news = [
  {
    description:
      "The city of Rijeka is proud to announce a concert by the Symphony Orchestra, which will take place in the prestigious concert hall 'Zajc'. Classical music lovers will enjoy the performances of famous composers such as Beethoven, Mozart and Chopin. The conductor of the evening will be maestro Ivan Repušić, known for his passion and energy with which he brings every note to life. Visitors can expect an evening filled with the harmony and beauty of classical music that will echo through the walls of Rijeka.",
    image: "/news/orchestra.png",
    title: "Rijeka Symphony Orchestra Concert"
  },
  {
    description:
      "This weekend, culinary enthusiasts will have the opportunity to learn the secrets of Rijeka cuisine at a series of workshops led by chef Dario. A great opportunity for all gourmets to take a peek at the wealth of local flavors and learn how to prepare authentic Rijeka delicacies such as šurlica and brodet. The workshops will will be held in the old city center, offering participants not only a culinary, but also a cultural experience. Participants will cook, taste and, most importantly, enjoy socializing.",
    image: "/news/workshop-cuisine.jpg",
    title: "Workshops of Traditional Rijeka Cuisine"
  },
  {
    description:
      "Due to sudden works on road rehabilitation, there has been a major traffic jam on the Krčki Most, one of the key thoroughfares of the city of Rijeka. Residents are asked for patience while the emergency repairs take place. The works are expected to last throughout the day, and the traffic jam could affect the evening rush hour. Drivers are encouraged to use alternative routes to avoid congestion. The City of Rijeka apologizes to citizens for the inconvenience and thanks for your understanding.",
    image: "/news/krk.jpg",
    title: "Huge traffic jam on the Krčki Most"
  }
];

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
      <div className="md:px-4">
        <div className="flex justify-between">
          <p className="font-bold text-xl">--Recent news</p>
          <p className="text-sm">--View more</p>
        </div>
        <div className="flex gap-2 justify-around md:flex-row flex-col">
          {news.map((item, index) => (
            <div key={index}>
              <NewsCard
                description={item.description}
                title={item.title}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
