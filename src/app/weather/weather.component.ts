import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  forecastId!: string;
  chartLabels!: string[];
  chartData!: number[];
  featched: boolean = false;

  title!: string;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.forecastId = '';
    this.route.paramMap.subscribe(params => {
      this.forecastId = params.get('forecastId')!;
      if (this.forecastId === 'LWX') {
        this.title = 'District of Columbia Forecast ( LWX )';
      } else if (this.forecastId === "TOP") {
        this.title = 'Kansas Forecast ( TOP )';
      }
      if (this.forecastId) {
        this.fetchForecastData(this.forecastId);
      }else {
        window.alert('You Need To Select An Optein');
        this.router.navigate(['/home']);
      }
    });
    this.cdr.detectChanges();
  }

  fetchForecastData(id:string) {
    this.weatherService.getForecast(id).subscribe(data => {
      const temperatures = data.properties.periods.map((period: { temperature: any; }) => period.temperature);
      const labels = data.properties.periods.map((period: { name: any; }) => period.name);
      this.chartLabels= labels;
      this.chartData= temperatures;
      this.featched = true;
    });
  }

  goback() {
    this.location.back();
  }
}
