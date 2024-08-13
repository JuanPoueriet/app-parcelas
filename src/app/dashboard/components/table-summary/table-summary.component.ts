import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import * as XLSX from 'xlsx';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



import { share } from 'rxjs/operators';
import { Observer, Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { DataService } from '../../../data.service';
import { FilterSummaryComponent } from '../filter-summary/filter-summary.component';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { PrintService } from '../../../print.service';



/**
 * Updates the filtering state based on the hierarchy level.
 * @param event - The DOM event triggered.
 * @param levelType - The hierarchy level (group, province, or municipality).
 * @param groupIndex - Index of the group in the 'groups' array.
 * @param provinceIndex - Index of the province in the 'provinces' array.
 * @param municipalityIndex - Index of the municipality in the 'municipalities' array.
 */



interface Municipality {
  name: string;
  id: string;
  filtered: boolean;
  quantity_of_parcels_per_municipality: number;
  square_meters_per_municipality: number;
  type: string;
  disabled: boolean;
}

export interface Task {
  id?: string;
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

interface Province {
  name: string;
  id: string;
  filtered: boolean;
  municipalities: Municipality[];
  type: string;
  disabled: boolean;
}

interface Group {
  name: string;
  id: string;
  filtered: boolean;
  provinces: Province[];
  type: string;
  disabled: boolean,
}

interface Parcel {
  filtered: boolean;
  quantity_of_parcels_per_municipality: number;
  square_meters_per_municipality: number;
  type: string;
}

type SumType = 'municipal' | 'metros' | 'muca';

@Component({
  selector: 'dashboard-table-summary',
  templateUrl: './table-summary.component.html',
  styleUrl: './table-summary.component.scss',
  animations: [
    trigger('reduceHeight', [
      state('initial', style({
        height: '*' // Esto captura la altura dinámica inicial
      })),
      state('collapsed', style({
        height: '0'
      })),
      transition('initial => collapsed', animate('{{duration}}'))
    ]),

    trigger('changeColor', [
      state('initial-2', style({
        'background-color': 'transparent'
      })),
      state('hovered', style({
        'background-color': 'rgba(255, 255, 255, 0.05)' // Reemplaza esto con el color que desees al hacer hover
      })),
      transition('initial-2 <=> hovered', [
        style({ 'background-color': 'transparent' }), // Estado inicial
        animate('0.2s') // Duración de la animación
      ])
    ]),

    trigger('uniformAnimation', [
      state('0', style({ height: '0px' })),
      transition('* => *', [
        animate('{{ time }}s', style({ height: '30px' }))
      ])
    ]),
    trigger('animacionAltura', [
      state('void', style({ height: '0px' })),
      state('*', style({ height: '*' })),
      // transition('void <=> *', animate('{{ duration }}ms'))
      transition('void <=> *', animate('{{ duration }}ms cubic-bezier(0, 0, 1, 1)'))

    ]),
    trigger('stretch-Animation', [
      state('void', style({ width: '0px', opacity: 0 })),
      state('*', style({ width: '*', opacity: 1 })),
      transition('void <=> *', animate('{{ duration }}ms cubic-bezier(0, 0, 1, 1)'))
    ]),
    trigger('stretch-Animation2', [
      state('void', style({ width: '0px', opacity: 0, height: '0px' })),
      state('*', style({ width: '*', opacity: 1, height: '*' })),
      transition('void <=> *', animate('{{ duration }}ms cubic-bezier(0, 0, 1, 1)'))
    ]),

    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0 }))
      ]),
    ]),
  ]
})
export class TableSummaryComponent {




  exportarEstructuraAExcel(): void {
    const worksheetData = this.prepararDatosParaHojaDeCalculo();

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Aplicar estilos de alineación central y color de fondo a todas las celdas pertinentes
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) continue; // Si la celda no existe, ignora

        // Asegúrate de inicializar el objeto de estilo si no existe
        ws[cell_ref].s = ws[cell_ref].s || {};
        
        ws[cell_ref].s.alignment = {
          horizontal: "center",
          vertical: "center",
          wrapText: true
        };

        ws[cell_ref].s.fill = {
          patternType: "solid",
          fgColor: { rgb: "FFFF00" } // Color amarillo
        };

        ws[cell_ref].s.font = {
          name: 'Calibri',
          sz: 12,
          bold: false,
          color: { rgb: "000000" } // Color de fuente negro
        };

        ws[cell_ref].s.border = {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        };
      }
    }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    
    XLSX.writeFile(wb, 'Datos.xlsx');
  }

  prepararDatosParaHojaDeCalculo(): any[][] {
    const data = this.dataService.data;
    const output: any[][] = [];

    output.push(['Provincia', 'Municipio', 'Cant. parcelas por Municipios', 'M² por Municipios']);

    data.forEach(group => {
      if (group.filtered) return;
      group.provinces.forEach(province => {
        if (province.filtered) return;
        let addedProvinceName = false;
        province.municipalities.forEach(municipality => {
          if (municipality.filtered) return;
          const row: any[] = [];
          if (!addedProvinceName) {
            row.push(province.name);
            addedProvinceName = true;
          } else {
            row.push(null);
          }
          row.push(municipality.name);
          row.push(municipality.quantity_of_parcels_per_municipality);
          row.push(municipality.square_meters_per_municipality);
          output.push(row);
        });
      });
    });

    return output;
  }







  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public number: number = 1000;
  public observable: any;
  private observer: any;

  @Input() tiempoAnimacion = '10s'; // Este es el valor por defecto

  divHeight: any = '0'; // Altura inicial del div
  animationDuration = 250;


  animationState: string = 'initial'; // Estado inicial de la animación

  onAnimationEnd() {
    this.animationState = 'final'; // Cuando la animación termina, cambia el estado a 'final'
  }



  @Output() dataForwarded = new EventEmitter<any>();

  forwardData(data:any) {
    console.log('hola desde table sumarry');
    this.dataForwarded.emit(data);
  }


  constructor(private el: ElementRef, private renderer: Renderer2, private zone: NgZone, private _formBuilder: FormBuilder, private eRef: ElementRef,
    public dataService: DataService, public filter: FilterSummaryComponent, private print: PrintService) {


    this.observable = new Observable<boolean>((observer: any) => this.observer = observer).pipe(share());

    // For auto mode
    setTimeout(() => this.number += this.number, 5000); // Update on 5 seconds

    // this.checkboxGroup.valueChanges.subscribe(value => {
    //   // console.log('Los valores de los checkboxes han cambiado a: ', value);
    //   this.onCheckboxChange(value);
    // });
  }






  setting: boolean = false;


  openSettings() {
    this.setting = !this.setting;
  }


  

  toggleColumn0() {
    this.column_0 = !this.column_0;
  }

  paginator = false;
  // hoveract = true;

  column_0: boolean = true;
  column_1: boolean = true;
  column_2: boolean = true;
  column_3: boolean = true;
  column_4: boolean = true;
  column_5: boolean = true;
  column_6: boolean = true;
  column_7: boolean = true;
  column_8: boolean = true;


  toggleClase(a: any, b: any, c: any, event: Event) {
    const element = (event.target as HTMLElement).parentElement;
    // const element2 = (event.target as HTMLElement).parentElement;
    // console.log(a, b, c);
    // console.log(element!.parentElement);
    // console.log(element!.parentElement!.parentElement!.parentElement!.children.length);

    if (element!.parentElement!.children.length > 1) {
      if (element) {
        this.renderer.addClass(element, 'mi-clase');

        // Escuchar el final de la animación
        const onAnimationEnd = () => {
          // console.log('Animación finalizada');
          if (element.parentNode) {
            this.dataService.data[a].provinces[b].municipalities[c].filtered = true;
            // this.renderer.removeChild(element.parentNode, element);
          }
          element.removeEventListener('animationend', onAnimationEnd);
        };

        element.addEventListener('animationend', onAnimationEnd);
      }
    } else {

      if (element!.parentElement!.parentElement!.parentElement!.children.length > 1) {

        this.renderer.addClass(element!.parentElement!.parentElement, 'mi-clase');

        const onAnimationEnd = () => {
          // console.log('Animación finalizada');
          if (element!.parentElement!.parentElement!.parentNode) {
            this.dataService.data[a].provinces[b].filtered = true;
            // this.renderer.removeChild(element.parentNode, element);
          }
          element!.parentElement!.parentElement!.removeEventListener('animationend', onAnimationEnd);
        };
        element!.parentElement!.parentElement!.addEventListener('animationend', onAnimationEnd);

      }
      else {
        this.renderer.addClass(element!.parentElement!.parentElement!.parentElement!.parentElement, 'mi-clase');

        const onAnimationEnd = () => {
          // console.log('Animación finalizada');
          if (element!.parentElement!.parentElement!.parentElement!.parentElement!.parentNode) {
            this.dataService.data[a].filtered = true;
            // this.renderer.removeChild(element.parentNode, element);
          }
          element!.parentElement!.parentElement!.parentElement!.parentElement!.removeEventListener('animationend', onAnimationEnd);
        };
        element!.parentElement!.parentElement!.parentElement!.parentElement!.addEventListener('animationend', onAnimationEnd);

      }
    }
  }

  indiceAnimado: string | null = null;

  state = 'initial';

  bufs() {
    this.dataService.data[0].provinces[0].municipalities[0].filtered = !this.dataService.data[0].provinces[0].municipalities[0].filtered;
  }

  collapseDiv(indice: string) {

    this.indiceAnimado = this.indiceAnimado === indice ? null : indice;
  }



  cambiarAltura(event: Event, type: string, a: number, b?: number, c?: number) {
    event?.stopPropagation();

    const target = event.target as HTMLElement;
    const children = target.parentElement!.parentElement;

    if (type === 'municipio') {
      if (children!.children!.length >= 1 && children!.parentElement!.parentElement!.children!.length >= 1) {
        this.dataService.data[a].provinces[b!].municipalities[c!].filtered = true;
      }
      if (children!.children!.length <= 1 && children!.parentElement!.parentElement!.children!.length >= 1) {
        this.dataService.data[a].provinces[b!].filtered = true;
      }
      if (children!.children!.length <= 1 && children!.parentElement!.parentElement!.children!.length <= 1) {
        this.dataService.data[a].filtered = true;
      }
    }

    if (type === 'provicia') {

      if (children!.parentElement!.children[1].children.length > 1) {
        this.dataService.data[a].provinces[b!].filtered = true;
      }
      if (children!.parentElement!.children[1].children.length <= 1) {
        this.dataService.data[a].filtered = true;
      }

    }
    if (type === 'grupo') {
      this.dataService.data[a].filtered = true;
    }

  }







  rotate = false;

  @ViewChild('icon') icon: any;

  onClick() {
    this.rotate = true;
    this.icon.nativeElement.addEventListener('animationend', () => {
      this.rotate = false;
    }, { once: true });
  }

  // checkboxGroup = new FormGroup({
  //   grupo1: new FormControl(true),
  //   provinces: new FormControl(true),
  //   municipalities: new FormControl(true),
  //   cantM: new FormControl(true),
  //   cantMpm: new FormControl(true),
  //   // grupo2: new FormControl(),
  //   // grupo3: new FormControl(),
  // });

  // onCheckboxChange(value: any) {
  //   // Aquí puedes poner el código que quieras ejecutar cuando los valores de los checkboxes cambien
  //   this.column_0 = value.grupo1;
  //   this.column_1 = value.provinces;
  //   this.column_2 = value.municipalities;
  //   this.column_3 = value.cantM;
  //   this.column_4 = value.cantMpm;
  //   this.column_5 = value.grupo1;
  //   // this.municipalities = value.grupo1;
  //   // this.column_6 = value.grupo1;
  //   // this.column_7 = value.grupo1;
  //   // this.column_8 = value.grupo1;



  //   // console.log('La función onCheckboxChange se ha ejecutado con los valores: ', value.grupo1);
  // }

  hovered = '';








  hoveredIndex: string | null = null;

  onHover(event: Event, elemento: string, indice: string, isHovered: boolean) {
    event.stopPropagation();
  }



  getTotal(parcels: any, value: string): number {
    return parcels.reduce((sum: any, parcel: { [x: string]: any; filtered: any; }) => {
      if (!parcel.filtered) {


        if (value === 'cant') {
          return sum + 1;
        }

        return sum + parcel[value];
      }
      return sum;
    }, 0);
  }

  duration = 450;
  calculateMunicipalityMetrics(type: string): number {
    let total: number = 0;

    switch (type) {
      case 'municipalityCount':
        this.dataService.data.forEach(group => {
          if (!group.filtered) {
            group.provinces.forEach(province => {
              if (!province.filtered) {
                province.municipalities.forEach(municipality => {
                  if (!municipality.filtered) {
                    total++;
                  }
                });
              }
            });
          }
        });
        break;

      case 'totalParcelsPerMunicipality':
        this.dataService.data.forEach(group => {
          if (!group.filtered) {
            group.provinces.forEach(province => {
              if (!province.filtered) {
                province.municipalities.forEach(municipality => {
                  if (!municipality.filtered) {
                    total += municipality.quantity_of_parcels_per_municipality;
                  }
                });
              }
            });
          }
        });
        break;

      case 'totalSquareMetersPerMunicipality':
        this.dataService.data.forEach(group => {
          if (!group.filtered) {
            group.provinces.forEach(province => {
              if (!province.filtered) {
                province.municipalities.forEach(municipality => {
                  if (!municipality.filtered) {
                    total += municipality.square_meters_per_municipality;
                  }
                });
              }
            });
          }
        });
        break;

      default:
        console.log("Invalid type provided.");
        break;
    }

    return total;
  }


  funcionDespuesDeAnimacion(event: any, x: any) {
    // Aquí puedes llamar a tu función
    if (event.toState === 'collapsed') {
      console.log('La animación ha terminado');
      x.filtered = true;
      // Ejecutar la lógica solo si la animación llega al estado 'collapsed'
    }
  }


  currentHovered = '';
  activebhove = true;

  hover(id: string) {
    if (this.activebhove) {

      this.currentHovered = id;
      event?.stopPropagation();
    }
  }

  leave(id: string) {
    if (this.currentHovered === id) {
      this.currentHovered = '';
    }
  }







  // @ViewChildren('prueba') divs: QueryList<ElementRef>;
  @ViewChildren('prueba') divs: any;

  ngAfterViewInit() {
    let maxWidth = 0;

    // Encuentra el ancho del div más ancho
    // this.divs.forEach(div => {
    this.divs.forEach((div: { nativeElement: { offsetWidth: any; }; }) => {

      // console.log('hola 1')
      const width = div.nativeElement.offsetWidth;

      console.log(width)
      if (width > maxWidth) {

        maxWidth = width;
      }
    });

    // Aplica el ancho del div más ancho a todos los div
    // this.divs.forEach(div => {
    this.divs.forEach((div: { nativeElement: { style: { width: string; }; }; }) => {
      console.log('hola 2')
      div.nativeElement.style.width = maxWidth + 'px';
    });
  }



  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }






  @ViewChild('tableSummary') tableSummary: any;



  // imprimirDiv(contenido: any): void {
  //   // const contenido = document.getElementById(idDiv)?.innerHTML || '';
  //   const ventanaImpresion = window.open('', '_blank', 'width=600,height=400');
  //   ventanaImpresion?.document.write(`
  //     <html>
  //       <head>
  //         <title>Impresión</title>
  //         <style>


  //         </style>
  //       </head>
  //       <body>${contenido.innerHTML}</body>
  //     </html>
  //   `);
  //   ventanaImpresion?.document.close();
  //   ventanaImpresion?.focus();
  //   // ventanaImpresion?.print();
  //   // ventanaImpresion?.close();
  // }

  printContent(htmlContent: HTMLElement): void {


    const options = {
      styleUrls: ['../../../../assets/style.css'],
      //  inlineStyles: 'h1 { color: red; }',
      onComplete: () => console.log('Impresión completada con éxito'),
      onError: (error) => console.error('Ocurrió un error durante la impresión', error)
    };

    this.print.printContent(htmlContent, options).subscribe();

  }










}
