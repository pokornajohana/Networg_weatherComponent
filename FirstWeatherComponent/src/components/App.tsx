import React = require('react');
import { useState, useEffect } from 'react';
import { WeatherCard } from './WeatherCard';

export interface IWeatherData {
  date: Date;
  temperature: number;
  weatherType: WeatherType;
}

interface AppProps {
  weatherData: IWeatherData[];
}
export interface IWeatherData {
  date: Date;
  temperature: number;
  weatherType: WeatherType;
}
export enum WeatherType {
  CLOUDY = 'Cloudy',
  SUNNY = 'Sunny',
  SNOW = 'Snow',
  RAINSNOW = 'RainSnow',
  PARTLYCLOUDYDAY = 'PartlyCloudyDay',
}
export const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [data, setData] = useState(null);
  const [day, setDay] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, [latitude, longitude]);

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
        setWeather(data.list[0].weather[0].main);
        console.log(data.list[0].weather[0].main);
        console.log(latitude);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Weather Forecast App</h2>
      <div>
        <WeatherCard day={day} temperature={temperature} weather={weather} />
      </div>
    </>
  );
};

// export const App: React.FC<AppProps> = ({ weatherData }) => {
//   console.log(weatherData);

//   return (
//     <>
//       <h2>Weather Forecast App</h2>
//       <div>
//         <WeatherCard weatherData={weatherData} />
//       </div>
//     </>
//   );
// };
