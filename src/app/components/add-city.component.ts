import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { City } from '../models/City';
import { CitiesRepository } from '../services/cities.repo';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css'],
})
export class AddCityComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  country!: string;
  city!: string;
  imageUrl!: string;
  cityObj!: City;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private citiesRepo: CitiesRepository
  ) {}

  add() {
    this.country = this.form?.value['countryName'];
    this.city = this.form?.value['city'];
    this.imageUrl = this.form?.value['imageUrl'];

    this.cityObj = {
      country: this.country,
      city: this.city,
      imageUrl: this.imageUrl,
    };
    this.citiesRepo.addCity(this.cityObj);
    this.router.navigate(['/']);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      countryName: this.formBuilder.control(''),
      city: this.formBuilder.control(''),
      imageUrl: this.formBuilder.control(''),
    });
  }
  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnDestroy(): void {}
}
