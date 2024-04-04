import { Component,Input, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit {
  @Input() labels!: string[];
  @Input() data!: number[];


  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: any;

  constructor(private cdr: ChangeDetectorRef,) { }

  ngAfterViewInit(): void {
    this.renderChart(this.labels, this.data);
    this.cdr.detectChanges();
  }

  renderChart(labels: string[], data: number[]) {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 2,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Months'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    });
  }

}
