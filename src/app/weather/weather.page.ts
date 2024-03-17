import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage {
  ville: string = '';
  pays: string = '';
  temp: string = '';
  pres: string = '';
  hum: string = '';
  wind: string = '';
  temp_min: string = '';
  temp_max: string = '';
  weatherData: any = null;
  backgroundImg: string = '';

  constructor(private httpclient: HttpClient) {}

  getWeatherData(){
    if (this.ville.trim() !== '') {
      this.weatherData = null; // Clear the previous data
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ville.trim() + "&appid=YOURTOKEN&units=metric";
      this.httpclient.get(url).subscribe(
        (response) => {
          this.weatherData = response;
          this.pays = this.weatherData.sys.country;
          this.temp = this.weatherData.main.temp;
          this.pres = this.weatherData.main.pressure;
          this.hum = this.weatherData.main.humidity;
          this.wind = this.weatherData.wind.speed;
          this.temp_min = this.weatherData.main.temp_min;
          this.temp_max = this.weatherData.main.temp_max;
          this.updateBackgroundImage(this.weatherData);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }


  doRefresh(event: any) {
    this.getWeatherData();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  updateBackgroundImage(weatherData: any) {
    const hour = new Date().getHours();
    const temp = weatherData.main.temp;

    if (hour >= 5 && hour < 17) {
      this.backgroundImg = temp < 15 ? 'morning_cold.jpg' : 'morning_warm.jpg';
    } else {
      this.backgroundImg = temp < 15 ? 'night_cold.jpeg' : 'night_warm.jpeg';
    }
  }

  getBackgroundStyle() {
    return `url('../../assets/backgrounds/${this.backgroundImg}') no-repeat center center / cover`;
  }


}
