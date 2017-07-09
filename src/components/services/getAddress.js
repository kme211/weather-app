import axios from "axios";

async function getAddress(location) {
  const { lat, lng } = location;
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`
  );
  const { results } = data;
  if (results.length >= 3) {
    return results[2].formatted_address;
  } else {
    return results[0].formatted_address;
  }
}

export default getAddress;
