import getNormalizedCondition from "./getNormalizedCondition";

it("return the normalized condition from the description passed", () => {
  expect(getNormalizedCondition("Clear", "day")).toEqual("sun");
  expect(getNormalizedCondition("Clear", "night")).toEqual("stars");
  expect(getNormalizedCondition("Drizzle", "day")).toEqual("rain");
  expect(getNormalizedCondition("Rain", "day")).toEqual("rain");
  expect(getNormalizedCondition("Snow", "night")).toEqual("snow");
  expect(getNormalizedCondition("Mostly cloudy", "day")).toEqual("clouds");
});
