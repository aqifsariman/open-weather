import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.css'],
})
export class ListCitiesComponent implements OnInit {
  cities: any;

  constructor(private weatherSvc: WeatherService) {}

  ngOnInit(): void {
    this.weatherSvc.sortCities();
    this.cities = this.weatherSvc.countries;
  }
}
