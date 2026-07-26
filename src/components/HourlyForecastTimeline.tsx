import React from 'react';
import { Clock, Umbrella, Wind } from 'lucide-react';
import { TempUnit, WeatherData } from '../types/weather';
import {
  formatTemp,
  formatHourLabel,
  getWeatherMeta,
  formatWindSpeed,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastTimelineProps {
  weather: WeatherData;
  unit: TempUnit;
}

export const HourlyForecastTimeline: React.FC<HourlyForecastTimelineProps> = ({
  weather,
  unit,
}) => {
  const hourly = weather.hourly;
  if (!hourly || !hourly.time || hourly.time.length === 0) {
    return null;
  }

  // Get current hour index from weather time or default to next 24 hours
  const currentTime = weather.current_weather.time;
  let startIndex = hourly.time.findIndex((t) => t >= currentTime);
  if (startIndex === -1) startIndex = 0;

  // Take 24 hours starting from current
  const hoursSlice = hourly.time.slice(startIndex, startIndex + 24);

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Hourly Forecast
            </h3>
            <p className="text-xs text-slate-400">
              Next 24 hours temperature & precipitation timeline
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Timeline */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
        {hoursSlice.map((timeStr, idx) => {
          const actualIndex = startIndex + idx;
          const temp = hourly.temperature_2m[actualIndex];
          const code = hourly.weathercode[actualIndex];
          const precip = hourly.precipitation_probability?.[actualIndex] ?? 0;
          const wind = hourly.wind_speed_10m?.[actualIndex] ?? 0;
          const isCurrentHour = idx === 0;

          const meta = getWeatherMeta(code);

          return (
            <div
              key={`hour-${timeStr}-${idx}`}
              className={`flex-shrink-0 flex flex-col items-center justify-between w-24 p-3.5 rounded-2xl border transition-all duration-200 group ${
                isCurrentHour
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 scale-105'
                  : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80 hover:border-blue-500/50'
              }`}
            >
              {/* Hour Label */}
              <span
                className={`text-xs font-semibold ${
                  isCurrentHour
                    ? 'text-blue-100'
                    : 'text-slate-400'
                }`}
              >
                {isCurrentHour ? 'Now' : formatHourLabel(timeStr)}
              </span>

              {/* Weather Icon */}
              <div
                className={`my-2 p-2 rounded-xl transition-transform group-hover:scale-110 ${
                  isCurrentHour
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800 border border-slate-700/60'
                }`}
              >
                <WeatherIcon name={meta.iconName} className={`w-6 h-6 ${isCurrentHour ? 'text-white' : 'text-blue-400'}`} />
              </div>

              {/* Temperature */}
              <span
                className={`text-base font-bold ${
                  isCurrentHour
                    ? 'text-white'
                    : 'text-slate-100'
                }`}
              >
                {formatTemp(temp, unit)}
              </span>

              {/* Precipitation Bar Indicator */}
              <div className="w-full mt-2.5 pt-2 border-t border-slate-700/50 space-y-1">
                <div className="flex items-center justify-center gap-1 text-[11px] font-medium">
                  <Umbrella
                    className={`w-3 h-3 ${
                      isCurrentHour
                        ? 'text-blue-200'
                        : precip > 30
                        ? 'text-sky-400'
                        : 'text-slate-500'
                    }`}
                  />
                  <span
                    className={
                      isCurrentHour
                        ? 'text-blue-100'
                        : precip > 30
                        ? 'text-sky-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    {precip}%
                  </span>
                </div>

                {/* Micro Wind */}
                <div
                  className={`flex items-center justify-center gap-1 text-[10px] ${
                    isCurrentHour ? 'text-blue-200' : 'text-slate-500'
                  }`}
                >
                  <Wind className="w-2.5 h-2.5" />
                  <span>{formatWindSpeed(wind, unit)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
