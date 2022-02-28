// Adapted from 'contrast-color' package, just because that had no type information available

export type HexColor = string;

export const isHexColor = (str: string): str is HexColor => {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6})/i.test(str);
};

type ContrastOptions = {
  background: HexColor;
  dark?: HexColor;
  light?: HexColor;
  defaultColor?: HexColor;
  threshold?: number;
};

export default ({
  background,
  dark = '#000000',
  light = '#FFFFFF',
  defaultColor = '#000000',
  threshold = 128,
}: ContrastOptions): string => {
  let digits = String(background)
    .toUpperCase()
    .replace(/[^0-9a-f]+/gi, '')
    .split('');

  switch (digits.length) {
    case 3:
    case 4:
      // 3 e.g. #FFF
      // 4 e.g. #1234 <- (3hex + alpha-channel)
      digits = digits.slice(0, 3).map((c) => `${c}${c}`);
      break;
    case 6:
    case 8:
      // 6 e.g. #789ABC <- ideal
      // 8 e.g. #789ABC00 <- (6hex + alpha-channel)
      digits = digits
        .slice(0, 6)
        .reduce((acc, curr, n, arr) => (n % 2 ? [...acc, `${arr[n - 1]}${curr}`] : acc), []);
      break;
    /* istanbul ignore next: we should never end up here because of type guards */
    default:
      // Invalid background value, so you get the default
      return defaultColor;
  }

  const [r, g, b] = digits.map((h) => parseInt(h, 16));
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  const darkOrLight = yiq >= threshold ? dark : light;
  return darkOrLight;
};
