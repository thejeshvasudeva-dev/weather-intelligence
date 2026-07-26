import React, { useState, useEffect, useCallback } from 'react';
import { CloudSun, RefreshCw, Sun, Moon, Compass, Sparkles } from 'lucide-react';
import { CityResult, TempUnit, WeatherData } from './types/weather';
import { fetchWeather, reverseGeocodeCity } from './services/weatherApi';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecastTimeline } from './components/HourlyForecastTimeline';
import { DailyForecastList } from './components/DailyForecastList';
import { WeatherIntelligencePanel } from './components/WeatherIntelligencePanel';
import { WeatherMetricsGrid } from './components/WeatherMetricsGrid';
import { ErrorStateCard } from './components/ErrorStateCard';
import { SkeletonLoader } from './components/SkeletonLoader';

const DEFAULT_CITY: CityResult = {
  id: 5128581,
  name: 'New York',
  latitude: 40.7143,
  longitude: -74.006,
  country: 'United States',
  admin1: 'New York',
  country_code: 'US',
  timezone: 'America/New_York',
};

export default function App() {
  const [selectedCity, setSelectedCity] = useState<CityResult>(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<TempUnit>('C');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingGeo, setIsLoadingGeo] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme mode and temp unit preference
  useEffect(() => {
    try {
      const savedUnit = localStorage.getItem('weather_temp_unit');
      if (savedUnit === 'C' || savedUnit === 'F') {
        setUnit(savedUnit as TempUnit);
      }

      const savedTheme = localStorage.getItem('weather_theme');
      if (
        savedTheme === 'dark' ||
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('weather_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('weather_theme', 'light');
      }
      return next;
    });
  };

  const handleToggleUnit = (newUnit: TempUnit) => {
    setUnit(newUnit);
    try {
      localStorage.setItem('weather_temp_unit', newUnit);
    } catch {
      // ignore
    }
  };

  // Load weather for selected city
  const loadWeatherForCity = useCallback(async (city: CityResult) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchWeather(city.latitude, city.longitude, city.timezone);
      setWeatherData(data);
      setSelectedCity(city);
    } catch (err) {
      console.error('Failed to load weather forecast', err);
      setErrorMessage(
        `Unable to fetch weather forecast for ${city.name}. Open-Meteo service might be temporarily unavailable.`
      );
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // On initial mount, load weather for default city
  useEffect(() => {
    loadWeatherForCity(DEFAULT_CITY);
  }, [loadWeatherForCity]);

  // GPS Geolocation trigger
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const cityResult = await reverseGeocodeCity(latitude, longitude);
          await loadWeatherForCity(cityResult);
        } catch (err) {
          console.error('Reverse geocoding error', err);
          // Fallback city object if reverse geocode fails
          const fallbackCity: CityResult = {
            id: Math.round(latitude * 1000),
            name: 'My Location',
            latitude,
            longitude,
            country: '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto',
          };
          await loadWeatherForCity(fallbackCity);
        } finally {
          setIsLoadingGeo(false);
        }
      },
      (error) => {
        setIsLoadingGeo(false);
        console.warn('Geolocation permission error:', error);
        let msg = 'Could not access your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please allow location access or search for a city manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out. Please try again.';
        }
        setErrorMessage(msg);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Sleek Background Ambient Ambient Light Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-900 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-blue-900 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Sleek Navigation Bar Header */}
        <header className="h-16 px-6 flex items-center justify-between border border-slate-800/80 bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <CloudSun className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                Weather<span className="text-blue-500">Intel</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3 h-3 text-amber-400" /> Open-Meteo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-xs font-mono text-slate-400 uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>

            {/* Controls: Theme Toggle & Refresh */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadWeatherForCity(selectedCity)}
                disabled={isLoading}
                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition active:scale-95 shadow-sm"
                title="Refresh Forecast"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
              </button>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition active:scale-95 shadow-sm"
                title="Toggle Color Theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-300" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Search Bar Section */}
        <section className="space-y-4">
          <SearchBar
            onSelectCity={loadWeatherForCity}
            onUseCurrentLocation={handleUseCurrentLocation}
            unit={unit}
            onToggleUnit={handleToggleUnit}
            isLoadingGeo={isLoadingGeo}
            activeCityName={selectedCity.name}
          />
        </section>

        {/* Main Dashboard Area */}
        <main className="space-y-8">
          {isLoading ? (
            <SkeletonLoader />
          ) : errorMessage || !weatherData ? (
            <ErrorStateCard
              message={errorMessage || undefined}
              query={selectedCity.name}
              onRetry={() => loadWeatherForCity(selectedCity)}
              onSelectCity={loadWeatherForCity}
              onUseCurrentLocation={handleUseCurrentLocation}
            />
          ) : (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* 1. Hero Current Weather */}
              <CurrentWeatherCard
                city={selectedCity}
                weather={weatherData}
                unit={unit}
                onRefresh={() => loadWeatherForCity(selectedCity)}
              />

              {/* 2. 24-Hour Forecast Timeline */}
              <HourlyForecastTimeline weather={weatherData} unit={unit} />

              {/* 3. Weather Intelligence & Smart Recommendations */}
              <WeatherIntelligencePanel weather={weatherData} />

              {/* 4. 7-Day Forecast Outlook */}
              <DailyForecastList weather={weatherData} unit={unit} />

              {/* 5. Detailed Environmental Metrics Grid */}
              <WeatherMetricsGrid weather={weatherData} unit={unit} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-medium">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span>Weather Intelligence App • Powered by Open-Meteo Geocoding & Forecast API</span>
          </div>
          <p>© {new Date().getFullYear()} Real-time Weather Intelligence. No API Key Required.</p>
        </footer>
      </div>
    </div>
  );
}
