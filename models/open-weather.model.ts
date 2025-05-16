import { z } from "zod";

const BASE_ICON_URL = "https://openweathermap.org/img/wn/";
const ICON_SIZE = "@2x.png";
export type IconURL = `${typeof BASE_ICON_URL}${string}${typeof ICON_SIZE}`;

const ICON_CODE_REGEX = "\\d{2}[dn]";
const ICON_URL_REGEX = `^${BASE_ICON_URL.replace(
  /\//g,
  "\\/"
)}${ICON_CODE_REGEX}${ICON_SIZE.replace(".", "\\.")}$`;

export const IconURL = {
  SCHEMA: z
    .string()
    .regex(new RegExp(ICON_URL_REGEX), {
      message:
        "Invalid icon URL. Expected format: 'https://openweathermap.org/img/wn/10d@2x.png'",
    })
    .transform((x): IconURL => x as IconURL),
} as const;
