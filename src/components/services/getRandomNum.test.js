import getRandomNum from "./getRandomNum";

it("should return a random number", () => {
  for (let i = 0; i < 500; i++) {
    const num = getRandomNum(0, 5);
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThanOrEqual(5);
  }
});
