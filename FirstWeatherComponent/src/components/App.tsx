import React = require('react');
import { WeatherCard } from './WeatherCard';
// import { AppProps } from '../..';
// import { IWeatherData } from '../..';

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
export const App: React.FC<AppProps> = ({ weatherData }) => {
  console.log(weatherData);

  return (
    <>
      <h2>Weather Forecast App</h2>
      <div>
        <WeatherCard weatherData={weatherData} />
      </div>
    </>
  );
};
