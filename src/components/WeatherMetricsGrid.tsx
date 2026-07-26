import React from 'react';
import {
  Droplets,
  Wind,
  Sun,
  Eye,
  Sunrise,
  Sunset,
  Compass,
  Gauge,
} from 'lucide-react';
import { TempUnit, WeatherData } from '../types/weather';
import { formatTime, formatWindSpeed } from '../utils/weatherUtils';

interface WeatherMetricsGridProps {
  weather: WeatherData;
  unit: TempUnit;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({
  weather,
  unit,
}) => {
  const current = weather.current_weather;
  const hourly = weather.hourly;
  const daily = weather.daily;

  const humidity = hourly?.relative_humidity_2m?.[0] ?? 60;
  const windSpeed = current.windspeed;
  const windDir = current.winddirection;
  const visibilityMeters = hourly?.visibility?.[0] ?? 10000;
  const visibilityKm = (visibilityMeters / 1000).toFixed(1);
  const uvIndex = daily?.uv_index_max?.[0] ?? 3;

  const sunriseIso = daily?.sunrise?.[0];
  const sunsetIso = daily?.sunset?.[0];

  const sunriseFormatted = sunriseIso
    ? formatTime(sunriseIso, weather.timezone)
    : '06:00 AM';
  const sunsetFormatted = sunsetIso
    ? formatTime(sunsetIso, weather.timezone)
    : '07:30 PM';

  // Helper for wind compass direction name
  const getWindDirectionName = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Humidity Card */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-blue-400" /> Humidity
          </span>
          <span className="text-blue-400 font-bold">{humidity}%</span>
        </div>

        <div className="text-3xl font-extrabold text-white">
          {humidity}%
        </div>

        {/* Humidity Comfort Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className="h-full bg-blue-500 transition-all duration-300 rounded-full"
            style={{ width: `${humidity}%` }}
          />
        </div>

        <p className="text-xs text-slate-400">
          {humidity > 70
            ? 'High moisture feeling humid & muggy'
            : humidity < 30
            ? 'Dry atmospheric conditions'
            : 'Comfortable moisture levels'}
        </p>
      </div>

      {/* 2. Wind & Direction Card */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-teal-400" /> Wind & Direction
          </span>
          <span className="text-teal-400 font-bold">{getWindDirectionName(windDir)}</span>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-extrabold text-white">
            {formatWindSpeed(windSpeed, unit)}
          </div>
          <div
            className="p-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 transform transition-transform"
            style={{ transform: `rotate(${windDir}deg)` }}
            title={`Wind Direction: ${windDir}° (${getWindDirectionName(windDir)})`}
          >
            <Compass className="w-6 h-6" />
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Blowing from {getWindDirectionName(windDir)} ({windDir}°)
        </p>
      </div>

      {/* 3. UV Index Gauge */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-400" /> UV Index
          </span>
          <span className="text-amber-400 font-bold">{uvIndex} / 12</span>
        </div>

        <div className="text-3xl font-extrabold text-white">
          {uvIndex}
        </div>

        {/* UV Meter */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              uvIndex >= 8
                ? 'bg-purple-500'
                : uvIndex >= 6
                ? 'bg-rose-500'
                : uvIndex >= 3
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, (uvIndex / 11) * 100)}%` }}
          />
        </div>

        <p className="text-xs text-slate-400">
          {uvIndex >= 8
            ? 'Very high solar intensity. Seek shade.'
            : uvIndex >= 5
            ? 'Moderate sun exposure. Wear protection.'
            : 'Low UV risk today.'}
        </p>
      </div>

      {/* 4. Sunrise & Sunset Card */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Sunrise className="w-4 h-4 text-orange-400" /> Solar Cycle
          </span>
          <span className="text-orange-400 font-bold">Visibility {visibilityKm} km</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sunrise className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sunrise</div>
              <div className="text-xs font-bold text-slate-100">
                {sunriseFormatted}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sunset className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sunset</div>
              <div className="text-xs font-bold text-slate-100">
                {sunsetFormatted}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Clear sightlines up to {visibilityKm} km
        </p>
      </div>
    </div>
  );
};
