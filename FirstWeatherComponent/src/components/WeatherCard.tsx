// import React from 'react';
// import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './index.css';
import { IWeatherData } from './App';
import {
  CloudyIcon,
  PartlyCloudyDayIcon,
  SunnyIcon,
  SnowIcon,
  RainSnowIcon,
} from '@fluentui/react-icons-mdl2';

export interface WeatherComponentProps {
  weatherData: IWeatherData[];
}
const Fetch = fetch(
  'https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=3811b08e86d8a57f3e32a31eb5fc27b6',
)
  .then((resp) => resp.json())
  .then((data) => console.log(data));
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3811b08e86d8a57f3e32a31eb5fc27b6
export const WeatherCard: React.FC<WeatherComponentProps> = ({
  weatherData,
}) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const weatherElements = weatherData.map((data, index) => (
    <div key={index} className="one_day">
      <p className="name_day">{daysOfWeek[data.date.getDay()]}</p>
      <p className="date_day">{data.date.toLocaleDateString()}</p>
      {data.weatherType === 'Cloudy' ? (
        <CloudyIcon className="weather_icon" />
      ) : data.weatherType === 'Sunny' ? (
        <SunnyIcon className="weather_icon" />
      ) : data.weatherType === 'Snow' ? (
        <SnowIcon className="weather_icon" />
      ) : data.weatherType === 'RainSnow' ? (
        <RainSnowIcon className="weather_icon" />
      ) : (
        <PartlyCloudyDayIcon className="weather_icon" />
      )}
      <p className="temperature_day">{data.temperature}°C</p>
      <p className="weather_day">{data.weatherType}</p>
    </div>
  ));

  return <section className="block">{weatherElements}</section>;
};

// export const WeatherComponent: React.FC<WeatherComponentProps> = ({
//   weatherData,
// }) => {
//   // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//   console.log(weatherData);

//   return weatherData.map((data) => (
//     <div>
//       <section className="block">
//         <div className="one_day">
//           <p className="name_day">{data.date.toLocaleDateString()}</p>
//           <p className="date_day">{data.date.toLocaleDateString()}</p>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="50"
//             height="50"
//             viewBox="0 0 24 24"
//             fill="rgba(0, 0, 0, 1)"
//           >
//             <path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM18 17H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2z"></path>
//           </svg>
//           <p className="temperature_day">{data.temperature}</p>
//           <p className="weather_day">{data.weatherType}</p>
//         </div>
//       </section>
//     </div>
//   ));
// };
