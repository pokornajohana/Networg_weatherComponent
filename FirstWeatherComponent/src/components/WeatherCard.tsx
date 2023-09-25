// import React from 'react';
// import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import { IWeatherData } from './App';
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
import { weeksToDays } from 'date-fns';
// import { format } from 'path';

// export interface WeatherComponentProps {
//   weatherData: IWeatherData[];
// }
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
  day,
  temperature,
  weather,
}: {
  day: string;
  temperature: number;
  weather: string;
}) => {
  let date = new Date(day);
  let formattedDate = date
    .toLocaleString('cs-CZ', { weekday: 'long' })
    .toUpperCase();

  const weatherElements = (
    <div className="one_day">
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
      <p className="temperature_day">{temperature}°C</p>
      <p className="weather_day">{weather}</p>
    </div>
  );
  return <section className="block">{weatherElements}</section>;
};

// export const WeatherCard: React.FC<WeatherComponentProps> = ({
//   weatherData,
// }) => {
//   const daysOfWeek = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ]

//   const weatherElements = weatherData.map((data, index) => (
//     <div key={index} className="one_day">
//       <p className="name_day">{daysOfWeek[data.date.getDay()]}</p>
//       <p className="date_day">{data.date.toLocaleDateString()}</p>
//       {data.weatherType === 'Cloudy' ? (
//         <CloudyIcon className="weather_icon" />
//       ) : data.weatherType === 'Sunny' ? (
//         <SunnyIcon className="weather_icon" />
//       ) : data.weatherType === 'Snow' ? (
//         <SnowIcon className="weather_icon" />
//       ) : data.weatherType === 'RainSnow' ? (
//         <RainSnowIcon className="weather_icon" />
//       ) : (
//         <PartlyCloudyDayIcon className="weather_icon" />
//       )}
//       <p className="temperature_day">{data.temperature}°C</p>
//       <p className="weather_day">{data.weatherType}</p>
//     </div>
//   ));

//   return <section className="block">{weatherElements}</section>;
// };
