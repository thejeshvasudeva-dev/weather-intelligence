import React from 'react';
import {
  Sparkles,
  Umbrella,
  Shirt,
  Activity,
  Bike,
  Utensils,
  MoonStar,
  ShieldCheck,
  ShieldAlert,
  Sun,
  Wind,
  CheckCircle2,
} from 'lucide-react';
import { WeatherData } from '../types/weather';
import { generateWeatherIntelligence } from '../utils/weatherUtils';

interface WeatherIntelligencePanelProps {
  weather: WeatherData;
}

export const WeatherIntelligencePanel: React.FC<WeatherIntelligencePanelProps> = ({
  weather,
}) => {
  const intel = generateWeatherIntelligence(weather);

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">
                Weather Intelligence & Smart Planning
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                AI Powered
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized clothing, umbrella, activity, and travel insights
            </p>
          </div>
        </div>
      </div>

      {/* Intelligence Narrative Banner */}
      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-sm text-slate-200 flex items-start gap-3">
        <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <span className="font-semibold text-white">Daily Outlook: </span>
          {intel.daySummary}
        </div>
      </div>

      {/* Active Alerts (if any) */}
      {intel.alerts.length > 0 && (
        <div className="space-y-2">
          {intel.alerts.map((alert, idx) => (
            <div
              key={`alert-${idx}`}
              className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold flex items-center gap-3"
            >
              <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{alert}</span>
            </div>
          ))}
        </div>
      )}

      {/* 2x2 Grid of Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Umbrella & Rain Advisory */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            intel.umbrellaNeeded
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-100'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-xl ${
                  intel.umbrellaNeeded
                    ? 'bg-blue-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                <Umbrella className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Umbrella Advisory</h3>
                <span className="text-xs opacity-80">Gear recommendation</span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                intel.umbrellaNeeded
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-emerald-600 text-white shadow-md'
              }`}
            >
              {intel.umbrellaNeeded ? 'Bring Umbrella' : 'Umbrella Optional'}
            </span>
          </div>

          <p className="text-xs leading-relaxed opacity-90 font-medium">
            {intel.umbrellaReason}
          </p>
        </div>

        {/* Card 2: What to Wear Today */}
        <div className="p-5 rounded-2xl border border-slate-700/60 bg-slate-800/40 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                What to Wear Today
              </h3>
              <span className="text-xs text-slate-400">
                Layering & apparel guide
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium italic">
            &quot;{intel.outfit.summary}&quot;
          </p>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-400 shrink-0">Top:</span>
              <span>{intel.outfit.top}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-400 shrink-0">Bottom:</span>
              <span>{intel.outfit.bottom}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-400 shrink-0">Shoes:</span>
              <span>{intel.outfit.footwear}</span>
            </div>
          </div>

          {intel.outfit.accessories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {intel.outfit.accessories.map((acc, idx) => (
                <span
                  key={`acc-${idx}`}
                  className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-medium"
                >
                  + {acc}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Outdoor Activities Ratings */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" /> Outdoor Activity Ratings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {intel.activities.map((act) => {
            let badgeStyle = 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20';
            let progressColor = 'bg-emerald-500';

            if (act.rating === 'Good') {
              badgeStyle = 'bg-blue-500/15 text-blue-300 border border-blue-500/20';
              progressColor = 'bg-blue-500';
            } else if (act.rating === 'Moderate') {
              badgeStyle = 'bg-amber-500/15 text-amber-300 border border-amber-500/20';
              progressColor = 'bg-amber-500';
            } else if (act.rating === 'Poor') {
              badgeStyle = 'bg-rose-500/15 text-rose-300 border border-rose-500/20';
              progressColor = 'bg-rose-500';
            }

            return (
              <div
                key={act.name}
                className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {act.icon === 'Activity' && <Activity className="w-4 h-4 text-blue-400" />}
                    {act.icon === 'Bike' && <Bike className="w-4 h-4 text-teal-400" />}
                    {act.icon === 'Utensils' && <Utensils className="w-4 h-4 text-amber-400" />}
                    {act.icon === 'MoonStar' && <MoonStar className="w-4 h-4 text-indigo-400" />}
                    <span className="font-bold text-xs text-slate-100">
                      {act.name}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeStyle}`}>
                    {act.rating}
                  </span>
                </div>

                {/* Score bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700/50">
                  <div
                    className={`h-full ${progressColor} transition-all duration-300`}
                    style={{ width: `${act.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {act.reason}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sun & Wind Comfort Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-amber-200">Sun & UV Safety</span>
            <p className="text-amber-300/90">{intel.uvAdvice}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-start gap-3">
          <Wind className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-teal-200">Wind Atmosphere</span>
            <p className="text-teal-300/90">{intel.windAdvice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
