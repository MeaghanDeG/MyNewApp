// src/util/rateWeather.ts
export const rateWeather = (weather: string): number => {
    const scores = {
      Clear: 10,
      Clouds: 8,
      Rain: 5,
      Snow: 6,
      Thunderstorm: 3,
    };
    return scores[weather] || 0;
  };
  