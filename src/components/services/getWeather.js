import axios from "axios";

export default function getWeather(location) {
  const baseUrl = "http://kearieggers.com/api/v1";
  return axios
    .get(
      `${baseUrl}/weather/${location.coords.latitude},${location.coords.longitude}`
    )
    .then(res => {
      const data = res.data ? res.data : null;
      if (!data) return { error: "No weather data found!" };
      const dailyData = data.daily.data && res.data.daily.data.length
        ? res.data.daily.data[0]
        : null;
      return {
        icon: data.currently.icon,
        hourlySummary: data.hourly.summary,
        feelsLike: data.currently.apparentTemperature,
        temp: data.currently.temperature,
        dt: data.currently.time,
        desc: data.currently.summary,
        sunrise: dailyData.sunriseTime,
        sunset: dailyData.sunsetTime
      };
    })
    .catch(err => {
      return { error: "Something went wrong!" };
    });
}
