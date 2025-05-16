import { z } from "zod";
import { IconURL } from "./open-weather.model";

export type Weather = Readonly<{
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  iconUrl: IconURL;
}>;

export const Weather = {
  SCHEMA: z
    .object({
      temp: z.coerce.number(),
      description: z.string(),
      humidity: z.coerce.number(),
      wind: z.coerce.number(),
      iconUrl: IconURL.SCHEMA,
    })
    .transform((x): Weather => x),
} as const;
