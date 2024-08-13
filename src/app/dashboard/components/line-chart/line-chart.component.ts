import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportingOffline from 'highcharts/modules/offline-exporting';
import HC_exportData from 'highcharts/modules/export-data';
import darkTheme from './dark-theme';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'] // Cambié 'styleUrl' a 'styleUrls'
})
export class LineChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};

  @Input() data = [];

  constructor() { }

  ngOnInit() {
    // Aplica el tema oscuro
    Highcharts.setOptions(darkTheme);

    // Verifica si se proporcionan datos, de lo contrario usa datos de ejemplo
    if (this.data.length === 0) {
      this.data = [
        {"mes": "Enero", "pacelas": 953, "metros": 8674},
        {"mes": "Febrero", "pacelas": 1068, "metros": 9908},
        {"mes": "Marzo", "pacelas": 1253, "metros": 8796},
        {"mes": "Abril", "pacelas": 1874, "metros": 8279},
        {"mes": "Mayo", "pacelas": 1353, "metros": 9876},
        {"mes": "Junio", "pacelas": 564, "metros": 2445},
        {"mes": "Julio", "pacelas": 4566, "metros": 8763},
        {"mes": "Agosto", "pacelas": 3564, "metros": 3566},
        {"mes": "Septiembre", "pacelas": 1353, "metros": 2435},
        {"mes": "Octubre", "pacelas": 355, "metros": 9876},
        {"mes": "Noviembre", "pacelas": 4355, "metros": 4523},
        {"mes": "Diciembre", "pacelas": 6435, "metros": 2355},
      ];
    }

    // Transforma los datos en un formato que Highcharts puede usar
    const meses = this.data.map(d => d.mes);
    const pacelas = this.data.map(d => d.pacelas);
    const metros = this.data.map(d => d.metros);
    // const tareas = metros.map(m => m / 628.86); // Conversión de metros cuadrados a tareas

    const tareas = metros.map(m => parseFloat((m / 628.86).toFixed(2))); // Conversión de metros cuadrados a tareas y redondeo a dos decimales



    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Evaluación de los últimos doce meses',
        align: 'left'
      },
      subtitle: {
        text: 'Análisis de Parcelas, Metros Cuadrados y Tareas',
        align: 'left'
      },
      xAxis: {
        categories: meses
      },
      yAxis: {
        title: {
          text: 'Cantidad'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'printChart',
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG',
              'downloadCSV',
              'downloadXLS',
              'viewData'
            ]
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Parcelas',
        data: pacelas
      }, {
        name: 'Metros Cuadrados',
        data: metros
      }, {
        name: 'Tareas',
        data: tareas
      }]
    };

    HC_exporting(Highcharts);
    HC_exportingOffline(Highcharts);
    HC_exportData(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
