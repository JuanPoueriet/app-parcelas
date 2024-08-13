import { Component, ElementRef, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScrollService } from '../../../scroll.service';
import { Subscription } from 'rxjs';
import { CoreService } from '../../../core/core.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlotsServiceService } from '../../../plots-service-service.service';
import { group } from 'console';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  private scrollSub!: Subscription;

  plotsForm: FormGroup;;


  constructor(private scrollService: ScrollService, private el: ElementRef, public _coreService: CoreService,
    private datePipe: DatePipe,

    private _fb: FormBuilder,
    private _plotsService: PlotsServiceService,
    // private _dialogRef: MatDialogRef<any>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });



    // Initialize the legal docs form group
    this.plotsForm = new FormGroup({
      provinceSelect: new FormControl('', Validators.required),
      municipalitySelect: new FormControl({ value: '', disabled: true }, Validators.required),
      hectareInput: new FormControl('', [Validators.min(0)]),
      areaInput: new FormControl('', [Validators.min(0)]),
      metersInput: new FormControl('', [Validators.min(0)]),
      decimetersInput: new FormControl('', [Validators.min(0)]),
      squareMetersInput: new FormControl('', Validators.required),
      cadastralDistrictInput: new FormControl('', Validators.required),
      titleCertificateInput: new FormControl('', Validators.required),
      parcelNumberInput: new FormControl('', Validators.required),
      ownerSelect: new FormControl('', Validators.required),
      commentsInput: new FormControl(''),
    });

  }






















  empForm: FormGroup;





  data: any;

  onFormSubmit() {

    // console.log(this.plotsForm.get('provinceSelect').value?.name)

    // console.log('Nombre de la provincia:', this.provinceOptions.find(option => option.id === this.plotsForm.get('provinceSelect').value)?.name);




    // provinceSelect: new FormControl('', Validators.required),
    // municipalitySelect: new FormControl({ value: '', disabled: true }, Validators.required),
    // : new FormControl('', [Validators.min(0)]),
    // : new FormControl('', [Validators.min(0)]),
    // : new FormControl('', [Validators.min(0)]),
    // : new FormControl('', [Validators.min(0)]),
    // : new FormControl('', Validators.required),
    // cadastralDistrictInput: new FormControl('', Validators.required),
    // : new FormControl('', Validators.required),
    // : new FormControl('', Validators.required),
    // ownerSelect: new FormControl('', Validators.required),
    // : new

    let currentDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let stringValue = this.plotsForm.get('squareMetersInput').value; // "2,345,654.43"
    let numericValue = Number(stringValue.replace(/,/g, '')); // 2345654.43

    let datae = {
      group: this.provinceOptions.find(option => option.id === this.plotsForm.get('provinceSelect').value)?.group,
      province: this.provinceOptions.find(option => option.id === this.plotsForm.get('provinceSelect').value)?.name,
      iso_code: this.provinceOptions.find(option => option.id === this.plotsForm.get('provinceSelect').value)?.ISO_ID,
      municipality: this.municipalityOptions.find(option => option.id === this.plotsForm.get('municipalitySelect').value)?.name,
      cadastral_district: this.plotsForm.get('cadastralDistrictInput').value,
      certificate_of_title: this.plotsForm.get('titleCertificateInput').value,
      plot_number: this.plotsForm.get('parcelNumberInput').value,
      hectare: this.plotsForm.get('hectareInput').value,
      area: this.plotsForm.get('areaInput').value,
      meter: this.plotsForm.get('metersInput').value,
      decimeter: this.plotsForm.get('decimetersInput').value,
      square_meter: numericValue,
      owner: this.owners.find(option => option.id === this.plotsForm.get('ownerSelect').value)?.name,
      attached_document: '',
      comment: this.plotsForm.get('commentsInput').value,
      registration_date: currentDateAndTime,


    }
    // console.log(datae)


    if (this.plotsForm.valid) {
      this._plotsService.addPlot(datae).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Parcela guardada correctamente', 'Aceptar');
          // this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);

        },
      });

    } else {
      this._coreService.openSnackBar('Completar los campos', 'Aceptar');

    }
    // console.log(datae)


    // if (this.plotsForm.valid) {
    //   if (this.data) {
    //     this._plotsService
    //       .updatePlot(this.data.id, this.plotsForm.value)
    //       .subscribe({
    //         next: (val: any) => {
    //           this._coreService.openSnackBar('Employee detail updated!');
    //           // this._dialogRef.close(true);
    //         },
    //         error: (err: any) => {
    //           console.error(err);
    //         },
    //       });
    //   } else {

    //   }
    // }
  }










  ngOnInit(): void {
    this.empForm.patchValue(this.data);

    // Subscribe to changes in province select to update the municipality options
    this.plotsForm.get('provinceSelect').valueChanges.subscribe(provinceId => {
      this.municipalityOptions = this.allMunicipalityOptions[provinceId] || [];
      this.plotsForm.get('municipalitySelect').reset();
      this.plotsForm.get('municipalitySelect').enable();
    });




    this.plotsForm.valueChanges.subscribe(val => {
      // Convertir los valores a números y aplicar las conversiones.
      const hectareasAMetrosCuadrados = (val.hectareInput || 0) * 10000;
      const areasAMetrosCuadrados = (val.areaInput || 0) * 100;
      const metrosCuadrados = val.metersInput || 0;
      const decimetrosAMetrosCuadrados = (val.decimetersInput || 0) * 0.01;

      const totalMetrosCuadrados = hectareasAMetrosCuadrados + areasAMetrosCuadrados + metrosCuadrados + decimetrosAMetrosCuadrados;

      // Verificar si algún input tiene un valor.
      const algunValorIngresado = [val.hectareInput, val.areaInput, val.metersInput, val.decimetersInput].some(v => v !== null && v !== '');

      if (algunValorIngresado) {
        // Formatear el número para incluir dos decimales fijos.
        const formattedValue = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalMetrosCuadrados);

        this.plotsForm.controls['squareMetersInput'].setValue(formattedValue, { emitEvent: false });
        this.plotsForm.controls['squareMetersInput'].disable({ emitEvent: false });
      } else {
        // Si no hay valores, habilitar squareMetersInput y dejar que el usuario pueda ingresar un valor.
        if (this.plotsForm.controls['squareMetersInput'].disabled) {
          this.plotsForm.controls['squareMetersInput'].setValue('')
          console.log('keep ')
          this.plotsForm.controls['squareMetersInput'].enable({ emitEvent: false });
        }
      }
    });








  }

  ngOnDestroy(): void {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }


  provinceOptions = [
    { id: 1, name: 'Distrito Nacional', ISO_ID: 'DO-01', group: '1' },
    { id: 2, name: 'Azua', ISO_ID: 'DO-02', group: '5' },
    { id: 3, name: 'Bahoruco', ISO_ID: 'DO-03', group: '5' },
    { id: 4, name: 'Barahona', ISO_ID: 'DO-04', group: '5' },
    { id: 5, name: 'Dajabón', ISO_ID: 'DO-05', group: '4' },
    { id: 6, name: 'Duarte', ISO_ID: 'DO-06', group: '3' },
    { id: 7, name: 'Elías Piña', ISO_ID: 'DO-07', group: '5' },
    { id: 8, name: 'El Seibo', ISO_ID: 'DO-08', group: '2' },
    { id: 9, name: 'Espaillat', ISO_ID: 'DO-09', group: '3' },
    { id: 10, name: 'Independencia', ISO_ID: 'DO-10', group: '5' },
    { id: 11, name: 'La Altagracia', ISO_ID: 'DO-11', group: '2' },
    { id: 12, name: 'La Romana', ISO_ID: 'DO-12', group: '2' },
    { id: 13, name: 'La Vega', ISO_ID: 'DO-13', group: '3' },
    { id: 14, name: 'María Trinidad Sánchez', ISO_ID: 'DO-14', group: '3' },
    { id: 15, name: 'Monte Cristi', ISO_ID: 'DO-15', group: '4' },
    { id: 16, name: 'Pedernales', ISO_ID: 'DO-16', group: '5' },
    { id: 17, name: 'Peravia', ISO_ID: 'DO-17', group: '5' },
    { id: 18, name: 'Puerto Plata', ISO_ID: 'DO-18', group: '4' },
    { id: 19, name: 'Hermanas Mirabal', ISO_ID: 'DO-19', group: '3' },
    { id: 20, name: 'Samana', ISO_ID: 'DO-20', group: '3' },
    { id: 21, name: 'San Cristóbal', ISO_ID: 'DO-21', group: '1' },
    { id: 22, name: 'San Juan', ISO_ID: 'DO-22', group: '5' },
    { id: 23, name: 'San Pedro de Macorís', ISO_ID: 'DO-23', group: '2' },
    { id: 24, name: 'Sánchez Ramírez', ISO_ID: 'DO-24', group: '3' },
    { id: 25, name: 'Santiago', ISO_ID: 'DO-25', group: '4' },
    { id: 26, name: 'Santiago Rodríguez', ISO_ID: 'DO-26', group: '4' },
    { id: 27, name: 'Valverde', ISO_ID: 'DO-27', group: '4' },
    { id: 28, name: 'Monseñor Nouel', ISO_ID: 'DO-28', group: '3' },
    { id: 29, name: 'Monte Plata', ISO_ID: 'DO-29', group: '1' },
    { id: 30, name: 'Hato Mayor', ISO_ID: 'DO-30', group: '2' },
    { id: 31, name: 'San José de Ocoa', ISO_ID: 'DO-31', group: '5' },
    { id: 32, name: 'Santo Domingo', ISO_ID: 'DO-32', group: '1' }
  ];



  municipalityOptions = [];
  allMunicipalityOptions = {
    1: [{ id: 'a1', name: 'Distrito Nacional' }],
    2: [
      { id: 'b1', name: 'Azua de Compostela' },
      { id: 'b2', name: 'Las Charcas' },
      { id: 'b3', name: 'Padre Las Casas' },
      { id: 'b4', name: 'Pueblo Viejo' },
      { id: 'b5', name: 'Sabana Yegua' },
      { id: 'b6', name: 'Estebanía' },
      { id: 'b7', name: 'Guayabal' },
      { id: 'b8', name: 'Las Yayas de Viajama' },
      { id: 'b9', name: 'Peravia' },
      { id: 'b10', name: 'Tábara Arriba' }
    ],
    3: [
      { id: 'c1', name: 'Neiba' },
      { id: 'c2', name: 'Galván' },
      { id: 'c3', name: 'Los Ríos' },
      { id: 'c4', name: 'Tamayo' },
      { id: 'c5', name: 'Villa Jaragua' }
    ],
    4: [
      { id: 'd1', name: 'Barahona' },
      { id: 'd2', name: 'Cabo Rojo' },
      { id: 'd3', name: 'Enriquillo' },
      { id: 'd4', name: 'La Ciénaga' },
      { id: 'd5', name: 'Las Salinas' }
    ],
    5: [
      { id: 'e1', name: 'Dajabón' },
      { id: 'e2', name: 'Loma de Cabrera' },
      { id: 'e3', name: 'Partido' },
      { id: 'e4', name: 'Restauración' }
    ],
    6: [
      { id: 'f1', name: 'San Francisco de Macorís' },
      { id: 'f2', name: 'Arenoso' },
      { id: 'f3', name: 'Castillo' },
      { id: 'f4', name: 'Pimentel' },
      { id: 'f5', name: 'Villa Riva' }
    ],
    7: [
      { id: 'g1', name: 'Comendador' },
      { id: 'g2', name: 'Bánica' },
      { id: 'g3', name: 'El Llano' },
      { id: 'g4', name: 'Hondo Valle' },
      { id: 'g5', name: 'Juan Santiago' },
      { id: 'g6', name: 'Pedro Santana' }
    ],
    8: [
      { id: 'h1', name: 'El Seibo' },
      { id: 'h2', name: 'Miches' }
    ],
    9: [
      { id: 'i1', name: 'Moca' },
      { id: 'i2', name: 'Cayetano Germosén' },
      { id: 'i3', name: 'Gaspar Hernández' },
      { id: 'i4', name: 'Jamao al Norte' }
    ],
    10: [
      { id: 'j1', name: 'Jimaní' },
      { id: 'j2', name: 'Duvergé' },
      { id: 'j3', name: 'La Descubierta' },
      { id: 'j4', name: 'Mella' },
      { id: 'j5', name: 'Postrer Río' }
    ],
    11: [
      { id: 'k1', name: 'Higüey' },
      { id: 'k2', name: 'San Rafael del Yuma' }
    ],
    12: [
      { id: 'l1', name: 'La Romana' },
      { id: 'l2', name: 'Guaymate' },
      { id: 'l3', name: 'Villa Hermosa' }
    ],
    13: [
      { id: 'm1', name: 'Concepción de la Vega' },
      { id: 'm2', name: 'Constanza' },
      { id: 'm3', name: 'Jarabacoa' },
      { id: 'm4', name: 'Jima Abajo' }
    ],
    14: [
      { id: 'n1', name: 'Nagua' },
      { id: 'n2', name: 'Cabrera' },
      { id: 'n3', name: 'Río San Juan' }
    ],
    15: [
      { id: 'o1', name: 'Montecristi' },
      { id: 'o2', name: 'Castañuela' },
      { id: 'o3', name: 'Guayubín' },
      { id: 'o4', name: 'Las Matas de Santa Cruz' },
      { id: 'o5', name: 'Pepillo Salcedo' },
      { id: 'o6', name: 'Villa Vásquez' }
    ],
    16: [
      { id: 'p1', name: 'Pedernales' },
      { id: 'p2', name: 'Oviedo' }
    ],
    17: [
      { id: 'q1', name: 'Baní' },
      { id: 'q2', name: 'Nizao' }
    ],
    18: [
      { id: 'r1', name: 'San Felipe de Puerto Plata' },
      { id: 'r2', name: 'Sosúa' },
      { id: 'r3', name: 'Cabarete' },
      { id: 'r4', name: 'Altamira' },
      { id: 'r5', name: 'Imbert' }
    ],
    19: [
      { id: 's1', name: 'Salcedo' },
      { id: 's2', name: 'Tenares' },
      { id: 's3', name: 'Villa Tapia' }
    ],
    20: [
      { id: 't1', name: 'Santa Bárbara de Samaná' },
      { id: 't2', name: 'Sánchez' },
      { id: 't3', name: 'Las Terrenas' }
    ],
    21: [
      { id: 'u1', name: 'San Cristóbal' },
      { id: 'u2', name: 'Bajos de Haina' },
      { id: 'u3', name: 'Nigua' },
      { id: 'u4', name: 'Villa Altagracia' },
      { id: 'u5', name: 'Yaguate' }
    ],
    22: [
      { id: 'v1', name: 'San Juan de la Maguana' },
      { id: 'v2', name: 'Las Matas de Farfán' },
      { id: 'v3', name: 'El Cercado' },
      { id: 'v4', name: 'Bohechío' }
    ],
    23: [
      { id: 'w1', name: 'San Pedro de Macorís' },
      { id: 'w2', name: 'Consuelo' },
      { id: 'w3', name: 'San José de Los Llanos' },
      { id: 'w4', name: 'Quisqueya' },
      { id: 'w5', name: 'Ramón Santana' },
      { id: 'w6', name: 'Guayacanes' }
    ],
    24: [
      { id: 'x1', name: 'Cotuí' },
      { id: 'x2', name: 'Cevicos' },
      { id: 'x3', name: 'Fantino' },
      { id: 'x4', name: 'La Mata' }
    ],
    25: [
      { id: 'y1', name: 'Santiago de los Caballeros' },
      { id: 'y2', name: 'Cienfuegos' },
      { id: 'y3', name: 'Licey al Medio' },
      { id: 'y4', name: 'Tamboril' },
      { id: 'y5', name: 'Puñal' },
      { id: 'y6', name: 'Villa González' }
    ],
    26: [
      { id: 'z1', name: 'San Ignacio de Sabaneta' },
      { id: 'z2', name: 'Monción' },
      { id: 'z3', name: 'Villa Los Almácigos' }
    ],
    27: [
      { id: 'aa1', name: 'Mao' },
      { id: 'aa2', name: 'Esperanza' },
      { id: 'aa3', name: 'Laguna Salada' }
    ],
    28: [
      { id: 'ab1', name: 'Bonao' },
      { id: 'ab2', name: 'Maimón' },
      { id: 'ab3', name: 'Piedra Blanca' }
    ],
    29: [
      { id: 'ac1', name: 'Monte Plata' },
      { id: 'ac2', name: 'Bayaguana' },
      { id: 'ac3', name: 'Yamasá' },
      { id: 'ac4', name: 'Peralvillo' },
      { id: 'ac5', name: 'Sabana Grande de Boyá' }
    ],
    30: [
      { id: 'ad1', name: 'Hato Mayor' },
      { id: 'ad2', name: 'Sabana de la Mar' },
      { id: 'ad3', name: 'El Valle' }
    ],
    31: [
      { id: 'ae1', name: 'San José de Ocoa' },
      { id: 'ae2', name: 'Rancho Arriba' },
      { id: 'ae3', name: 'Sabana Larga' }
    ],
    32: [
      { id: 'af1', name: 'Santo Domingo Este' },
      { id: 'af2', name: 'Santo Domingo Norte' },
      { id: 'af3', name: 'Santo Domingo Oeste' },
      { id: 'af4', name: 'Los Alcarrizos' },
      { id: 'af5', name: 'Pedro Brand' },
      { id: 'af6', name: 'Boca Chica' },
      { id: 'af7', name: 'San Antonio de Guerra' }
    ]
  };


  owners = [
    { "id": 1, "name": "Corporación Dominicana de Empresas Eléctricas Estatales (CDEEE)" },
    { "id": 2, "name": "Consejo Estatal del Azúcar (CEA)" },
    { "id": 3, "name": "Dirección General de Bienes Nacionales" },
    { "id": 4, "name": "Estado Dominicano" },
    { "id": 5, "name": "Ministerio de Educación" },
    { "id": 6, "name": "Ministerio de Medio Ambiente y Recursos Naturales" },
    { "id": 7, "name": "Ministerio de Defensa" },
    { "id": 8, "name": "Ministerio de Obras Públicas y Comunicaciones" },
    { "id": 9, "name": "Ministerio de Turismo" },
    { "id": 10, "name": "Instituto Agrario Dominicano (IAD)" },
    { "id": 11, "name": "Banco Agrícola de la República Dominicana" },
    { "id": 12, "name": "Ingenio Barahona" },
    { "id": 13, "name": "Ingenio Boca Chica" },
    { "id": 14, "name": "Ingenio Consuelo" },
    { "id": 15, "name": "Ingenio Cristóbal Colón" },
    { "id": 16, "name": "Ingenio Monte Llano" },
    { "id": 17, "name": "Ingenio Porvenir" },
    { "id": 18, "name": "Ingenio Central Río Haina" }
  ];









  center = { lat: 18.735693, lng: -70.162651 }; // Coordenadas de República Dominicana
  zoom = 8;
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 50,
    minZoom: 0,
    styles: [

      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          { visibility: "off" } // Desactivar todas las etiquetas
        ]
      },

      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "on" } // Asegura que los nombres de las calles se muestren
        ]
      },


      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },//color del shape del mapa
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#0f0f0f' }]//color del agua del mapa del lado afuera
        // stylers: [{ color: '#17263c' }]//color del agua del mapa del lado afuera
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      },

    ]
  };




}
