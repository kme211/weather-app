import sentenceCase from "./sentenceCase";

it("should return the string sentence cased", () => {
  expect(sentenceCase("Mostly Cloudy")).toBe("Mostly cloudy");
  expect(sentenceCase("Mostly Cloudy with a Chance of Meatballs.")).toBe("Mostly cloudy with a chance of meatballs.");
});
