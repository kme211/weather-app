function convertTo(scale, f) {
  if (scale === "c") {
    return (f - 32) * 5 / 9;
  } else if (scale === "f") {
    return f;
  }
}

export default function formatTemp(scale, f) {
  if (arguments.length < 2)
    throw new Error("Must supply a scale and a fahrenheight temp!");
  const temp = convertTo(scale, f);
  return `${Math.round(temp)}° ${scale.toUpperCase()}`;
}
