import { CityResult, WeatherData } from '../types/weather';

export async function searchCities(query: string): Promise<CityResult[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery || cleanQuery.length < 2) {
    return [];
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cleanQuery
  )}&count=10&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding server responded with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results as CityResult[];
  } catch (error) {
    console.error('Error fetching geocoding search results:', error);
    throw error;
  }
}

export async function fetchWeather(
  latitude: number,
  longitude: number,
  timezone = 'auto'
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,uv_index_max,wind_speed_10m_max,sunrise,sunset&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weathercode,wind_speed_10m,uv_index,visibility&timezone=${encodeURIComponent(
    timezone
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Forecast server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data as WeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function reverseGeocodeCity(
  latitude: number,
  longitude: number
): Promise<CityResult> {
  // Use Nominatim or BigDataCloud or Open-Meteo nearby search fallback
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const cityName =
        data.city || data.locality || data.principalSubdivision || 'Current Location';
      const country = data.countryName || '';
      return {
        id: Math.round(latitude * 1000 + longitude),
        name: cityName,
        latitude,
        longitude,
        country,
        admin1: data.principalSubdivision || '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto',
      };
    }
  } catch (err) {
    console.warn('Reverse geocode fallback failed, returning default coordinate city', err);
  }

  return {
    id: Date.now(),
    name: 'Current Location',
    latitude,
    longitude,
    country: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto',
  };
}
