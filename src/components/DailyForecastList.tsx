import React from 'react';
import { Calendar, Umbrella, Sun, Wind } from 'lucide-react';
import { TempUnit, WeatherData } from '../types/weather';
import {
  formatDayName,
  formatDateFormatted,
  formatTemp,
  getWeatherMeta,
  formatTempNum,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastListProps {
  weather: WeatherData;
  unit: TempUnit;
}

export const DailyForecastList: React.FC<DailyForecastListProps> = ({
  weather,
  unit,
}) => {
  const daily = weather.daily;
  if (!daily || !daily.time || daily.time.length === 0) {
    return null;
  }

  // Calculate global min and max across all 7 days for proportionally calibrated temperature range bars
  const allMaxs = daily.temperature_2m_max;
  const allMins = daily.temperature_2m_min;
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const totalRange = Math.max(1, globalMax - globalMin);

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              7-Day Forecast
            </h3>
            <p className="text-xs text-slate-400">
              Weekly weather outlook and thermal range
            </p>
          </div>
        </div>
      </div>

      {/* Daily Rows */}
      <div className="space-y-3">
        {daily.time.slice(0, 7).map((dateStr, idx) => {
          const maxTemp = daily.temperature_2m_max[idx];
          const minTemp = daily.temperature_2m_min[idx];
          const code = daily.weathercode[idx];
          const precip = daily.precipitation_probability_max?.[idx] ?? 0;
          const uv = daily.uv_index_max?.[idx] ?? 0;

          const meta = getWeatherMeta(code);
          const dayTitle = formatDayName(dateStr, idx);
          const dateSubtitle = formatDateFormatted(dateStr);

          // Calculate percentage offsets for visual temperature bar
          const minPercent = ((minTemp - globalMin) / totalRange) * 100;
          const maxPercent = ((maxTemp - globalMin) / totalRange) * 100;
          const barWidth = Math.max(8, maxPercent - minPercent);

          return (
            <div
              key={`day-${dateStr}`}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
            >
              {/* Day & Date Name */}
              <div className="flex items-center gap-3 w-36 shrink-0">
                <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60">
                  <WeatherIcon name={meta.iconName} className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-100 text-sm">
                    {dayTitle}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {dateSubtitle}
                  </div>
                </div>
              </div>

              {/* Weather Description */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 w-32 shrink-0">
                <span className="truncate">{meta.label}</span>
              </div>

              {/* Rain Chance & UV Indicators */}
              <div className="flex items-center gap-3 shrink-0 text-xs">
                {precip > 0 ? (
                  <div className="flex items-center gap-1 text-sky-400 font-semibold bg-sky-500/10 px-2 py-1 rounded-lg border border-sky-500/20">
                    <Umbrella className="w-3.5 h-3.5" />
                    <span>{precip}%</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-slate-500 px-2 py-1">
                    <Umbrella className="w-3.5 h-3.5" />
                    <span>0%</span>
                  </div>
                )}

                {uv >= 6 && (
                  <div className="hidden sm:flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg font-semibold">
                    <Sun className="w-3.5 h-3.5" />
                    <span>UV {uv}</span>
                  </div>
                )}
              </div>

              {/* Temperature Bar Visualizer */}
              <div className="flex items-center gap-3 w-full sm:w-56 shrink-0">
                <span className="text-xs font-semibold text-slate-400 w-10 text-right">
                  {formatTemp(minTemp, unit)}
                </span>

                {/* Bar */}
                <div className="relative flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-amber-400 transition-all duration-300"
                    style={{
                      left: `${Math.max(0, minPercent)}%`,
                      width: `${Math.min(100 - minPercent, barWidth)}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-bold text-slate-100 w-10">
                  {formatTemp(maxTemp, unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
