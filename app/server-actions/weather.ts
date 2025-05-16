"use server";

import { getRootURL } from "@/models/app.model";
import { City } from "@/models/cities.model";
import { Weather } from "@/models/weather.model";

/**
 * Fetch current weather for a given city using the OpenWeather API.
 */
export async function getWeather(city: City): Promise<Weather> {
  const url = new URL(`${getRootURL()}/api/weather`);
  url.searchParams.append("city", encodeURI(city));

  const res = await fetch(url);

  if (!res.ok) {
    let processedResponse: unknown = await res.json().catch((e: unknown) => {
      console.error(`could not parse response: ${e}`);
    });

    if (
      typeof processedResponse === "object" &&
      processedResponse !== null &&
      "error" in processedResponse &&
      typeof processedResponse.error === "string"
    ) {
      throw new Error(processedResponse.error);
    }
    throw new Error(`Could not fetch weather. Got status ${res.status}`);
  }

  const data: unknown = await res.json();

  return Weather.SCHEMA.parse(data);
}
