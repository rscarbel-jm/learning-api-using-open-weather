# Weather Forecast App

A NextJS 15 application designed to help developers learn how to work with external APIs through a practical weather forecast implementation.

## 🌦️ Project Overview

This project is a simple weather application built with NextJS 15 that displays current weather conditions for selected cities. The application is intentionally designed as a learning exercise for working with third-party APIs, specifically the OpenWeather API.

**Learning objectives:**

- Understanding API integration in Next.js applications
- Working with environment variables
- Implementing service classes for API communication
- Data transformation and validation with Zod
- Error handling in API requests

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- An OpenWeather API key (free tier available)

### Installation

1. Clone this repository:

```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the project root with the following variables:

```
OPEN_WEATHER_API_KEY=your_api_key_here
ROOT_URL=http://localhost:3000
```

> **Important**: You'll need to register for a free API key at [OpenWeather](https://openweathermap.org/api) if you don't already have one.

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧩 Project Structure

The application follows a standard Next.js structure with some additional organization:

```
weather-app/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   ├── server-actions/       # Server actions
│   └── page.tsx              # Main page component
├── models/                   # Data models and validation schemas
├── services/                 # Service classes for external APIs
│   └── WeatherService.ts     # Weather API service (to be implemented)
└── [other configuration files]
```

## 🔍 Your Task

Your main task is to implement the `getWeather` method in the `WeatherService` class. This is where you'll interact with the OpenWeather API.

```typescript
// This is what needs to be implemented in services/WeatherService.ts:
getWeather(city: City): Weather {
  // Your implementation here
}
```

### Implementation Requirements

1. Study the Weather model in `models/weather.model.ts` to understand what data needs to be returned
2. Familiarize yourself with the [OpenWeather API documentation](https://openweathermap.org/api)
3. Implement the `getWeather` method to fetch weather data for the specified city
4. Transform the API response to match the Weather type
5. Add appropriate error handling

### Development Tips

- The OpenWeather API provides multiple endpoints - the "Current Weather Data" endpoint is recommended for this task
- Review the existing models to understand the required data structure
- Consider implementing helper methods as suggested in the comments
- Use the `Weather.SCHEMA` Zod parser to validate and transform the API response
- Test your implementation with different cities and error scenarios

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenWeather API Documentation](https://openweathermap.org/api)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🧪 Testing Your Implementation

Once you've implemented the `WeatherService`, you can test it by:

1. Selecting a city from the dropdown on the main page
2. The app will call your implementation and display the weather data
3. If there are any errors, they will be displayed on the screen

## 🔑 API Key Security

Remember that the API key should never be exposed to the client side. The current implementation correctly keeps it server-side only.

## 📝 Notes

- The application uses Tailwind CSS for styling
- PrimeReact components are used for the UI
- Zod is used for data validation and parsing
- The app is designed to show different backgrounds based on the time of day

## 🚧 Troubleshooting

- If you see an error about the API key, make sure you've added it to your `.env` file
- If the app shows "Not implemented yet!" errors, it means you still need to implement the `getWeather` method
- Check browser console and server logs for additional error details

Good luck!
