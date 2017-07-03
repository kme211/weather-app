export default function getRandomNum(min, max) {
  if (arguments.length < 2) throw new Error("Must supply min and max!");
  if (typeof min !== "number" || typeof max !== "number")
    throw new Error("min and max must both be numbers!");
  return Math.random() * (max - min) + min;
}
