import formatTemp from "./formatTemp";

it("should format fahrenheit to celcius", () => {
  const formattedCelcius = formatTemp("c", 80);
  expect(formattedCelcius).toEqual("27° C");
});

it("should format fahrenheit temps", () => {
  const formattedFahrenheit = formatTemp("f", 81.2);
  expect(formattedFahrenheit).toEqual("81° F");
});
