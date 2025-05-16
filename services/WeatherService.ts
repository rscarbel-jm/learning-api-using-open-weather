import { City } from "@/models/cities.model";
import { Weather } from "@/models/weather.model";

export class WeatherService {
  private readonly apiKey: string;

  constructor() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OpenWeather API key is missing! Please remember to add it to your local .env file under the name OPEN_WEATHER_API_KEY"
      );
    }

    this.apiKey = apiKey;
  }

  /**
   * Fetches current weather data for the specified city
   *
   * Implementation Tips:
   * - The OpenWeather API provides multiple endpoints - consider using the "Current Weather Data" endpoint
   * - Look at the Weather model in weather.model.ts to understand what data you need to extract
   * - The API response will need to be transformed to match the Weather type
   * - Consider what happens if the API is down or returns an error
   *
   * @param city - The city to get weather data for (from the CITIES enum)
   * @returns A Weather object containing the current conditions
   * @throws Error if the API request fails
   */
  getWeather(city: City): Weather {
    throw new Error("Not implemented yet!");
  }

  /**
   * Helper method suggestion:
   * Consider creating a helper method to construct the API URL with the necessary query parameters
   */

  /**
   * Helper method suggestion:
   * Consider creating a helper method to transform the OpenWeather API response into your Weather model
   *
   * Hint: there is a zod parser utility declared at Weather.SCHEMA that can help you
   * get the data parsed correctly. The `SCHEMA` pattern is used elswhere in this code
   */
}
