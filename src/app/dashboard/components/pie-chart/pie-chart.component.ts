import { Component, OnInit, NgZone, ViewChild, ElementRef, Input } from '@angular/core';
import { DataService } from '../../../data.service';
// import { DataService } from '../data.service';
declare var google: any;



@Component({
  selector: 'dashboard-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {

  constructor(private zone: NgZone, public dataService: DataService,) { }

  @Input() chartType;
  @Input() title;


  ngOnInit() {
    setTimeout(() => {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart.bind(this));
    }, 1000); // Espera 1 segundo antes de cargar y dibujar el gráfico
  }



  createDataTable() {
    const result: any = [['Name', 'Total']]; // Inicializa el arreglo de resultados con los encabezados



    if (this.chartType === 'meters') {
      this.dataService.data.forEach(group => {
        group.provinces.forEach(province => {
          let totalSquareMeters = 0; // Variable para acumular los metros cuadrados

          if (!province.filtered) {
            province.municipalities.forEach(municipality => {
              totalSquareMeters += municipality.square_meters_per_municipality;
            });
            // Añade el nombre de la provincia y el total de metros cuadrados a los resultados
            result.push([province.name, totalSquareMeters]);
          }

        });
      });
    }

    if (this.chartType === 'quantity') {
      // this.dataService.data.forEach(group => {
      //   group.provinces.forEach(prov => {
      //     if (!prov.filtered) {
      //       prov.municipalities.forEach(mun => {
      //         result.push([mun.name, mun.quantity_of_parcels_per_municipality]);
      //       });
      //     }
      //   });
      // });

      this.dataService.data.forEach(group => {
        if (!group.filtered) {
          group.provinces.forEach(province => {
            if (!province.filtered) {
              let total = 0;
              province.municipalities.forEach(municipality => {
                if (!municipality.filtered) {
                  total += municipality.quantity_of_parcels_per_municipality;
                }

                
                
              });
              console.log(province.name, total)
              
              result.push([province.name, total]);
            }
          });
        }
      });
    }



    console.log(result)

    return result;
  }


  @ViewChild('pieChart') pieChartElement: ElementRef;

  drawChart() {
    this.zone.runOutsideAngular(() => {
      // Define los datos del gráfico, en formato array
      const data = google.visualization.arrayToDataTable(this.createDataTable());

      // Configura opciones del gráfico, como título y colores
      const options = {
        // title: 'My Daily Activities',
        // colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']

        title: this.title,
        pieSliceBorderColor: 'transparent',
        // is3D: true,


        titleTextStyle: {
          color: 'white', // El color que quieres para el título
          fontSize: 20, // Puedes ajustar el tamaño de la fuente
          fontWeight: 400,
          // Puedes añadir más propiedades de estilo aquí
        },

        legend: {
          textStyle: {
            color: 'white', // El color que quieres para el texto de la leyenda
            fontSize: 14 // Puedes ajustar el tamaño de la fuente
            // Puedes añadir más propiedades de estilo aquí
          }
        },

        // colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        backgroundColor: 'transparent',  // Establece el color de fondo del gráfico
        // backgroundColor: '#181a1b',  // Establece el color de fondo del gráfico
        chartArea: {
          backgroundColor: 'white', // Establece el color de fondo del área de dibujo
          left: 50,
          top: 50,
          width: '100%',
          height: '100%'
        }
      };

      // Crea el gráfico de pastel, vinculándolo al div con id 'pieChart'
      const chart = new google.visualization.PieChart(this.pieChartElement.nativeElement);
      chart.draw(data, options);
    });
  }






  // Uso de la función para crear un arreglo de provincias y metros cuadrados totales
  // const dataTable = createDataTable('province', 'meters');

  // // Enviar dataTable a Google Visualization para crear un gráfico, por ejemplo:
  // google.visualization.arrayToDataTable(dataTable);








}
