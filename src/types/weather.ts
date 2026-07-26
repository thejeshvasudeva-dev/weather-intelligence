export interface CityResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string; // State or region
  country?: string;
  timezone: string;
  population?: number;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m?: number[];
  apparent_temperature?: number[];
  precipitation_probability?: number[];
  weathercode: number[];
  wind_speed_10m?: number[];
  uv_index?: number[];
  visibility?: number[];
}

export interface DailyWeather {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max?: number[];
  uv_index_max?: number[];
  wind_speed_10m_max?: number[];
  sunrise?: string[];
  sunset?: string[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  elevation?: number;
  timezone: string;
  timezone_abbreviation?: string;
  current_weather: CurrentWeather;
  hourly?: HourlyWeather;
  daily?: DailyWeather;
}

export type TempUnit = 'C' | 'F';

export interface WeatherCodeMeta {
  code: number;
  label: string;
  description: string;
  iconName: string; // Lucide icon identifier
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  gradient: string;
  cardBg: string;
  badgeBg: string;
  textAccent: string;
}

export interface ActivityScore {
  name: string;
  score: number; // 0 to 100
  rating: 'Optimal' | 'Good' | 'Moderate' | 'Poor';
  icon: string;
  reason: string;
}

export interface OutfitRecommendation {
  summary: string;
  top: string;
  bottom: string;
  footwear: string;
  accessories: string[];
}

export interface WeatherIntelligence {
  umbrellaNeeded: boolean;
  umbrellaReason: string;
  outfit: OutfitRecommendation;
  activities: ActivityScore[];
  alerts: string[];
  daySummary: string;
  uvAdvice: string;
  windAdvice: string;
}
