export default function getNormalizedCondition(desc, time) {
  if (/rain|drizzle/i.test(desc)) return "rain";
  if (/snow/i.test(desc)) return "snow";
  if (/clear/i.test(desc)) return time === "day" ? "sun" : "stars";
  if (/cloud/i.test(desc)) return "clouds";
  return desc.toLowerCase();
}
