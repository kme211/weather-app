function convertTo(scale, f) {
  if (scale === "c") {
    return (f - 32) * 5 / 9;
  } else if (scale === "f") {
    return f;
  }
}

export default function formatTemp(scale, f) {
  const temp = convertTo(scale, f);
  return `${Math.round(temp)}° ${scale.toUpperCase()}`;
}
