import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'dashboard-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {
  @ViewChild('pieChart') pieChartElement: ElementRef;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  databymonths = [
    {"mes": "Enero", "pacelas": 953, "metros": 8674},
    {"mes": "Febrero", "pacelas": 1068, "metros": 9908},
    {"mes": "Marzo", "pacelas": 1253, "metros": 8796},
    {"mes": "Abril", "pacelas": 1874, "metros": 8279},
    {"mes": "Mayo", "pacelas": 1353, "metros": 9876}
  ];


  drawChart() {
    this.zone.runOutsideAngular(() => {
      const chartData = [
        ['Mes', 'Parcelas', 'Metros Cuadrados', 'Tareas'],
        ...this.databymonths.map(item => [item.mes, item.pacelas, item.metros, (item.metros / 628.86)])
      ];

      const data = google.visualization.arrayToDataTable(chartData);

      const options = {
        chart: {
          title: 'Evaluación de los últimos cinco meses',
          subtitle: 'Análisis de Parcelas, Metros Cuadrados y Tareas',
        },
        subtitleTextStyle: {
          color: 'white',
          fontSize: 16
        },
        // width: 900,
        // height: 500,
        backgroundColor: 'transparent',
        titleTextStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 400,
        },
        hAxis: {
          textStyle: { color: '#ffffff' }
        },
        vAxis: {
          textStyle: { color: '#ffffff' },
          gridlines: { color: '#4f4f4f' },
          minorGridlines: { color: '#4f4f4f' }
        },
        legend: {
          textStyle: {
            color: 'white',
            fontSize: 14
          }
        },
        animation: {
          duration: 1000,
          easing: 'out',
          startup: true
        },
        chartArea: {
          backgroundColor: 'transparent'
        }
      };

      const chart = new google.charts.Line(this.pieChartElement.nativeElement);
      chart.draw(data, google.charts.Line.convertOptions(options));
    });
  }





}
