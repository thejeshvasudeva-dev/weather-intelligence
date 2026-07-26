import {
  WeatherCodeMeta,
  TempUnit,
  WeatherData,
  WeatherIntelligence,
  ActivityScore,
  OutfitRecommendation,
} from '../types/weather';

// WMO Weather interpretation codes (WW)
export const WEATHER_CODES: Record<number, WeatherCodeMeta> = {
  0: {
    code: 0,
    label: 'Clear Sky',
    description: 'Crisp, clear skies with maximum sunshine',
    iconName: 'Sun',
    category: 'clear',
    gradient: 'from-amber-500/20 via-orange-500/10 to-amber-500/5',
    cardBg: 'bg-amber-500/10 border-amber-500/20',
    badgeBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-300',
    textAccent: 'text-amber-500',
  },
  1: {
    code: 1,
    label: 'Mainly Clear',
    description: 'Mostly sunny with scattered faint clouds',
    iconName: 'Sun',
    category: 'clear',
    gradient: 'from-amber-400/20 via-sky-400/10 to-blue-500/5',
    cardBg: 'bg-sky-500/10 border-sky-500/20',
    badgeBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-300',
    textAccent: 'text-sky-500',
  },
  2: {
    code: 2,
    label: 'Partly Cloudy',
    description: 'A balance of sunshine and passing clouds',
    iconName: 'CloudSun',
    category: 'cloudy',
    gradient: 'from-sky-400/20 via-slate-400/10 to-indigo-500/5',
    cardBg: 'bg-sky-500/10 border-sky-500/20',
    badgeBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-300',
    textAccent: 'text-sky-500',
  },
  3: {
    code: 3,
    label: 'Overcast',
    description: 'Thick cloud cover shading the sky',
    iconName: 'Cloud',
    category: 'cloudy',
    gradient: 'from-slate-500/20 via-gray-500/10 to-slate-600/5',
    cardBg: 'bg-slate-500/10 border-slate-500/20',
    badgeBg: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
    textAccent: 'text-slate-500',
  },
  45: {
    code: 45,
    label: 'Foggy',
    description: 'Dense fog limiting ambient visibility',
    iconName: 'CloudFog',
    category: 'fog',
    gradient: 'from-zinc-500/20 via-slate-500/10 to-zinc-600/5',
    cardBg: 'bg-zinc-500/10 border-zinc-500/20',
    badgeBg: 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-300',
    textAccent: 'text-zinc-500',
  },
  48: {
    code: 48,
    label: 'Freezing Fog',
    description: 'Depositing rime fog causing icy patches',
    iconName: 'CloudFog',
    category: 'fog',
    gradient: 'from-cyan-500/20 via-slate-500/10 to-blue-600/5',
    cardBg: 'bg-cyan-500/10 border-cyan-500/20',
    badgeBg: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300',
    textAccent: 'text-cyan-500',
  },
  51: {
    code: 51,
    label: 'Light Drizzle',
    description: 'Fine, gentle misty rain sprinkles',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    gradient: 'from-blue-400/20 via-sky-400/10 to-indigo-500/5',
    cardBg: 'bg-blue-500/10 border-blue-500/20',
    badgeBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-300',
    textAccent: 'text-blue-500',
  },
  53: {
    code: 53,
    label: 'Moderate Drizzle',
    description: 'Steady light rain mist',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    gradient: 'from-blue-500/20 via-indigo-400/10 to-sky-600/5',
    cardBg: 'bg-blue-500/10 border-blue-500/20',
    badgeBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-300',
    textAccent: 'text-blue-500',
  },
  55: {
    code: 55,
    label: 'Dense Drizzle',
    description: 'Heavy drizzle dampening surfaces quickly',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    gradient: 'from-blue-600/20 via-indigo-500/10 to-sky-700/5',
    cardBg: 'bg-blue-600/10 border-blue-600/20',
    badgeBg: 'bg-blue-600/15 text-blue-600 dark:text-blue-300',
    textAccent: 'text-blue-600',
  },
  61: {
    code: 61,
    label: 'Slight Rain',
    description: 'Light rainfall showers',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-blue-500/20 via-sky-500/10 to-indigo-600/5',
    cardBg: 'bg-blue-500/10 border-blue-500/20',
    badgeBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-300',
    textAccent: 'text-blue-500',
  },
  63: {
    code: 63,
    label: 'Moderate Rain',
    description: 'Steady rain showers throughout the day',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-indigo-500/20 via-blue-600/10 to-sky-700/5',
    cardBg: 'bg-indigo-500/10 border-indigo-500/20',
    badgeBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300',
    textAccent: 'text-indigo-500',
  },
  65: {
    code: 65,
    label: 'Heavy Rain',
    description: 'Torrential downpours and wet roads',
    iconName: 'CloudRainWind',
    category: 'rain',
    gradient: 'from-indigo-600/25 via-blue-700/15 to-slate-800/10',
    cardBg: 'bg-indigo-600/10 border-indigo-600/20',
    badgeBg: 'bg-indigo-600/15 text-indigo-700 dark:text-indigo-300',
    textAccent: 'text-indigo-600',
  },
  66: {
    code: 66,
    label: 'Light Freezing Rain',
    description: 'Chilly rain freezing on contact',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-cyan-600/20 via-blue-600/10 to-indigo-700/5',
    cardBg: 'bg-cyan-600/10 border-cyan-600/20',
    badgeBg: 'bg-cyan-600/15 text-cyan-600 dark:text-cyan-300',
    textAccent: 'text-cyan-600',
  },
  67: {
    code: 67,
    label: 'Heavy Freezing Rain',
    description: 'Dangerous freezing rain creating slick ice',
    iconName: 'CloudRainWind',
    category: 'rain',
    gradient: 'from-cyan-700/25 via-indigo-700/15 to-blue-900/10',
    cardBg: 'bg-cyan-700/10 border-cyan-700/20',
    badgeBg: 'bg-cyan-700/15 text-cyan-700 dark:text-cyan-300',
    textAccent: 'text-cyan-700',
  },
  71: {
    code: 71,
    label: 'Slight Snow',
    description: 'Light flurries dusting surfaces',
    iconName: 'CloudSnow',
    category: 'snow',
    gradient: 'from-sky-300/25 via-indigo-300/15 to-cyan-400/10',
    cardBg: 'bg-sky-400/10 border-sky-400/20',
    badgeBg: 'bg-sky-400/15 text-sky-700 dark:text-sky-200',
    textAccent: 'text-sky-400',
  },
  73: {
    code: 73,
    label: 'Moderate Snow',
    description: 'Steady snowfall with accumulating powder',
    iconName: 'CloudSnow',
    category: 'snow',
    gradient: 'from-blue-300/30 via-indigo-400/20 to-sky-500/10',
    cardBg: 'bg-blue-400/10 border-blue-400/20',
    badgeBg: 'bg-blue-400/15 text-blue-700 dark:text-blue-200',
    textAccent: 'text-blue-400',
  },
  75: {
    code: 75,
    label: 'Heavy Snow',
    description: 'Intense snowfall causing winter conditions',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-indigo-400/35 via-sky-400/25 to-blue-600/15',
    cardBg: 'bg-indigo-400/10 border-indigo-400/20',
    badgeBg: 'bg-indigo-400/15 text-indigo-700 dark:text-indigo-200',
    textAccent: 'text-indigo-400',
  },
  77: {
    code: 77,
    label: 'Snow Grains',
    description: 'Small ice pellets and frozen grains',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-slate-400/20 via-sky-400/10 to-indigo-500/5',
    cardBg: 'bg-slate-400/10 border-slate-400/20',
    badgeBg: 'bg-slate-400/15 text-slate-700 dark:text-slate-200',
    textAccent: 'text-slate-400',
  },
  80: {
    code: 80,
    label: 'Slight Showers',
    description: 'Passing rain showers with sun breaks',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-sky-400/20 via-blue-500/10 to-indigo-600/5',
    cardBg: 'bg-sky-500/10 border-sky-500/20',
    badgeBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-300',
    textAccent: 'text-sky-500',
  },
  81: {
    code: 81,
    label: 'Moderate Showers',
    description: 'Frequent rain showers coming and going',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-sky-700/5',
    cardBg: 'bg-blue-500/10 border-blue-500/20',
    badgeBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-300',
    textAccent: 'text-blue-500',
  },
  82: {
    code: 82,
    label: 'Violent Showers',
    description: 'Torrential localized downpours with gusts',
    iconName: 'CloudRainWind',
    category: 'rain',
    gradient: 'from-indigo-700/30 via-blue-800/20 to-slate-900/15',
    cardBg: 'bg-indigo-700/10 border-indigo-700/20',
    badgeBg: 'bg-indigo-700/15 text-indigo-800 dark:text-indigo-200',
    textAccent: 'text-indigo-700',
  },
  85: {
    code: 85,
    label: 'Light Snow Showers',
    description: 'Intermittent snow flurries',
    iconName: 'CloudSnow',
    category: 'snow',
    gradient: 'from-sky-300/20 via-indigo-300/10 to-blue-500/5',
    cardBg: 'bg-sky-300/10 border-sky-300/20',
    badgeBg: 'bg-sky-300/15 text-sky-700 dark:text-sky-200',
    textAccent: 'text-sky-400',
  },
  86: {
    code: 86,
    label: 'Heavy Snow Showers',
    description: 'Squalls of snow with sudden reduced visibility',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-indigo-400/30 via-blue-500/20 to-sky-600/10',
    cardBg: 'bg-indigo-400/10 border-indigo-400/20',
    badgeBg: 'bg-indigo-400/15 text-indigo-700 dark:text-indigo-200',
    textAccent: 'text-indigo-400',
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    description: 'Thunder and lightning with rain bursts',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    gradient: 'from-purple-600/25 via-indigo-700/15 to-slate-900/10',
    cardBg: 'bg-purple-600/10 border-purple-600/20',
    badgeBg: 'bg-purple-600/15 text-purple-600 dark:text-purple-300',
    textAccent: 'text-purple-600',
  },
  96: {
    code: 96,
    label: 'Thunderstorm w/ Hail',
    description: 'Severe storm with lightning and small hail',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    gradient: 'from-purple-700/30 via-pink-700/15 to-slate-900/15',
    cardBg: 'bg-purple-700/10 border-purple-700/20',
    badgeBg: 'bg-purple-700/15 text-purple-700 dark:text-purple-200',
    textAccent: 'text-purple-700',
  },
  99: {
    code: 99,
    label: 'Heavy Hail Thunderstorm',
    description: 'Severe storm with dangerous heavy hail',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    gradient: 'from-purple-900/35 via-rose-800/20 to-slate-950/20',
    cardBg: 'bg-purple-900/10 border-purple-900/20',
    badgeBg: 'bg-purple-900/15 text-purple-800 dark:text-purple-200',
    textAccent: 'text-purple-800',
  },
};

export function getWeatherMeta(code: number): WeatherCodeMeta {
  return (
    WEATHER_CODES[code] || {
      code,
      label: 'Variable Weather',
      description: 'Changing weather conditions',
      iconName: 'Cloud',
      category: 'cloudy',
      gradient: 'from-slate-400/20 via-sky-400/10 to-gray-500/5',
      cardBg: 'bg-slate-500/10 border-slate-500/20',
      badgeBg: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
      textAccent: 'text-slate-500',
    }
  );
}

export function formatTemp(tempC: number, unit: TempUnit): string {
  if (isNaN(tempC) || tempC === null || tempC === undefined) return '--';
  if (unit === 'F') {
    const f = (tempC * 9) / 5 + 32;
    return `${Math.round(f)}°F`;
  }
  return `${Math.round(tempC)}°C`;
}

export function formatTempNum(tempC: number, unit: TempUnit): number {
  if (unit === 'F') {
    return Math.round((tempC * 9) / 5 + 32);
  }
  return Math.round(tempC);
}

export function formatWindSpeed(kmh: number, unit: TempUnit): string {
  if (isNaN(kmh) || kmh === null) return '--';
  if (unit === 'F') {
    const mph = kmh * 0.621371;
    return `${Math.round(mph)} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}

export function formatTime(isoString: string, timezone?: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone || undefined,
    });
  } catch {
    return isoString.split('T')[1]?.substring(0, 5) || isoString;
  }
}

export function formatHourLabel(isoString: string): string {
  try {
    const date = new Date(isoString);
    const hour = date.getHours();
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  } catch {
    return isoString.substring(11, 16);
  }
}

export function formatDayName(dateStr: string, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } catch {
    return dateStr;
  }
}

export function formatDateFormatted(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

// Weather Intelligence Calculator
export function generateWeatherIntelligence(
  weather: WeatherData
): WeatherIntelligence {
  const current = weather.current_weather;
  const temp = current?.temperature ?? 20;
  const code = current?.weathercode ?? 0;
  const wind = current?.windspeed ?? 10;

  const todayDaily = weather.daily;
  const maxPrecipChance = todayDaily?.precipitation_probability_max?.[0] ?? 0;
  const maxUV = todayDaily?.uv_index_max?.[0] ?? 3;

  // Rain codes check
  const isRaining = [51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code);
  const isSnowing = [71, 73, 75, 77, 85, 86].includes(code);

  // Umbrella Recommendation
  let umbrellaNeeded = false;
  let umbrellaReason = '';

  if (isRaining) {
    umbrellaNeeded = true;
    umbrellaReason = 'Active rain underway. Carry a broad umbrella or waterproof shell.';
  } else if (maxPrecipChance >= 60) {
    umbrellaNeeded = true;
    umbrellaReason = `High rain risk (${maxPrecipChance}% probability today). Keep an umbrella handy.`;
  } else if (maxPrecipChance >= 35) {
    umbrellaNeeded = false;
    umbrellaReason = `Moderate ${maxPrecipChance}% chance of spotty rain. Lightweight raincoat optional.`;
  } else {
    umbrellaNeeded = false;
    umbrellaReason = 'Low precipitation risk today. You can comfortably leave the umbrella behind.';
  }

  // Outfit Recommendation
  let summary = '';
  let top = '';
  let bottom = '';
  let footwear = '';
  const accessories: string[] = [];

  if (temp < 0) {
    summary = 'Freezing sub-zero weather. Dress in thick insulated winter layers.';
    top = 'Heavy down coat with thermal base layer and fleece pullover';
    bottom = 'Thermal leggings under fleece-lined trousers';
    footwear = 'Insulated waterproof winter boots with thick wool socks';
    accessories.push('Warm beanie/beanie hat', 'Thermal gloves or mittens', 'Thick neck scarf');
  } else if (temp < 10) {
    summary = 'Crisp, cold weather. Layer up with a warm jacket and coat.';
    top = 'Heavy coat or wool trench with a sweater underneath';
    bottom = 'Warm denim jeans or insulated trousers';
    footwear = 'Sturdy leather boots or warm closed shoes';
    accessories.push('Knit scarf', 'Light gloves');
  } else if (temp < 18) {
    summary = 'Mild to cool conditions. A comfortable jacket or cardigan is ideal.';
    top = 'Light jacket, denim jacket, or sweater over a shirt';
    bottom = 'Jeans, chinos, or full-length pants';
    footwear = 'Comfortable sneakers or casual boots';
  } else if (temp < 26) {
    summary = 'Pleasantly warm weather. Casual, light breathable clothing recommended.';
    top = 'Cotton T-shirt, linen shirt, or blouse';
    bottom = 'Lightweight pants, chinos, or denim';
    footwear = 'Breathable sneakers, loafers, or flat shoes';
  } else {
    summary = 'Hot & sunny environment. Wear lightweight, loose-fitting breathable attire.';
    top = 'Breathable linen shirt or sleeveless tee';
    bottom = 'Shorts, skirt, or light linen trousers';
    footwear = 'Open sandals or breathable mesh sneakers';
  }

  if (umbrellaNeeded) {
    accessories.push('Compact windproof umbrella', 'Water-resistant outer coat');
  }

  if (maxUV >= 6) {
    accessories.push('UV400 Sunglasses', 'Broad-spectrum SPF 50 sunscreen', 'Wide-brim hat');
  } else if (maxUV >= 3) {
    accessories.push('Sunglasses', 'SPF 30 Sunscreen');
  }

  if (wind > 30) {
    accessories.push('Windbreaker outer shell');
  }

  const outfit: OutfitRecommendation = {
    summary,
    top,
    bottom,
    footwear,
    accessories,
  };

  // Outdoor Activities Evaluation
  const activities: ActivityScore[] = [];

  // 1. Running & Jogging
  let runScore = 90;
  let runReason = 'Great conditions for a outdoor run.';
  if (temp < 2) {
    runScore -= 30;
    runReason = 'Freezing air; wear thermal layers and protect ears.';
  } else if (temp > 28) {
    runScore -= 40;
    runReason = 'High heat hazard; run early morning or evening.';
  }
  if (isRaining) {
    runScore -= 45;
    runReason = 'Wet pavement increases slip risk and discomfort.';
  }
  if (wind > 30) {
    runScore -= 25;
    runReason = 'Strong headwind and gusts present.';
  }
  activities.push({
    name: 'Running & Jogging',
    score: Math.max(10, Math.min(100, runScore)),
    rating: runScore >= 80 ? 'Optimal' : runScore >= 60 ? 'Good' : runScore >= 40 ? 'Moderate' : 'Poor',
    icon: 'Activity',
    reason: runReason,
  });

  // 2. Cycling & Commuting
  let cycleScore = 85;
  let cycleReason = 'Clear roads and smooth riding atmosphere.';
  if (wind > 35) {
    cycleScore -= 50;
    cycleReason = 'High wind gusts make cycling unsafe.';
  } else if (wind > 20) {
    cycleScore -= 20;
    cycleReason = 'Noticeable crosswinds; ride cautiously.';
  }
  if (isRaining) {
    cycleScore -= 45;
    cycleReason = 'Slippery roads and reduced braking response.';
  }
  if (temp < 5) {
    cycleReason += ' Wear windproof gloves for chilly handlebars.';
  }
  activities.push({
    name: 'Cycling & Commuting',
    score: Math.max(10, Math.min(100, cycleScore)),
    rating: cycleScore >= 80 ? 'Optimal' : cycleScore >= 60 ? 'Good' : cycleScore >= 40 ? 'Moderate' : 'Poor',
    icon: 'Bike',
    reason: cycleReason,
  });

  // 3. Outdoor Dining & Picnic
  let diningScore = 80;
  let diningReason = 'Pleasant weather for patio dining or park picnic.';
  if (isRaining || maxPrecipChance > 50) {
    diningScore -= 60;
    diningReason = 'Rain risk makes indoor seating a much better choice.';
  }
  if (temp < 15) {
    diningScore -= 35;
    diningReason = 'Cool breeze; outdoor heaters or indoor table advised.';
  } else if (temp > 30) {
    diningScore -= 30;
    diningReason = 'Intense heat; seek shaded outdoor patio tables.';
  }
  if (wind > 25) {
    diningScore -= 30;
    diningReason = 'Gusty winds may blow away napkins and umbrella shades.';
  }
  activities.push({
    name: 'Patio & Picnic',
    score: Math.max(10, Math.min(100, diningScore)),
    rating: diningScore >= 80 ? 'Optimal' : diningScore >= 60 ? 'Good' : diningScore >= 40 ? 'Moderate' : 'Poor',
    icon: 'Utensils',
    reason: diningReason,
  });

  // 4. Stargazing / Night Walks
  let starScore = 85;
  let starReason = 'Clear skies offer crisp visibility for stargazing.';
  if (code === 3 || code === 2) {
    starScore -= 40;
    starReason = 'Cloud cover obscures night sky sightlines.';
  } else if (isRaining || isSnowing) {
    starScore -= 80;
    starReason = 'Overcast precipitation prevents sky viewing.';
  }
  activities.push({
    name: 'Stargazing / Night Walk',
    score: Math.max(10, Math.min(100, starScore)),
    rating: starScore >= 80 ? 'Optimal' : starScore >= 60 ? 'Good' : starScore >= 40 ? 'Moderate' : 'Poor',
    icon: 'MoonStar',
    reason: starReason,
  });

  // Alerts
  const alerts: string[] = [];
  if (code >= 95) {
    alerts.push('Thunderstorm Warning: Remain indoors during active lightning bursts.');
  }
  if (wind > 45) {
    alerts.push(`High Wind Advisory (${Math.round(wind)} km/h gusts): Secure outdoor items.`);
  }
  if (maxUV >= 8) {
    alerts.push(`Extreme UV Index (${maxUV}): Limit direct sun exposure between 11 AM - 4 PM.`);
  }
  if (temp > 35) {
    alerts.push('Excessive Heat Alert: Stay hydrated and seek air conditioning.');
  }
  if (temp < -5) {
    alerts.push('Frostbite & Ice Warning: Limit exposed skin outdoors.');
  }

  // UV & Wind Advice
  let uvAdvice = 'Low UV levels. Minimal sun protection required.';
  if (maxUV >= 8) {
    uvAdvice = `Very High UV (${maxUV}). Wear SPF 50+, sunglasses, and seek shade during peak hours.`;
  } else if (maxUV >= 6) {
    uvAdvice = `High UV (${maxUV}). Sun protection needed. Apply sunscreen every 2 hours.`;
  } else if (maxUV >= 3) {
    uvAdvice = `Moderate UV (${maxUV}). Wear sunglasses on sunny afternoons.`;
  }

  let windAdvice = 'Light, gentle breeze.';
  if (wind > 40) {
    windAdvice = `Strong winds at ${Math.round(wind)} km/h. Take care when driving high-profile vehicles.`;
  } else if (wind > 20) {
    windAdvice = `Moderate breeze at ${Math.round(wind)} km/h. Fresh air circulation.`;
  }

  const meta = getWeatherMeta(code);
  const daySummary = `${meta.label} today with temperatures reaching around ${Math.round(
    todayDaily?.temperature_2m_max?.[0] ?? temp
  )}°C and lows of ${Math.round(
    todayDaily?.temperature_2m_min?.[0] ?? temp - 5
  )}°C. ${meta.description}.`;

  return {
    umbrellaNeeded,
    umbrellaReason,
    outfit,
    activities,
    alerts,
    daySummary,
    uvAdvice,
    windAdvice,
  };
}
