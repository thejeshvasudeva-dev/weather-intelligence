import React from 'react';
import * as Icons from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  name,
  className = 'w-6 h-6',
  size,
}) => {
  // Safe dynamic icon loader from lucide-react
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[
    name
  ] || Icons.Cloud;

  return <IconComponent className={className} size={size} />;
};
