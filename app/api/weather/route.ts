import { NextRequest, NextResponse } from "next/server";
import { City } from "@/models/cities.model";
import { WeatherService } from "@/services/WeatherService";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const cityParam = searchParams.get("city");

  const cityParsed = City.SCHEMA.safeParse(cityParam);
  if (cityParsed.error) {
    return NextResponse.json(
      { error: `Invalid City. ${cityParsed.error.flatten()} ` },
      { status: 400 }
    );
  }

  const city = cityParsed.data;

  try {
    const weatherService = new WeatherService();
    const weather = await weatherService.getWeather(city);

    return NextResponse.json(weather);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
