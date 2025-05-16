"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Dropdown } from "primereact/dropdown";
import { CITIES, City } from "@/models/cities.model";
import type { Weather } from "@/models/weather.model";
import { getWeather } from "./server-actions/weather";

const CityOption = ({ city }: { city: City }) => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
      {city[0]}
    </div>
    <span>{city}</span>
  </div>
);

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCityChange = (e: { value: City }) => {
    const city = e.value;
    setSelectedCity(city);
    setError(null);

    startTransition(async () => {
      try {
        const w = await getWeather(city);
        setWeather(w);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch weather data"
        );
        setWeather(null);
      }
    });
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "night";
    if (hour < 12) return "morning";
    if (hour < 18) return "day";
    return "evening";
  };

  const timeOfDay = getTimeOfDay();

  const getTempColor = (temp: number) => {
    if (temp < 0) return "text-blue-500";
    if (temp < 10) return "text-blue-400";
    if (temp < 20) return "text-green-500";
    if (temp < 30) return "text-yellow-500";
    return "text-red-500";
  };

  /**
   * selects a background that matches the current time of day
   */
  const getBackgroundClass = () => {
    switch (timeOfDay) {
      case "morning":
        return "bg-gradient-to-b from-blue-300 to-orange-100";
      case "day":
        return "bg-gradient-to-b from-blue-400 to-blue-100";
      case "evening":
        return "bg-gradient-to-b from-orange-400 to-purple-300";
      case "night":
        return "bg-gradient-to-b from-gray-900 to-blue-900";
      default:
        return "bg-gradient-to-b from-blue-400 to-blue-100";
    }
  };

  const getTextColorClass = () => {
    return timeOfDay === "night" ? "text-white" : "text-gray-800";
  };

  return (
    <main
      className={`flex flex-col items-center min-h-screen ${getBackgroundClass()} ${getTextColorClass()} transition-all duration-500`}
    >
      <div className="w-full max-w-md px-4 py-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 flex items-center">
          <i className="pi pi-map-marker mr-2"></i>
          Weather Forecast
        </h1>

        <div className="w-full backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-xl p-6 shadow-lg mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select a city
            </label>
            <Dropdown
              value={selectedCity}
              onChange={handleCityChange}
              options={[...CITIES]}
              placeholder="Choose city"
              className="w-full shadow-sm border-0 rounded-lg"
              itemTemplate={(option) => <CityOption city={option} />}
              valueTemplate={(option) =>
                option ? <CityOption city={option} /> : "Choose city"
              }
              panelClassName="border-0 shadow-lg rounded-lg"
            />
          </div>
        </div>

        {isPending && (
          <div className="flex flex-col items-center justify-center p-6 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 shadow-lg w-full animate-pulse">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="w-full p-4 bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500 rounded-lg text-red-700 dark:text-red-200 shadow-md backdrop-blur-sm">
            <div className="flex items-center">
              <i className="pi pi-exclamation-circle mr-3 text-xl"></i>
              <div>
                <h3 className="font-bold text-lg">Error</h3>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {weather && selectedCity && !isPending && (
          <div className="w-full backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <i className="pi pi-map-marker mr-2"></i>
                  {selectedCity}
                </h2>
                <span className="text-sm opacity-75">Now</span>
              </div>

              <div className="flex flex-col md:flex-row items-center mb-6">
                <div className="flex-1 flex flex-col items-center">
                  <div className="relative w-28 h-28">
                    <Image
                      src={weather.iconUrl}
                      alt={weather.description}
                      fill
                      sizes="(max-width: 112px) 100vw, 112px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="text-center capitalize text-lg mt-2">
                    {weather.description}
                  </p>
                </div>

                <div className="flex-1 flex flex-col items-center mt-4 md:mt-0">
                  <p
                    className={`text-5xl font-bold ${getTempColor(
                      weather.temp
                    )}`}
                  >
                    {Math.round(weather.temp)}°C
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-white/30 dark:bg-black/30 p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <i className="pi pi-cloud text-blue-500"></i>
                </div>
                <div>
                  <p className="text-sm opacity-75">Humidity</p>
                  <p className="font-semibold">{weather.humidity}%</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <i className="pi pi-arrow-right text-green-500"></i>
                </div>
                <div>
                  <p className="text-sm opacity-75">Wind</p>
                  <p className="font-semibold">{weather.wind} m/s</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedCity && !isPending && (
          <div className="w-full backdrop-blur-sm bg-white/10 dark:bg-white/5 border border-white/30 rounded-xl p-8 text-center shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <i className="pi pi-compass text-white text-2xl"></i>
            </div>
            <h2 className="text-xl font-medium mb-2">Check the weather</h2>
            <p className="opacity-75 mb-6">
              Select a city from the dropdown to see the current weather
              conditions
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
