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
  const [data, setData] = useState([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    fetch(
      ` https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3811b08e86d8a57f3e32a31eb5fc27b6&units=metric`,
    )
      .then((resp) => resp.json())
      .then((data) => {
        setData(data.list);
      });
  }, [latitude, longitude]);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <h2>Weather Forecast App</h2>
      <section className="block">
        {data
          .filter(
            (item: { dt_txt: string }, index, self) =>
              self.findIndex(
                (t: { dt_txt: string }) =>
                  new Date(t.dt_txt).toLocaleDateString() ===
                  new Date(item.dt_txt).toLocaleDateString(),
              ) === index,
          )
          .map(
            (item: {
              main: { temp: number };
              dt_txt: string;
              weather: [{ main: string }];
              dt: number;
            }) => {
              return (
                <WeatherCard
                  key={item.dt}
                  day={item.dt_txt}
                  temperature={item.main.temp}
                  weather={item.weather[0].main}
                />
              );
            },
          )}
      </section>
    </>
  );
};
