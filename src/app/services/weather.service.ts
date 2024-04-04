import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }


  getForecast(gridId: string): Observable<any> {
    const url = `https://api.weather.gov/gridpoints/${gridId}/31,80/forecast`;
    return this.http.get<any>(url);
  }

}
