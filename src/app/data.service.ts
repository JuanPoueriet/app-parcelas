import { Injectable } from '@angular/core';

interface Municipality {
  name: string;
  id: string;
  filtered: boolean;
  quantity_of_parcels_per_municipality: number;
  square_meters_per_municipality: number;
  type: string;
  disabled: boolean;
}

interface Province {
  name: string;
  id: string;
  ISO_CODE?: string;
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

@Injectable({
  providedIn: 'root'
})
export class DataService {



  data: Group[] = [
    {
      "name": "1",
      "id": "ipXmC3rg",
      "filtered": false,
      "disabled": false,
      "type": "group",
      "provinces": [
        {
          "name": "Santo Domingo",
          "ISO_CODE": "DO-32",
          "id": "DTWHeVPj",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "Santo Domingo Este",
              "id": "LL5QlqJA",
              "filtered": false,
              "type": "municipality",
              "disabled": false,
              "quantity_of_parcels_per_municipality": 2452,
              "square_meters_per_municipality": 1343554.72
            },
            {
              "name": "Santo Domingo Norte",
              "id": "gOX73hGS",
              "filtered": false,
              "type": "municipality",
              "disabled": false,
              "quantity_of_parcels_per_municipality": 234,
              "square_meters_per_municipality": 784352
            },
            {
              "name": "Santo Domingo Oeste",
              "id": "newID1",
              "filtered": false,
              "type": "municipality",
              "disabled": false,
              "quantity_of_parcels_per_municipality": 1567,
              "square_meters_per_municipality": 987654
            },
            {
              "name": "Boca Chica",
              "id": "newID2",
              "filtered": false,
              "type": "municipality",
              "disabled": false,
              "quantity_of_parcels_per_municipality": 1234,
              "square_meters_per_municipality": 654321
            },
          ]
        },
        {
          "name": "Monte Plata",
          "ISO_CODE": "DO-29",
          "id": "csIjxvbe",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "Yamasá",
              "id": "dk49IXRI",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 2354,
              "square_meters_per_municipality": 4567
            },
            {
              "name": "Monte Plata",
              "id": "newID3",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 987,
              "square_meters_per_municipality": 3454645
            },

          ]
        },
        {
          "name": "San Pedro",
          "ISO_CODE": "DO-23",
          "id": "newID12",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "San Pedro de Macorís",
              "id": "newID13",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 1500,
              "square_meters_per_municipality": 2500000
            },
            {
              "name": "Consuelo",
              "id": "newID14",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 1200,
              "square_meters_per_municipality": 1900000
            },
            {
              "name": "Quisqueya",
              "id": "newID15",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 1000,
              "square_meters_per_municipality": 1600000
            },
            {
              "name": "Ramón Santana",
              "id": "newID16",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 800,
              "square_meters_per_municipality": 1300000
            },
            {
              "name": "Guayacanes",
              "id": "newID17",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 700,
              "square_meters_per_municipality": 1100000
            }
          ]
        }
      ]
    },
    {
      "name": "2",
      "id": "qv1DM15i",
      "filtered": false,
      "disabled": false,
      "type": "group",
      "provinces": [
        {
          "name": "Samaná",
          "ISO_CODE": "DO-20",
          "id": "vrO44yDk",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "Las Terrenas",
              "id": "6mqrELny",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 221,
              "square_meters_per_municipality": 4352345
            },
            {
              "name": "Santa Bárbara de Samaná",
              "id": "newID9",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 678,
              "square_meters_per_municipality": 345678
            },
            {
              "name": "Sánchez",
              "id": "newID10",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 123,
              "square_meters_per_municipality": 23456
            }
          ]
        },


        {
          "name": "Hato Mayor",
          "ISO_CODE": "DO-30",
          "id": "newID18",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "Hato Mayor del Rey",
              "id": "newID19",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 500,
              "square_meters_per_municipality": 800000
            },
            {
              "name": "Sabana de la Mar",
              "id": "newID20",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 300,
              "square_meters_per_municipality": 600000
            },
            {
              "name": "El Valle",
              "id": "newID21",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 200,
              "square_meters_per_municipality": 400000
            }
          ]
        },

            {
              "name": "La Altagracia",
              "ISO_CODE": "DO-11",
              "id": "newID22",
              "filtered": false,
              "disabled": false,
              "type": "province",
              "municipalities": [
                {
                  "name": "Higüey",
                  "id": "newID23",
                  "filtered": false,
                  "disabled": false,
                  "type": "municipality",
                  "quantity_of_parcels_per_municipality": 1000,
                  "square_meters_per_municipality": 2000000
                },
                {
                  "name": "San Rafael del Yuma",
                  "id": "newID24",
                  "filtered": false,
                  "disabled": false,
                  "type": "municipality",
                  "quantity_of_parcels_per_municipality": 800,
                  "square_meters_per_municipality": 1600000
                }
              ]
            },
            {
              "name": "El Seibo",
              "ISO_CODE": "DO-08",
              "id": "newID25",
              "filtered": false,
              "disabled": false,
              "type": "province",
              "municipalities": [
                {
                  "name": "El Seibo",
                  "id": "newID26",
                  "filtered": false,
                  "disabled": false,
                  "type": "municipality",
                  "quantity_of_parcels_per_municipality": 500,
                  "square_meters_per_municipality": 1000000
                },
                {
                  "name": "Miches",
                  "id": "newID27",
                  "filtered": false,
                  "disabled": false,
                  "type": "municipality",
                  "quantity_of_parcels_per_municipality": 400,
                  "square_meters_per_municipality": 800000
                }
              ]
            },
        // {
        //   "name": "La Romana",
        //   "ISO_CODE": "DO-12",
        //   "id": "newID28",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "La Romana",
        //       "id": "newID29",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 1200,
        //       "square_meters_per_municipality": 2400000
        //     },
        //     {
        //       "name": "Villa Hermosa",
        //       "id": "newID30",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 700,
        //       "square_meters_per_municipality": 1400000
        //     }
        //   ]
        // },

        // {
        //   "name": "Distrito Nacional",
        //   "ISO_CODE": "DO-01",
        //   "id": "newID31",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Santo Domingo de Guzmán",
        //       "id": "newID32",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 3000,
        //       "square_meters_per_municipality": 4500000
        //     }
        //   ]
        // },
        // {
        //   "name": "San Cristóbal",
        //   "ISO_CODE": "DO-21",
        //   "id": "newID33",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "San Cristóbal",
        //       "id": "newID34",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 1500,
        //       "square_meters_per_municipality": 3000000
        //     },
        //     {
        //       "name": "Bajos de Haina",
        //       "id": "newID35",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 1200,
        //       "square_meters_per_municipality": 2400000
        //     },
        //     {
        //       "name": "Nigua",
        //       "id": "newID36",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 800,
        //       "square_meters_per_municipality": 1600000
        //     }
        //   ]
        // },
        // {
        //   "name": "Santiago",
        //   "ISO_CODE": "DO-25",
        //   "id": "newID37",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Santiago de los Caballeros",
        //       "id": "newID38",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 2000,
        //       "square_meters_per_municipality": 4000000
        //     },
        //     {
        //       "name": "Licey al Medio",
        //       "id": "newID39",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 900,
        //       "square_meters_per_municipality": 1800000
        //     },
        //     {
        //       "name": "Tamboril",
        //       "id": "newID40",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 700,
        //       "square_meters_per_municipality": 1400000
        //     }
        //   ]
        // },
        // {
        //   "name": "Monte Cristi",
        //   "ISO_CODE": "DO-15",
        //   "id": "newID41",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Monte Cristi",
        //       "id": "newID42",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 400,
        //       "square_meters_per_municipality": 800000
        //     }
        //   ]
        // },
        // {
        //   "name": "Puerto Plata",
        //   "ISO_CODE": "DO-18",
        //   "id": "newID43",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "San Felipe de Puerto Plata",
        //       "id": "newID44",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 1300,
        //       "square_meters_per_municipality": 2600000
        //     },
        //     {
        //       "name": "Sosúa",
        //       "id": "newID45",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 600,
        //       "square_meters_per_municipality": 1200000
        //     }
        //   ]
        // },
        // {
        //   "name": "San Juan",
        //   "ISO_CODE": "DO-22",
        //   "id": "newID46",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "San Juan de la Maguana",
        //       "id": "newID47",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 700,
        //       "square_meters_per_municipality": 1400000
        //     }
        //   ]
        // },
        // {
        //   "name": "Peravia",
        //   "ISO_CODE": "DO-17",
        //   "id": "newID48",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Baní",
        //       "id": "newID49",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 1100,
        //       "square_meters_per_municipality": 2200000
        //     }
        //   ]
        // },
        // {
        //   "name": "San José de Ocoa",
        //   "ISO_CODE": "DO-31",
        //   "id": "newID50",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "San José de Ocoa",
        //       "id": "newID51",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 500,
        //       "square_meters_per_municipality": 1000000
        //     }
        //   ]
        // },
        // {
        //   "name": "La Vega",
        //   "ISO_CODE": "DO-13",
        //   "id": "newID52",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "La Vega",
        //       "id": "newID53",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 1400,
        //       "square_meters_per_municipality": 2800000
        //     },
        //     {
        //       "name": "Concepción de La Vega",
        //       "id": "newID54",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 900,
        //       "square_meters_per_municipality": 1800000
        //     },
        //     {
        //       "name": "Jarabacoa",
        //       "id": "newID55",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 800,
        //       "square_meters_per_municipality": 1600000
        //     }
        //   ]
        // },
        // {
        //   "name": "Monseñor Nouel",
        //   "ISO_CODE": "DO-28",
        //   "id": "newID56",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Bonao",
        //       "id": "newID57",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 800,
        //       "square_meters_per_municipality": 1600000
        //     }
        //   ]
        // },
        // {
        //   "name": "Sánchez Ramírez",
        //   "ISO_CODE": "DO-24",
        //   "id": "newID58",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Cotuí",
        //       "id": "newID59",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 700,
        //       "square_meters_per_municipality": 1400000
        //     }
        //   ]
        // },
        // {
        //   "name": "Duarte",
        //   "ISO_CODE": "DO-06",
        //   "id": "newID60",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "San Francisco de Macorís",
        //       "id": "newID61",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 1300,
        //       "square_meters_per_municipality": 2600000
        //     }
        //   ]
        // },
        // {
        //   "name": "María Trinidad Sánchez",
        //   "ISO_CODE": "DO-14",
        //   "id": "newID62",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Nagua",
        //       "id": "newID63",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 600,
        //       "square_meters_per_municipality": 1200000
        //     }
        //   ]
        // },
        // {
        //   "name": "Espaillat",
        //   "ISO_CODE": "DO-09",
        //   "id": "newID64",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Moca",
        //       "id": "newID65",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 900,
        //       "square_meters_per_municipality": 1800000
        //     },
        //     {
        //       "name": "Cayetano Germosén",
        //       "id": "newID66",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 400,
        //       "square_meters_per_municipality": 800000
        //     }
        //   ]
        // },
        // {
        //   "name": "Salcedo",
        //   "ISO_CODE": "DO-19",
        //   "id": "newID67",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Salcedo",
        //       "id": "newID68",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 500,
        //       "square_meters_per_municipality": 1000000
        //     },
        //     {
        //       "name": "Tenares",
        //       "id": "newID69",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 300,
        //       "square_meters_per_municipality": 600000
        //     }
        //   ]
        // },
        // {
        //   "name": "Azua",
        //   "ISO_CODE": "DO-02",
        //   "id": "newID70",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Azua de Compostela",
        //       "id": "newID71",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 1100,
        //       "square_meters_per_municipality": 2200000
        //     }
        //   ]
        // },
        // {
        //   "name": "Barahona",
        //   "ISO_CODE": "DO-04",
        //   "id": "newID72",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Barahona",
        //       "id": "newID73",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 800,
        //       "square_meters_per_municipality": 1600000
        //     }
        //   ]
        // },
        // {
        //   "name": "Pedernales",
        //   "ISO_CODE": "DO-16",
        //   "id": "newID74",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Pedernales",
        //       "id": "newID75",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 400,
        //       "square_meters_per_municipality": 800000
        //     }
        //   ]
        // },
        // {
        //   "name": "Independencia",
        //   "ISO_CODE": "DO-10",
        //   "id": "newID76",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Jimaní",
        //       "id": "newID77",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 300,
        //       "square_meters_per_municipality": 600000
        //     }
        //   ]
        // },
        // {
        //   "name": "Baoruco",
        //   "ISO_CODE": "DO-03",
        //   "id": "newID78",
        //   "filtered": false,
        //   "disabled": false,
        //   "type": "province",
        //   "municipalities": [
        //     {
        //       "name": "Neiba",
        //       "id": "newID79",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 500,
        //       "square_meters_per_municipality": 1000000
        //     },
        //     {
        //       "name": "Tamayo",
        //       "id": "newID80",
        //       "filtered": false,
        //       "disabled": false,
        //       "type": "municipality",
        //       "quantity_of_parcels_per_municipality": 400,
        //       "square_meters_per_municipality": 800000
        //     }
        //   ]
        // },
        {
          "name": "Elías Piña",
          "ISO_CODE": "DO-07",
          "id": "newID81",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "Comendador",
              "id": "newID82",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 300,
              "square_meters_per_municipality": 600000
            },
            {
              "name": "Bánica",
              "id": "newID83",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 200,
              "square_meters_per_municipality": 400000
            }
          ]
        },
        {
          "name": "Santiago Rodríguez",
          "ISO_CODE": "DO-26",
          "id": "newID84",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "San Ignacio de Sabaneta",
              "id": "newID85",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 600,
              "square_meters_per_municipality": 1200000
            }
          ]
        },
        {
          "name": "Dajabón",
          "ISO_CODE": "DO-05",
          "id": "newID86",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "Dajabón",
              "id": "newID87",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 400,
              "square_meters_per_municipality": 800000
            }
          ]
        },
        {
          "name": "Valverde",
          "ISO_CODE": "DO-27",
          "id": "newID88",
          "filtered": false,
          "disabled": false,
          "type": "province",
          "municipalities": [
            {
              "name": "Mao",
              "id": "newID89",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 700,
              "square_meters_per_municipality": 1400000
            },
            {
              "name": "Esperanza",
              "id": "newID90",
              "filtered": false,
              "disabled": false,
              "type": "municipality",
              "quantity_of_parcels_per_municipality": 500,
              "square_meters_per_municipality": 1000000
            }
          ]
        }

      ]
    }
  ]




  databymonths = [
    { mes: 'Enero', pacelas: 2456, metros: 352355 },
    { mes: 'Febrero', pacelas: 2453, metros: 3557467 },
    { mes: 'Marzo', pacelas: 353, metros: 5675675 },
    { mes: 'Abril', pacelas: 2456, metros: 796969 },
    { mes: 'Mayo', pacelas: 353, metros: 4567547 },
  ]





  dataOwner = [
    {
        "name": "Consejo Estatal del Azúcar (CEA)",
        "parcelCount": 150,
        "squareMeters": 600000,
        "tareas": 954.1074324968992,
        "id": "asdhiurajds",
        "filtered": false
    },
    {
        "name": "Dirección General de Bienes Nacionales",
        "parcelCount": 100,
        "squareMeters": 200000,
        "tareas": 317.03637299059865,
        "id": "bnajsdilfla",
        "filtered": false
    },
    {
        "name": "Estado Dominicano",
        "parcelCount": 12432,
        "squareMeters": 23455674674.23,
        "tareas": 37250182.074815,
        "id": "edklweurlds",
        "filtered": false
    },
    {
        "name": "Ministerio de Educación",
        "parcelCount": 280,
        "squareMeters": 300000,
        "tareas": 476.554470064199,
        "id": "meoiurwefls",
        "filtered": false
    },
    {
        "name": "Ministerio de Medio Ambiente y Recursos Naturales",
        "parcelCount": 70,
        "squareMeters": 450000,
        "tareas": 714.8317050962986,
        "id": "mmarnwerioa",
        "filtered": false
    },
    {
        "name": "Ministerio de Defensa",
        "parcelCount": 200,
        "squareMeters": 800000,
        "tareas": 1274.81258710453,
        "id": "mdlasdkfjae",
        "filtered": false
    },
    {
        "name": "Ministerio de Obras Públicas y Comunicaciones",
        "parcelCount": 90,
        "squareMeters": 220000,
        "tareas": 350.7396102896585,
        "id": "mopcweurlsd",
        "filtered": false
    },
    {
        "name": "Ministerio de Turismo",
        "parcelCount": 50,
        "squareMeters": 120000,
        "tareas": 191.0122840256796,
        "id": "mtlweirucae",
        "filtered": false
    },
    {
        "name": "Instituto Agrario Dominicano (IAD)",
        "parcelCount": 120,
        "squareMeters": 350000,
        "tareas": 556.2053306598321,
        "id": "iadlsaeiruq",
        "filtered": false
    },
    {
        "name": "Banco Agrícola de la República Dominicana",
        "parcelCount": 80,
        "squareMeters": 500000,
        "tareas": 794.2574501069985,
        "id": "bardalskdfj",
        "filtered": false
    },
    {
        "name": "Ingenio Barahona",
        "parcelCount": 40,
        "squareMeters": 230000,
        "tareas": 365.7584274486428,
        "id": "iblaesriuwo",
        "filtered": false
    },
    {
        "name": "Ingenio Boca Chica",
        "parcelCount": 30,
        "squareMeters": 210000,
        "tareas": 333.5865293564875,
        "id": "ibclaskdjfa",
        "filtered": false
    },
    {
        "name": "Ingenio Consuelo",
        "parcelCount": 35,
        "squareMeters": 180000,
        "tareas": 285.933648039299,
        "id": "icljasdiuwe",
        "filtered": false
    },
    {
        "name": "Ingenio Cristóbal Colón",
        "parcelCount": 45,
        "squareMeters": 250000,
        "tareas": 397.1287250534993,
        "id": "iccljdsaforu",
        "filtered": false
    },
    {
        "name": "Ingenio Monte Llano",
        "parcelCount": 25,
        "squareMeters": 150000,
        "tareas": 238.2772350320995,
        "id": "imllweuifos",
        "filtered": false
    },
    {
        "name": "Ingenio Porvenir",
        "parcelCount": 20,
        "squareMeters": 160000,
        "tareas": 254.82238736889547,
        "id": "iplwierufld",
        "filtered": false
    },
    {
        "name": "Ingenio Central Río Haina",
        "parcelCount": 55,
        "squareMeters": 260000,
        "tareas": 414.6748416792992,
        "id": "icrhlaweuid",
        "filtered": false
    }
];


  


  constructor() { }
}
