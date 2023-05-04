import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CitiesRepository } from '../services/cities.repo';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.css'],
})
export class ListCitiesComponent implements OnInit {
  cities: any;

  constructor(private citiesRepo: CitiesRepository) {}

  ngOnInit(): void {
    // this.weatherSvc.sortCities();
    this.cities = this.citiesRepo.getAllCities();
  }
}
