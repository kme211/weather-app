import axios from "axios";

function getData(location) {
  return axios
    .get(`/api/v1/weather/${location.lat},${location.lng}`)
    .then(res => {
      const data = res.data ? res.data : null;
      if (!data) throw new Error("No weather data found!");
      const dailyData = data.daily.data && res.data.daily.data.length
        ? res.data.daily.data[0]
        : null;
      const hourlySummary = data.hourly ? data.hourly.summary : null;
      return {
        icon: data.currently.icon,
        windSpeed: data.currently.windSpeed,
        hourlySummary,
        feelsLike: data.currently.apparentTemperature,
        temp: data.currently.temperature,
        dt: data.currently.time,
        desc: data.currently.summary,
        sunrise: dailyData.sunriseTime,
        sunset: dailyData.sunsetTime
      };
    });
}

export default async function getWeather(location) {
  try {
    const weather = await getData(location);
    return weather;
  } catch (err) {
    // try to get the weather one more time if it fails the first time
    try {
      const weather = await getData(location);
      return weather;
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.error(err);
      throw new Error("Unable to retrieve weather data");
    }
  }
}
