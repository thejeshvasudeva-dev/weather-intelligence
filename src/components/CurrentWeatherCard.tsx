import React from 'react';
import {
  MapPin,
  Clock,
  Thermometer,
  Wind,
  Droplets,
  Umbrella,
  Sun,
  ShieldAlert,
} from 'lucide-react';
import { CityResult, TempUnit, WeatherData } from '../types/weather';
import {
  getWeatherMeta,
  formatTemp,
  formatWindSpeed,
  formatTime,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  city: CityResult;
  weather: WeatherData;
  unit: TempUnit;
  onRefresh?: () => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  city,
  weather,
  unit,
}) => {
  const current = weather.current_weather;
  const meta = getWeatherMeta(current.weathercode);

  const hourly = weather.hourly;
  const daily = weather.daily;

  const currentTemp = current.temperature;
  const feelsLike = hourly?.apparent_temperature?.[0] ?? currentTemp;
  const windSpeed = current.windspeed;
  const humidity = hourly?.relative_humidity_2m?.[0] ?? 65;
  const precipChance = daily?.precipitation_probability_max?.[0] ?? hourly?.precipitation_probability?.[0] ?? 0;
  const maxTemp = daily?.temperature_2m_max?.[0] ?? currentTemp;
  const minTemp = daily?.temperature_2m_min?.[0] ?? currentTemp - 5;
  const uvIndex = daily?.uv_index_max?.[0] ?? 3;

  const localTimeFormatted = formatTime(current.time, weather.timezone);

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-6 sm:p-8 shadow-2xl shadow-blue-900/30 text-white transition-all duration-300 border border-blue-500/30"
    >
      {/* Background Ambient Glow Effect */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Header Row: Location & Local Time */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5 text-blue-200 animate-bounce" />
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {city.name}
              </h1>
              {city.country_code && (
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-sm">
                  {city.country_code}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-blue-100/80 font-medium pl-7">
              {[city.admin1, city.country].filter(Boolean).join(', ')}
            </p>
          </div>

          {/* Time & Day Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white shadow-inner">
            <Clock className="w-4 h-4 text-blue-200" />
            <span>Local Time: {localTimeFormatted}</span>
          </div>
        </div>

        {/* Hero Temperature & Condition Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 pt-2">
          {/* Main Temperature Number */}
          <div className="md:col-span-7 flex items-baseline gap-4">
            <div className="text-7xl sm:text-8xl font-black tracking-tighter text-white">
              {formatTemp(currentTemp, unit)}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-100">
                <Thermometer className="w-4 h-4 text-amber-300" />
                <span>Feels like {formatTemp(feelsLike, unit)}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-blue-200/90">
                <span>H: {formatTemp(maxTemp, unit)}</span>
                <span className="text-blue-300/50">•</span>
                <span>L: {formatTemp(minTemp, unit)}</span>
              </div>
            </div>
          </div>

          {/* Condition Icon & Badge */}
          <div className="md:col-span-5 flex flex-col items-start md:items-end justify-center space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xl">
                <WeatherIcon name={meta.iconName} className="w-12 h-12 text-white" />
              </div>
              <div className="md:text-right">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/30">
                  {meta.label}
                </div>
                <p className="text-xs text-blue-100/80 max-w-xs mt-1">
                  {meta.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Weather Metrics Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Humidity */}
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3 shadow-inner">
            <div className="p-2 rounded-xl bg-white/20 text-white">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-blue-100/80 font-medium">
                Humidity
              </div>
              <div className="text-base font-bold text-white">
                {humidity}%
              </div>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3 shadow-inner">
            <div className="p-2 rounded-xl bg-white/20 text-white">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-blue-100/80 font-medium">
                Wind
              </div>
              <div className="text-base font-bold text-white">
                {formatWindSpeed(windSpeed, unit)}
              </div>
            </div>
          </div>

          {/* Rain Probability */}
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3 shadow-inner">
            <div className="p-2 rounded-xl bg-white/20 text-white">
              <Umbrella className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-blue-100/80 font-medium">
                Precip Chance
              </div>
              <div className="text-base font-bold text-white">
                {precipChance}%
              </div>
            </div>
          </div>

          {/* UV Index */}
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3 shadow-inner">
            <div className="p-2 rounded-xl bg-white/20 text-white">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-blue-100/80 font-medium">
                UV Index
              </div>
              <div className="text-base font-bold text-white flex items-center gap-1">
                <span>{uvIndex}</span>
                <span className="text-[10px] font-normal text-blue-200">
                  {uvIndex >= 8 ? 'Extreme' : uvIndex >= 6 ? 'High' : uvIndex >= 3 ? 'Mod' : 'Low'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rain Alert Banner if Precip > 50% */}
        {precipChance >= 50 && (
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-500/20 border border-amber-300/40 text-amber-100 text-xs sm:text-sm font-medium backdrop-blur-md">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-300" />
            <span>
              <strong>Precipitation Advisory:</strong> High chance of rain ({precipChance}%) expected today. Keep rain protection ready.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
