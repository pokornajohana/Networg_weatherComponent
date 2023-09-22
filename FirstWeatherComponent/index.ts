import React = require('react');
import * as ReactDOM from 'react-dom';
import { IInputs, IOutputs } from './generated/ManifestTypes';
import { App } from './src/components/App';
import { IWeatherData } from './src/components/App';
import { WeatherType } from './src/components/App';

// export interface IWeatherData {
//   date: Date;
//   temperature: number;
//   weatherType: WeatherType;
// }
// export enum WeatherType {
//   CLOUDY = 'Cloudy',
//   SUNNY = 'Sunny',
//   SNOW = 'Snow',
//   RAINSNOW = 'RainSnow',
//   PARTLYCLOUDYDAY = 'PartlyCloudyDay',
// }
// export interface AppProps {
//   weatherData: IWeatherData[];
// }
// export interface WeatherComponentProps {
//   weatherData: IWeatherData[];
// }

export class WeatherComponent
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  /**
   * Empty constructor.
   */
  private _value: string | null;
  private _context: ComponentFramework.Context<IInputs>;
  private _container: HTMLDivElement;
  private _weatherData: IWeatherData[] = [];

  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set 

   * 
   * up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  private generateWeatherData(): IWeatherData[] {
    let startDate = new Date();
    let weatherData: IWeatherData[] = [];
    for (let i = 0; i < 5; i++) {
      let date = new Date();
      date.setDate(startDate.getDate() + i);
      let temperature = Math.floor(Math.random() * 51) - 25;
      let weatherType: WeatherType = WeatherType.SUNNY;
      if (temperature <= -5) weatherType = WeatherType.SNOW;
      else if (temperature >= -5 && temperature <= 5)
        weatherType = WeatherType.RAINSNOW;
      else if (temperature >= 5 && temperature <= 10)
        weatherType = WeatherType.CLOUDY;
      else if (temperature >= 10 && temperature <= 20)
        weatherType = WeatherType.PARTLYCLOUDYDAY;
      else if (temperature >= 20) weatherType = WeatherType.SUNNY;
      weatherData.push({
        date: date,
        temperature: temperature,
        weatherType: weatherType,
      });
    }
    return weatherData;
  }

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement,
  ): void {
    // Add control initialization code
    this._context = context;

    if (context.parameters.sampleProperty.raw === null) {
      this._value = '';
    } else {
      this._value = context.parameters.sampleProperty.raw;
    }
    this._container = document.createElement('div');
    this._container.innerText = this._value;

    const weatherData = this.generateWeatherData();
    console.log('Generated Weather DAta:', weatherData);
    this._weatherData = this.generateWeatherData();

    container.appendChild(this._container);

    this.getImage();

    ReactDOM.render(
      React.createElement(App, { weatherData: this._weatherData }),
      this._container,
    );
  }

  getImage() {
    this._context.resources.getResource(
      'src/components/img/sun.png',
      (data) => {
        console.log(data);
      },
      () => {
        console.log('ll');
      },
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and
   width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    // if (context.parameters.sampleProperty.raw === null) {
    //   this._value = '';
    // } else {
    //   this._value = context.parameters.sampleProperty.raw;
    // }
    // this._context = context;
    // this._container.innerText = this._value;
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
