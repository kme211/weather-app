import formatTemp from "./formatTemp";

it("should format fahrenheit to celcius", () => {
  const formattedCelcius1 = formatTemp("c", 80);
  expect(formattedCelcius1).toEqual("27° C");

  const formattedCelcius2 = formatTemp("c", 32.4);
  expect(formattedCelcius2).toEqual("0° C");

  const formattedCelcius3 = formatTemp("c", 98.7);
  expect(formattedCelcius3).toEqual("37° C");
});

it("should format fahrenheit temps", () => {
  const formattedFahrenheit = formatTemp("f", 81.2);
  expect(formattedFahrenheit).toEqual("81° F");
});
