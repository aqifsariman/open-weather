import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { City } from '../models/City';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  countries = [
    {
      country: 'United Kingdom',
      city: 'London',
    },
    {
      country: 'Malaysia',
      city: 'Kuala Lumpur',
    },
    {
      country: 'Indonesia',
      city: 'Jakarta',
    },
    {
      country: 'China',
      city: 'Beijing',
    },
    {
      country: 'India',
      city: 'New Delhi',
    },
    {
      country: 'Thailand',
      city: 'Bangkok',
    },
  ];

  imageUrlCities = [
    {
      city: 'London',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    },
    {
      city: 'Kuala Lumpur',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    },
    {
      city: 'Jakarta',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    },
    {
      city: 'Beijing',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    },
    {
      city: 'New Delhi',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    },
    {
      city: 'Bangkok',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    },
  ];

  constructor(private httpClient: HttpClient) {}
  getWeather(city: string, apiKey: string): Promise<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', apiKey);
    return lastValueFrom(
      this.httpClient.get(environment.openWeatherApiUrl, {
        params,
      })
    );
  }

  getCityUrl(city: string) {
    const w = this.imageUrlCities.find((v) => v.city == city);
    console.log('Image Url: ', w);
    return w;
  }

  addCity(city: City) {
    this.countries.push({ city: city.city, country: city.country });
    //TODO  Bug on the sorting for city name
    this.countries.sort((a, b) => (b.country > a.country ? 1 : -1));
    this.imageUrlCities.push({ city: city.city, imageUrl: city.imageUrl });
  }
  sortCities() {
    this.countries.sort((a, b) => (b.city > a.city ? -1 : 1));
  }
}
