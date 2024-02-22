const getRGBData = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16),
    }
    : null;
};

export const convertHexToRgb = (hex: string, alpha: number) => {
  const color = getRGBData(hex);

  return `rgba(${color?.red}, ${color?.green}, ${color?.blue}, ${alpha})`;
};