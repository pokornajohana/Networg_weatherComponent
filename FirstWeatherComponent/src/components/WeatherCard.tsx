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
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const [data, setData] = useState(null);
  const [day, setDay] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    fetch(
      ` https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3811b08e86d8a57f3e32a31eb5fc27b6&units=metric`,
      // `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=3811b08e86d8a57f3e32a31eb5fc27b6&units=metric`,
    )
      .then((resp) => resp.json())
      .then((data) => {
        setData(data.list);
        console.log(data.list[0].main.temp);
        setTemperature(data.list[0].main.temp);
        console.log(data.list[0].dt_txt);
        setDay(data.list[0].dt_txt);
        // debugger;
        setWeather(data.list[0].weather[0].main);
        console.log(data.list[0].weather[0].main);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  let date = new Date(day);

  const weatherElements = (
    <div className="one_day">
      <p className="name_day">
        {date.toLocaleString('cs-CZ', { weekday: 'long' })}
      </p>
      <p className="date_day">{date.toLocaleDateString('cs-CZ')}</p>

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
