import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Weather } from '../models/Weather';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
  openWeatherApiKey: string = environment.oepnWeatherApiKey;
  private city: string = 'London';
  // private country?: string;
  // private imageUrl?: string;

  params$!: Subscription;
  model = new Weather(this.city, 0, 0, 0, '', '', 0, 0);

  constructor(
    private weatherSvc: WeatherService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.params$ = this.activatedRoute.params.subscribe((params) => {
      this.city = params['city'];
    });
    this.getWeatherDetailsFromAPI(this.city);
  }
  ngOnDestroy(): void {
    this.params$.unsubscribe();
  }

  private getWeatherDetailsFromAPI(city: string) {
    this.weatherSvc
      .getWeather(city, this.openWeatherApiKey)
      .then((result) => {
        console.log('Results: ', result);
        const cityObj = this.weatherSvc.getCityUrl(city);
        this.model = new Weather(
          city,
          result.main.temp,
          result.main.pressure,
          result.main.humidity,
          result.weather[0].description,
          cityObj!.imageUrl,
          result.wind.speed,
          result.wind.degree
        );
      })
      .catch((err) => {
        console.error(err);
        this.router.navigate(['']);
      });
  }
}
