export default function getLocation() {
  return new Promise((resolve, reject) => {
    if (!window.navigator.geolocation)
      return reject("geolocation not available");
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      resolve({ lat, lng });
    });
  });
}
