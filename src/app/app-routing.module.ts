import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCitiesComponent } from './components/list-cities.component';
import { AddCityComponent } from './components/add-city.component';
import { WeatherDetailsComponent } from './components/weather-details.component';

const routes: Routes = [
  { path: '', component: ListCitiesComponent },
  { path: 'add-city', component: AddCityComponent },
  { path: 'weather/:city', component: WeatherDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
