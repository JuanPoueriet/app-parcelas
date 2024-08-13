import { Component, OnInit, NgZone, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../../../data.service';
import * as Highcharts from 'highcharts';
import { ComunicationService } from '../comunication.service';
import { FilterSummaryComponent } from '../filter-summary/filter-summary.component';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  data: any;
  chart: Highcharts.Chart;

  @Input() chartType: string;
  @Input() showTareas: boolean;
  @Input() text: string;
  @Input() title: string;
  @Input() subtitle: string;
  @ViewChild('pieChart', { static: true }) pieChartElement: ElementRef;

  constructor(private zone: NgZone, public dataService: DataService, private comunicationService: ComunicationService
    , public filter: FilterSummaryComponent
  ) { }



  // constructor(private dataService: DataService) {}

  // ngOnInit() {

  // }

  runFunctionOnData(data: any) {
    // Función ejecutada con los nuevos datos
    console.log('Function executed with data:', data);
  }

  ngOnInit() {


    this.comunicationService.data.subscribe(receivedData => {
      if (receivedData === null) {
        this.updateDataAndRedrawChart();

      } else {
        this.filterElement(receivedData);
      }
    });

    setTimeout(() => {
      this.createDataTable();
      this.drawChart();
    }, 1000); // Espera 1 segundo antes de cargar y dibujar el gráfico
  }

  truncateText(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }







  @Input() receivedData: string;



  updateDataAndRedrawChart(): void {
    this.zone.run(() => {
      this.data = this.createDataTable();
      this.chart.series[0].setData(this.data, true);  // true to redraw the chart
    });
  }


  createDataTable() {
    const result: any = [];
    let totalValue = 0;

    if (this.chartType === 'meters') {
      this.dataService.data.forEach(group => {
        group.provinces.forEach(province => {
          let totalSquareMeters = 0;
          province.municipalities.forEach(municipality => {
            if (!municipality.filtered) {
              totalSquareMeters += municipality.square_meters_per_municipality;
            }
          });
          totalSquareMeters = parseFloat(totalSquareMeters.toFixed(2));
          result.push({
            name: province.name,
            y: totalSquareMeters,
            id: province.id,
            type: province.type,
            municipalities: province.municipalities,
            filtered: province.filtered  // Assume this exists in data
          });
        });
      });
    }

    if (this.chartType === 'quantity') {
      this.dataService.data.forEach(group => {
        group.provinces.forEach(province => {
          let totalSquareMeters = 0;
          province.municipalities.forEach(municipality => {
            if (!municipality.filtered) {
              totalSquareMeters += municipality.quantity_of_parcels_per_municipality;
            }
          });
          totalSquareMeters = parseFloat(totalSquareMeters.toFixed(2));
          result.push({
            name: province.name,
            y: totalSquareMeters,
            id: province.id,
            type: province.type,
            municipalities: province.municipalities,
            filtered: province.filtered  // Assume this exists in data
          });
        });
      });
    }


    else if (this.chartType === 'parcelCount') {
      this.dataService.dataOwner.forEach(data => {
        result.push({ name: data.name, y: data.parcelCount, id: data.id });
        totalValue += data.parcelCount;
      });
    } else if (this.chartType === 'squareMeters') {
      this.dataService.dataOwner.forEach(data => {
        result.push({ name: data.name, y: data.squareMeters });
        totalValue += data.squareMeters;
      });
    }

    // Agrupar datos menores al 1% en "Otros"
    const threshold = totalValue * 0.01;
    let othersTotal = 0;
    const filteredData = result.filter(item => {
      if (item.y < threshold) {
        othersTotal += item.y;
        return false;
      }
      return true;
    });

    if (othersTotal > 0) {
      filteredData.push({ name: 'Otros', y: othersTotal });
    }

    console.log(filteredData);
    return filteredData;
  }

  updateVisibility(): void {
    this.zone.runOutsideAngular(() => {
      this.chart.series[0].data.forEach(point => {
        point.setVisible(!(point.options as any).filtered, false);
      });
      this.chart.redraw();
    });
  }



  drawChart() {
    this.zone.runOutsideAngular(() => {
      this.data = this.createDataTable();
      const component = this;  // Guarda referencia al componente

      const options: Highcharts.Options = {
        chart: {
          type: 'pie',
          backgroundColor: '#2a2a2b',
          renderTo: component.pieChartElement.nativeElement,
          // height: 300  // Ajustar la altura según necesidad

        },
        title: {
          text: component.title,
          align: 'left',
          style: {
            color: 'white',
            fontSize: '20px',
            fontWeight: '400',
          }
        },
        subtitle: {
          text: component.subtitle,
          align: 'left',
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            const formattedSquareMeters = Highcharts.numberFormat(this.y, 2, '.', ',');
            const formattedTareas = Highcharts.numberFormat((this.y / 628.86), 2, '.', ',');

            let tareasText = '';

            
            if (component.showTareas) {
              tareasText = `<div>Tareas: ${formattedTareas}</div>`;
            }

            return `
              <div class="kljlfajds">  
              <div class="sadflkaj" style="background-color:${this.color}"></div>
    <div class="asdfdsfgfgd">
        <div>${this.point.name}: ${this.percentage.toFixed(2)}%</div>
        <div>${component.text}: ${formattedSquareMeters}</div>
        ${tareasText}
    </div>
</div>
            `;

          }
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              distance: -30,
              format: '{point.percentage:.1f}%',
              color: '#FFFFFF',
              borderColor: '#FFFFFF',
              style: {
                fontSize: '14px'
              }
            },
            showInLegend: true
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          // align: 'right',
          // verticalAlign: 'top',  // Cambiar a 'top' puede ayudar
          y: 30,  // Ajustar según sea necesario
          maxHeight: 277,

          itemStyle: {
            color: 'white',
            fontWeight: 'bold'
          },
          labelFormatter: function () {
            return this.name.length > 15 ? this.name.substring(0, 15) + '...' : this.name;
          },
          events: {
            itemClick: (event) => { // Usando una función de flecha

              // this.filter.toggleFiltered((event as any).legendItem.id, 'province');

              event.preventDefault(); // Desactivar el comportamiento por defecto de Highcharts
              this.filter.toggleFiltered((event as any).legendItem.id, 'province');
              this.runFunctionOnData((event as any).legendItem);

            },
          },
        },
        series: [{
          type: 'pie',
          name: 'Total',
          data: component.data  // Usa la referencia al componente
        }]
      };

      this.chart = Highcharts.chart(component.pieChartElement.nativeElement, options);
    });

    this.updateVisibility();  // Adjust visibility based on filtered property

  }

  filterElement(data: any): void {
    this.zone.runOutsideAngular(() => {

      console.log(data.id)
      for (let i = 0; i < this.chart.series[0].data.length; i++) {
        if (((this.chart.series[0].data[i] as any).id) === data.id) {
          this.chart.series[0].data[i].setVisible(data.value);

        }

      }
    });
  }






}
