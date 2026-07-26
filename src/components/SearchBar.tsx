import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Navigation,
  X,
  History,
  Sparkles,
  Loader2,
  Globe2,
} from 'lucide-react';
import { CityResult, TempUnit } from '../types/weather';
import { searchCities } from '../services/weatherApi';

interface SearchBarProps {
  onSelectCity: (city: CityResult) => void;
  onUseCurrentLocation: () => void;
  unit: TempUnit;
  onToggleUnit: (unit: TempUnit) => void;
  isLoadingGeo: boolean;
  activeCityName?: string;
}

const POPULAR_CITIES: CityResult[] = [
  { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom', country_code: 'GB', timezone: 'Europe/London' },
  { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States', admin1: 'New York', country_code: 'US', timezone: 'America/New_York' },
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan', country_code: 'JP', timezone: 'Asia/Tokyo' },
  { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France', country_code: 'FR', timezone: 'Europe/Paris' },
  { id: 2147714, name: 'Sydney', latitude: -33.8678, longitude: 151.2073, country: 'Australia', admin1: 'New South Wales', country_code: 'AU', timezone: 'Australia/Sydney' },
  { id: 292223, name: 'Dubai', latitude: 25.2582, longitude: 55.3047, country: 'United Arab Emirates', country_code: 'AE', timezone: 'Asia/Dubai' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCity,
  onUseCurrentLocation,
  unit,
  onToggleUnit,
  isLoadingGeo,
  activeCityName,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentCities, setRecentCities] = useState<CityResult[]>([]);
  const [hasError, setHasError] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('weather_recent_cities');
      if (saved) {
        setRecentCities(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Close suggestions dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced geocoding search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      setHasError(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setHasError(false);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setIsOpen(true);
      } catch {
        setHasError(true);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (city: CityResult) => {
    setQuery('');
    setIsOpen(false);
    onSelectCity(city);

    // Save to recent cities
    setRecentCities((prev) => {
      const filtered = prev.filter((c) => c.id !== city.id && c.name !== city.name);
      const updated = [city, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('weather_recent_cities', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentCities([]);
    localStorage.removeItem('weather_recent_cities');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto space-y-3" ref={wrapperRef}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input Container */}
        <div className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              id="city-search-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search city, e.g., 'Paris', 'Tokyo', 'Chicago'..."
              className="w-full pl-12 pr-10 py-3 bg-slate-900/80 backdrop-blur-md text-slate-100 placeholder-slate-500 border border-slate-800 rounded-2xl sm:rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSuggestions([]);
                }}
                className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {isSearching && (
              <div className="absolute right-3">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              </div>
            )}
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-150">
              {suggestions.length > 0 ? (
                <div className="py-2 max-h-72 overflow-y-auto">
                  <div className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5" /> Matching Locations
                  </div>
                  {suggestions.map((city) => (
                    <button
                      key={`${city.id}-${city.latitude}-${city.longitude}`}
                      onClick={() => handleSelect(city)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-800/80 transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-100 text-sm">
                            {city.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {[city.admin1, city.country].filter(Boolean).join(', ')}
                          </div>
                        </div>
                      </div>
                      {city.country_code && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                          {city.country_code}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : query.trim().length >= 2 && !isSearching ? (
                <div className="p-6 text-center text-slate-400 text-sm space-y-1">
                  <p className="font-medium text-slate-300">
                    No results for &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-slate-500">
                    Check spelling or try adding country name (e.g., &quot;Rome, Italy&quot;)
                  </p>
                </div>
              ) : recentCities.length > 0 && !query ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5" /> Recent Searches
                    </span>
                    <button
                      onClick={clearRecent}
                      className="text-slate-400 hover:text-slate-200 capitalize font-normal"
                    >
                      Clear
                    </button>
                  </div>
                  {recentCities.map((city) => (
                    <button
                      key={`recent-${city.id}`}
                      onClick={() => handleSelect(city)}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 transition flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <History className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-200">
                          {city.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {city.country}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Action Controls: GPS Button & Unit Toggle */}
        <div className="flex items-center gap-2">
          {/* Current Location GPS Button */}
          <button
            type="button"
            id="gps-location-btn"
            onClick={onUseCurrentLocation}
            disabled={isLoadingGeo}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-2xl sm:rounded-full shadow-lg shadow-blue-600/20 transition active:scale-[0.98] disabled:opacity-60"
            title="Use Current Location"
          >
            {isLoadingGeo ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 fill-white/20" />
            )}
            <span className="whitespace-nowrap">My Location</span>
          </button>

          {/* Unit Toggle Button */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-2xl sm:rounded-full border border-slate-800">
            <button
              type="button"
              onClick={() => onToggleUnit('C')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl sm:rounded-full transition-all ${
                unit === 'C'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => onToggleUnit('F')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl sm:rounded-full transition-all ${
                unit === 'F'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Popular City Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
        <span className="text-xs font-medium text-slate-400 whitespace-nowrap flex items-center gap-1 pr-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Popular:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={`pop-${city.id}`}
            onClick={() => handleSelect(city)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition whitespace-nowrap border ${
              activeCityName?.toLowerCase() === city.name.toLowerCase()
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 font-semibold shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};
