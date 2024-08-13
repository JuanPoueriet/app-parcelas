import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../../../data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../../scroll.service';
import { ScrollContainerService } from '../../../scroll-container.service';
// import { PieComponent } from '../pie/pie.component';
import { ComunicationService } from '../comunication.service';



@Component({
  selector: 'dashboard-filter-summary',
  templateUrl: './filter-summary.component.html',
  styleUrl: './filter-summary.component.scss',
  animations: [
    trigger('menu-animation', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('{{ duration }}ms cubic-bezier(0.35, 0, 1, 1)'))
    ]),
    trigger('overlay', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('{{ duration }}ms cubic-bezier(0.35, 0, 1, 1)'))
    ]),
  ]
})
export class FilterSummaryComponent implements AfterViewInit, OnDestroy {

  @ViewChild(CdkPortal, { static: true }) menuPortal: CdkPortal;
  @ViewChild('menuButton', { read: ElementRef }) menuButton!: ElementRef;
  @ViewChild('menuasdf') menuElement!: ElementRef;
  @Output() dataEmitter = new EventEmitter<any>();




  constructor(private cdRef: ChangeDetectorRef, private elRef: ElementRef,
    public dataService: DataService, private renderer: Renderer2,
    private scrollService: ScrollService, private containerService: ScrollContainerService,
    private comunicationService: ComunicationService

  ) { }

  menuOpen = false;
  state = 'initial';


  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    // Verifica si el clic fue fuera del contenedor del menú y el menú está abierto
    if (!this.elRef.nativeElement.contains(event.target) && this.menuOpen) {
      this.menuOpen = false;
      this.overlay = false;

    }
  }


  @ViewChild(CdkPortalOutlet, { static: false }) portalOutlet: CdkPortalOutlet;



  overlay = false;

  toggleMenu(): void {
    if (!this.menuOpen) {
      this.overlay = true;
      const buttonRect = this.menuButton.nativeElement.getBoundingClientRect();
      const containerRect = this.scrollContainer.getBoundingClientRect();
      const menuHeight = 346; // Altura del menú
      const relativeTop = buttonRect.top - containerRect.top + this.scrollContainer.scrollTop;
      const menuBottom = relativeTop + menuHeight;
      const containerVisibleHeight = this.scrollContainer.clientHeight - 0;

      // Verifica si el menú queda cortado cuando se abre




      if ((buttonRect.y + menuHeight + 35 + 20) > containerVisibleHeight || relativeTop < this.scrollContainer.scrollTop) {
        const targetScroll = relativeTop - (containerVisibleHeight / 2) + (menuHeight / 2) + 56;
        this.smoothScrollTo(targetScroll, 700, () => {
          this.menuOpen = true;
          setTimeout(() => {
            this.updateMenuPosition();
            this.cdRef.detectChanges();
          }, 1);
        });
      } else {
        this.menuOpen = true;
        setTimeout(() => {
          this.updateMenuPosition();
          this.cdRef.detectChanges();
        }, 1);
      }
    } else {
      this.overlay = false;
      this.menuOpen = false; // Cierra el menú si ya está abierto
    }
  }






  smoothScrollTo(target: number, duration: number = 500, onComplete: () => void) {
    const start = this.scrollContainer.scrollTop;
    const change = target - start;
    let startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutCubic = progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

      this.scrollContainer.scrollTop = start + change * easeInOutCubic;

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        onComplete();
      }
    };

    requestAnimationFrame(animateScroll);
  }







  ngAfterViewInit(): void {
    this.scrollListener = this.renderer.listen('window', 'scroll', () => {
      if (this.menuOpen) { // Only update if the menu is open
        this.updateMenuPosition();
      }
    });
  }

  ngOnDestroy(): void {

    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
    if (this.containerSub) {
      this.containerSub.unsubscribe();
    }
  }



  private scrollListener: Function | null = null;

  private updateMenuPosition(): void {
    if (this.menuButton && this.menuElement) {
      const buttonRect = this.menuButton.nativeElement.getBoundingClientRect();
      const menuHeight = 395; // Altura del menú
      const menuWidth = 245; // Ancho del menú
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let newTop = buttonRect.bottom + 3; // 3px de margen desde el botón
      let newLeft = buttonRect.left;

      // Verifica si el menú se sale por la parte inferior del viewport
      // if (newTop + menuHeight > viewportHeight) {
      //   newTop = buttonRect.top - menuHeight - 3; // Posiciona el menú encima del botón si no cabe debajo
      // }

      // Verifica si el menú se sale por la derecha del viewport
      if (newLeft + menuWidth > viewportWidth) {
        newLeft = viewportWidth - menuWidth - 20; // Ajusta para mantener el menú dentro del viewport
      }

      this.renderer.setStyle(this.menuElement.nativeElement, 'top', `${newTop}px`);
      this.renderer.setStyle(this.menuElement.nativeElement, 'left', `${newLeft}px`);
    }
  }





  private scrollSub!: Subscription;
  private containerSub!: Subscription;
  menuVisible = false;
  private scrollContainer!: HTMLElement;





  ngOnInit(): void {
    this.containerSub = this.containerService.container$.subscribe(container => {
      if (container) {
        this.scrollContainer = container;
      }
    });
  }





  searchQuery = '';

  // Método para filtrar los elementos del DOM
  filtrarDatos() {
    const datos = document.querySelectorAll('.dato');
    datos.forEach(dato => {
      if (dato.textContent.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        dato.classList.remove('oculto');
      } else {
        dato.classList.add('oculto');
      }
    });
  }




  updateFilteringState(event: Event, levelType: 'group' | 'province' | 'municipality' | 'owner', groupIndex?: number, provinceIndex?: number, municipalityIndex?: number): void {
    event.stopPropagation();

    if (levelType === 'municipality' && typeof groupIndex !== 'undefined' && typeof provinceIndex !== 'undefined' && typeof municipalityIndex !== 'undefined') {
      // Encuentra y actualiza el municipio



      let municipalityToUpdate = this.dataService.data[groupIndex].provinces[provinceIndex].municipalities[municipalityIndex];
      municipalityToUpdate.filtered = !municipalityToUpdate.filtered; // Cambia el estado de filtrado

      // Verifica el estado de filtrado para todos los municipios de la provincia
      const allMunicipalitiesFiltered = this.dataService.data[groupIndex].provinces[provinceIndex].municipalities.every(m => m.filtered);

      if (allMunicipalitiesFiltered) {
        const data = {
          id: this.dataService.data[groupIndex].provinces[provinceIndex].id,
          value: false
        }
        this.comunicationService.updateData(data);
      }









      // Actualiza la provincia basado en el estado de filtrado de sus municipios
      this.dataService.data[groupIndex].provinces[provinceIndex].filtered = allMunicipalitiesFiltered;

      // Si todas las provincias ahora están filtradas, actualiza el grupo
      const allProvincesFiltered = this.dataService.data[groupIndex].provinces.every(p => p.filtered);
      this.dataService.data[groupIndex].filtered = allProvincesFiltered;

      this.comunicationService.updateData(null)


    } else if (levelType === 'province' && typeof groupIndex !== 'undefined' && typeof provinceIndex !== 'undefined') {
      // Encuentra y actualiza la provincia
      let provinceToUpdate = this.dataService.data[groupIndex].provinces[provinceIndex];
      provinceToUpdate.filtered = !provinceToUpdate.filtered; // Cambia el estado de filtrado


      const data = {
        id: provinceToUpdate.id,
        value: false
      }
      this.comunicationService.updateData(data);





      // Actualiza todos los municipios de la provincia
      provinceToUpdate.municipalities.forEach(municipality => {
        municipality.filtered = provinceToUpdate.filtered;
      });

      // Verifica si todas las provincias en el grupo están filtradas
      const allProvincesFiltered = this.dataService.data[groupIndex].provinces.every(province => province.filtered);
      this.dataService.data[groupIndex].filtered = allProvincesFiltered;
    } else if (levelType === 'group' && typeof groupIndex !== 'undefined') {
      // Cambia el estado de filtrado del grupo y de todos sus hijos
      let groupToUpdate = this.dataService.data[groupIndex];
      groupToUpdate.filtered = !groupToUpdate.filtered; // Cambia el estado de filtrado

      // Actualiza todas las provincias y sus municipios
      groupToUpdate.provinces.forEach(province => {
        province.filtered = groupToUpdate.filtered;


        const data = {
          id: province.id,
          value: false
        }

        this.comunicationService.updateData(data);




        province.municipalities.forEach(municipality => {
          municipality.filtered = groupToUpdate.filtered;
        });
      });
    } else if (levelType === 'owner') {
      this.dataService.dataOwner[groupIndex].filtered = false
    }

    // Detecta los cambios en la vista
    this.cdRef.detectChanges();
    // this.updateAllComplete();
  }

  anyFilterApplied = false;
  resetFilters() {
    this.setAll(true)
  }

  // Estado original de la tabla
  originalTable: Node | null = null;

  // Función para ordenar la tabla
  sortTable(column: number, order: 'asc' | 'desc') {
    const table = document.getElementById("myTable") as HTMLTableElement;
    if (!this.originalTable) {
      this.originalTable = table.cloneNode(true); // Guardar el estado original solo la primera vez
    }
    let switching = true, shouldSwitch;
    let rows, i, x, y;

    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[column];
        y = rows[i + 1].getElementsByTagName("TD")[column];

        if ((order === 'asc' && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
          (order === 'desc' && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    this.anyFilterApplied = false; // Habilitar el botón de restablecimiento
  }


  getFilteredElements(type: string) {
    let elements: any = [];
    if (type === 'province') {
      this.dataService.data.forEach(group => {
        elements.push(...group.provinces);
      });
    } else if (type === 'municipality') {

      this.dataService.data.forEach(group => {
        group.provinces.forEach(province => {
          elements.push(...province.municipalities);
        });
      });


    } else if (type === 'group') {
      elements = [...this.dataService.data];
    } else if (type === 'owner') {
      elements = [...this.dataService.dataOwner];
    }


    return elements;
  }

  @Input() filterType: 'group' | 'municipality' | 'province' | 'owner';
  @Input() filterElement: string;




  toggleFiltered(id: string, type: string) {
    let element;


    // Encuentra el elemento basado en el id y type
    if (type === 'municipality') {
      element = this.dataService.data.flatMap(group => group.provinces.flatMap(province => province.municipalities))
        .find(municipality => municipality.id === id);

    } else if (type === 'province') {
      element = this.dataService.data.flatMap(group => group.provinces)
        .find(province => province.id === id);
    } else if (type === 'group') {
      element = this.dataService.data.find(group => group.id === id);
    } else if (type === 'owner') {
      element = this.dataService.dataOwner.find(owner => owner.id === id);
    }

    // Si no se encuentra el elemento, no se hace nada más
    if (!element) return;

    // Invierte el estado de filtrado
    element.filtered = !element.filtered;


    // Aplica la lógica de filtrado basada en el tipo
    if (type === 'municipality') {
      const province = this.dataService.data.flatMap(group => group.provinces)
        .find(province => province.municipalities.some(municipality => municipality.id === id));


      if (!element.filtered) {
        province.filtered = false;
        const group = this.dataService.data.find(group => group.provinces.includes(province));
        group.filtered = false;



        const data = {
          id: province.id,
          value: true
        }
        this.comunicationService.updateData(data);

        this.comunicationService.updateData(null);

      } else {
        province.filtered = province.municipalities.every(municipality => municipality.filtered);
        const group = this.dataService.data.find(group => group.provinces.includes(province));
        group.filtered = group.provinces.every(province => province.filtered);
        // this.comunicationService.updateData(null);



      }


      if (province.filtered) {

        const data = {
          id: province.id,
          value: false
        }
        this.comunicationService.updateData(data);
      }

      this.comunicationService.updateData(null);



    } else if (type === 'province') {
      const group = this.dataService.data.find(group => group.provinces.some(province => province.id === id));

      element.municipalities.forEach(municipality => municipality.filtered = element.filtered);




      if (!element.filtered) {
        group.filtered = false;
        const data = {
          id: id,
          value: true
        }
        this.comunicationService.updateData(data);


        this.comunicationService.updateData(null);

      } else {

        group.filtered = group.provinces.every(province => province.filtered);
        const data = {
          id: id,
          value: false
        }
        this.comunicationService.updateData(data);


        this.comunicationService.updateData(null);
      }
    } else if (type === 'group') {
      element.provinces.forEach(province => {
        province.filtered = element.filtered;
        province.municipalities.forEach(municipality => municipality.filtered = element.filtered);

        const data = {
          id: province.id,
          value: !element.filtered
        }
        this.comunicationService.updateData(data);


        this.comunicationService.updateData(null);
      });
    } else if (type === 'owner') {

      for (let i = 0; i < this.dataService.dataOwner.length; i++) {
        //  = 
        if (this.dataService.dataOwner[i].id === id) {
          this.dataService.dataOwner[i].filtered = element.filtered;
        }

      }

    }
  }





  someComplete(): boolean {
    const items = this.getFilteredElements(this.filterType); // o el tipo de elemento que desees
    const selectedItems = items.filter(item => !item.filtered);
    // someComplete si al menos un item está filtrado y no todos los items están filtrados
    return selectedItems.length > 0 && !this.areAllElementsFiltered(this.filterType);
  }

  someFilteredOrNone(): boolean {
    const items = this.getFilteredElements(this.filterType); // o el tipo de elemento que desees
    if (items.length === 0) {
      // Devuelve true si la lista está vacía
      return true;
    }
    // Devuelve true si algún item tiene filtered en true
    return items.some(item => item.filtered);
  }


  afasfasd() {
    this.comunicationService.updateData(null);

  }

  setAll(checked: boolean) {
    if (this.filterType === 'group' || this.filterType === "province" || this.filterType === "municipality") {
      // Actualizar la propiedad allComplete directamente con el valor de checked.

      // Usar métodos de alto nivel para iterar y actualizar las propiedades de forma concisa.
      this.dataService.data.forEach(group => {
        group.filtered = !checked;
        group.provinces.forEach(province => {
          province.filtered = !checked;


          const data = {
            id: province.id,
            value: checked
          }


          province.municipalities.forEach(municipality => {
            municipality.filtered = !checked;
          });
          this.comunicationService.updateData(data);
          this.comunicationService.updateData(null);

        });
      });

      // Actualizar el estado de allComplete basado en el nuevo estado de los elementos.
    }


    setTimeout(() => {
      this.comunicationService.updateData(null);
    }, 2000); // Espera 1 segundo antes de cargar y dibujar el gráfico
  }

  // Determina si todos los elementos de un tipo específico están marcados como filtered=true.
  areAllElementsFiltered(filterType: 'group' | 'province' | 'municipality' | 'owner'): boolean {
    let areAllFalse = true; // Comienza asumiendo que todos están en false.

    this.dataService.data.forEach(group => {
      if (filterType === 'group' && group.filtered) areAllFalse = false;

      group.provinces.forEach(province => {
        if (filterType === 'province' && province.filtered) areAllFalse = false;

        province.municipalities.forEach(municipality => {
          if (filterType === 'municipality' && municipality.filtered) areAllFalse = false;
        });
      });
    });

    return areAllFalse;


  }






  resetTable() {
    const table = document.getElementById("myTable") as HTMLTableElement;
    if (this.originalTable) {
      const newTable = this.originalTable.cloneNode(true) as HTMLTableElement;
      table.parentNode!.replaceChild(newTable, table);
      this.reassignEventHandlers();
      // document.getElementById("resetButton")!.disabled = true; // Deshabilitar el botón de restablecimiento
    }
  }

  reassignEventHandlers() {
    const table = document.getElementById("myTable") as HTMLTableElement;
    const headers = table.getElementsByTagName("th");
    for (let i = 0; i < headers.length; i++) {
      if (i % 2 === 0) { // Columnas de ordenamiento ascendente
        headers[i].onclick = () => this.sortTable(Math.floor(i / 2), 'asc');
      } else { // Columnas de ordenamiento descendente
        headers[i].onclick = () => this.sortTable(Math.floor(i / 2), 'desc');
      }
    }
  }


}
