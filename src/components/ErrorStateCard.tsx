import React from 'react';
import { AlertCircle, RefreshCw, MapPin, Search, Navigation } from 'lucide-react';
import { CityResult } from '../types/weather';

interface ErrorStateCardProps {
  message?: string;
  query?: string;
  onRetry?: () => void;
  onSelectCity?: (city: CityResult) => void;
  onUseCurrentLocation?: () => void;
}

const SAMPLE_RECOVERY_CITIES: CityResult[] = [
  { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom', country_code: 'GB', timezone: 'Europe/London' },
  { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States', admin1: 'New York', country_code: 'US', timezone: 'America/New_York' },
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan', country_code: 'JP', timezone: 'Asia/Tokyo' },
  { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France', country_code: 'FR', timezone: 'Europe/Paris' },
  { id: 2147714, name: 'Sydney', latitude: -33.8678, longitude: 151.2073, country: 'Australia', admin1: 'New South Wales', country_code: 'AU', timezone: 'Australia/Sydney' },
];

export const ErrorStateCard: React.FC<ErrorStateCardProps> = ({
  message,
  query,
  onRetry,
  onSelectCity,
  onUseCurrentLocation,
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-8 border border-slate-800 shadow-xl text-center max-w-2xl mx-auto my-8 space-y-6">
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto shadow-inner">
        <AlertCircle className="w-8 h-8" />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">
          City Not Found or Weather Unavailable
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          {message ||
            (query
              ? `We couldn't find any weather results for "${query}". Please check the spelling or try searching with a country name.`
              : 'Unable to load weather forecast right now. Please check your network connection and try again.')}
        </p>
      </div>

      {/* Tips Box */}
      <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-400 text-left space-y-1.5 max-w-md mx-auto">
        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-blue-400" /> Helpful Search Tips:
        </div>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li>Double-check for typos (e.g., &quot;London&quot; instead of &quot;Lndn&quot;).</li>
          <li>Include state or country name (e.g., &quot;Miami, Florida&quot; or &quot;Kyoto, Japan&quot;).</li>
          <li>Or tap &quot;My Location&quot; below to fetch local weather automatically.</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-2xl sm:rounded-full shadow-lg shadow-blue-600/20 transition active:scale-95"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        )}

        {onUseCurrentLocation && (
          <button
            onClick={onUseCurrentLocation}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-semibold rounded-2xl sm:rounded-full border border-slate-700 transition active:scale-95"
          >
            <Navigation className="w-4 h-4 text-blue-400" /> Use Current Location
          </button>
        )}
      </div>

      {/* Popular Cities Quick Choices */}
      {onSelectCity && (
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Or select a popular destination:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SAMPLE_RECOVERY_CITIES.map((city) => (
              <button
                key={`rec-${city.id}`}
                onClick={() => onSelectCity(city)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-500/50 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition"
              >
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
