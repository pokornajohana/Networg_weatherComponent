import * as React from 'react';
import './index.css';
import {
  CloudyIcon,
  PartlyCloudyDayIcon,
  SunnyIcon,
  SnowIcon,
  RainSnowIcon,
  RainIcon,
  ThunderstormsIcon,
  FogIcon,
} from '@fluentui/react-icons-mdl2';
import { type } from 'os';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const WeatherCard = ({
  index,
  day,
  temperature,
  weather,
}: {
  index: number;
  day: string;
  temperature: number;
  weather: string;
}) => {
  let date = new Date(day);
  let formattedDate = date
    .toLocaleString('cs-CZ', { weekday: 'long' })
    .toUpperCase();

  const weatherElements = (
    <div className="one_day" key={index}>
      <p className="name_day">{formattedDate}</p>
      <p className="date_day">{date.toLocaleDateString('en-GB')}</p>

      {weather === 'Rain' ? (
        <RainIcon className="weather_icon" />
      ) : weather === 'Clouds' ? (
        <CloudyIcon className="weather_icon" />
      ) : weather === 'Snow' ? (
        <SnowIcon className="weather_icon" />
      ) : weather === 'Thunderstorm' ? (
        <ThunderstormsIcon className="weather_icon" />
      ) : weather === 'Drizzle' ? (
        <RainIcon className="weather_icon" />
      ) : weather === 'Clear' ? (
        <SunnyIcon className="weather_icon" />
      ) : (
        <FogIcon className="weather_icon" />
      )}
      <p className="temperature_day">{Math.round(temperature)}°C</p>
      <p className="weather_day">{weather}</p>
    </div>
  );
  return <>{weatherElements}</>;
};
