import axios from "axios";

export default function getWeather(location) {
  return axios
    .get(
      `/api/v1/weather/${location.lat},${location.lng}`
    )
    .then(res => {
      const data = res.data ? res.data : null;
      if (!data) return { error: "No weather data found!" };
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
    })
    .catch(err => {
      if (process.env.NODE_ENV === "development") console.error(err);
      return { error: "Something went wrong!" };
    });
}
