import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../data.service';

declare var google: any;



@Component({
  selector: 'dashboard-geo-chart',
  templateUrl: './geo-chart.component.html',
  styleUrl: './geo-chart.component.scss'
})
export class GeoChartComponent implements OnInit {
  constructor(private zone: NgZone, public dataService: DataService,) { }

  ngOnInit() {
    // Carga la biblioteca de visualización de Google y el paquete 'corechart'
    google.charts.load('current', { packages: ['geochart'] });
    // Establece un callback para dibujar el gráfico una vez cargado
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  createDataTable(entityType, attribute) {
    const result: any = [['Province', 'Population', { type: 'string', role: 'tooltip', p: { html: true } }]]; // Inicializa el arreglo de resultados con los encabezados

    if (entityType === 'province' && attribute === 'meters') {
      this.dataService.data.forEach(group => {
        group.provinces.forEach(province => {
          let totalSquareMeters = 0; // Variable para acumular los metros cuadrados
          let totalParcels = 0; // Variable para acumular los metros cuadrados
          if (!province.filtered) {
            province.municipalities.forEach(municipality => {
              totalSquareMeters += municipality.square_meters_per_municipality;
              totalParcels += municipality.quantity_of_parcels_per_municipality;
            });


            const formattedSquareMeters = totalSquareMeters.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            // Formatear totalParcels con separador de miles
            const formattedParcels = totalParcels.toLocaleString('en-US');

            // Añade el nombre de la provincia y el total de metros cuadrados a los resultados
            result.push([province.ISO_CODE, totalSquareMeters, `
            <strong class="asfdfdsfgds">${province.name}:</strong>
            <div class="sdfdfefasf">
            <div>Cant. parcelas:</div>
            <div>${formattedParcels}</div>
            <div>Metros Cuadrados:</div>
            <div>${formattedSquareMeters}</div>
        </div>`]);
          }

        });
      });
    }



    // Podrías añadir más condiciones aquí para manejar otros tipos de entidad y atributos


    console.log(result)

    return result;
  }





  @ViewChild('geoChart') pieChartElement: ElementRef;



  drawChart() {
    this.zone.runOutsideAngular(() => {
      // Define los datos del gráfico, en formato array

      //   const data = google.visualization.arrayToDataTable([
      //     ['Province', 'Population', { type: 'string', role: 'tooltip', p: { html: true } }],
      //     // ['DO-01', 1000000], // Santo Domingo
      //     // ['DO-25', 750000],  // Santiago
      //     // ['DO-11', 500000],  // La Altagracia
      //     // ['DO-06', 250000],  // La Vega
      //     // ['DO-08', 300000],  // Puerto Plata
      //     // ['DO-04', 550000],  // San Cristóbal
      //     // ['DO-16', 200000],  // Hato Mayor
      //     // ['DO-31', 450000],  // Valverde
      //     // ['DO-10', 600000],  // Espaillat
      //     // ['DO-14', 350000],  // María Trinidad Sánchez
      //     // ['DO-02', 210000],  // Azua
      //     // ['DO-03', 180000],  // Baoruco
      //     // ['DO-05', 230000],  // Barahona
      //     // ['DO-07', 290000],  // Hermanas Mirabal
      //     // ['DO-09', 475000],  // Monte Plata
      //     // ['DO-12', 270000],  // Independencia
      //     // ['DO-13', 400000],  // Duarte
      //     // ['DO-15', 410000],  // Montecristi
      //     // ['DO-17', 120000],  // Elías Piña
      //     // ['DO-18', 300000],  // San Juan
      //     // ['DO-19', 250000],  // Pedernales
      //     // ['DO-20', 305000],  // Peravia
      //     // ['DO-21', 330000],  // San José de Ocoa
      //     // ['DO-22', 190000],  // Santiago Rodríguez
      //     // ['DO-23', 150000],  // Sánchez Ramírez
      //     // ['DO-24', 500000],  // San Pedro de Macorís
      //     // ['DO-26', 240000],  // La Romana
      //     // ['DO-27', 560000],  // Seibo
      //     // ['DO-28', 310000],  // Samaná
      //     // ['DO-29', 360000],  // Monte Cristi
      //     // ['DO-30', 205000],  // Monseñor Nouel
      //     ['DO-25', 480000, `
      //     <strong class="asfdfdsfgds">Santo Domingo:</strong>
      //     <div class="sdfdfefasf">
      //     <div>Cant. parcelas:</div>
      //     <div>234,243.23</div>
      //     <div>Metros Cuadrados:</div>
      //     <div>23,234,243.23</div>
      // </div>`]   // Dajabón
      //   ]);

      const data = google.visualization.arrayToDataTable(this.createDataTable('province', 'meters'));


      // Configura opciones del gráfico, como título y colores
      const options = {
        region: 'DO', // Código ISO de República Dominicana
        displayMode: 'regions',
        resolution: 'provinces',
        backgroundColor: 'transparent',
        // defaultColor: '202328',
        // datalessRegionColor: '#1d1d1d',
        datalessRegionColor: '#363636',
        defaultColor: '#f8bbd0',  // Color por defecto para cualquier región que no tenga datos asignados.

        // datalessRegionColor: '#e0e0e0',  // Color para los países sin datos específicos.

        // datalessRegionColor: '#f8bbd0',
        // defaultColor: '#f5f5f5',
        enableRegionInteractivity: true,
        keepAspectRatio: true,
        // tooltip: { trigger: 'focus' },
        tooltip: { isHtml: true, trigger: 'focus' },  // Asegúrate de que 'isHtml' está configurado correctamente
        // colorAxis: { colors: ['#cfe3fc', '#4374e0'] },

        
        legend: {
          textStyle: {
            backgroundColor: 'transparent',
            color: 'white', // Cambia el color de la fuente aquí
            fontSize: 12 // Ajusta el tamaño de la fuente aquí
          },
          backgroundColor: 'transparent',
          numberFormat: 'decimal',
          color: 'transparent'

        }
        // colorAxis: { colors: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#dd4477'] }, // Gradiente de azul


      }

      // Crea el gráfico de pastel, vinculándolo al div con id 'pieChart'
      const chart = new google.visualization.GeoChart(this.pieChartElement.nativeElement);
      chart.draw(data, options);


      //   const chart = new google.visualization.GeoChart(document.getElementById('geoChart'));
      // chart.draw(data, options);

    });
  }







}
