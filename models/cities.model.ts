import { z } from "zod";

export const CITIES = [
  "Chicago",
  "New York",
  "London",
  "Tokyo",
  "Sydney",
] as const;

const EXPANDED_CITY_NAMES = {
  Chicago: "Chicago, US",
  "New York": "New York, US",
  London: "London, UK",
  Tokyo: "Tokyo, JP",
  Sydney: "Sydney, AU",
} as const;

export type City = (typeof CITIES)[number];
export const City = {
  SCHEMA: z
    .string()
    .transform((val) => {
      try {
        return decodeURIComponent(val);
      } catch {
        return val;
      }
    })
    .pipe(z.enum(CITIES)),
} as const;
export type ExpandedCityName = (typeof EXPANDED_CITY_NAMES)[City];
