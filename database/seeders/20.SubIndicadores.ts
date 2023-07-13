import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblSubIndicadores } from 'App/Infraestructura/Datos/Entidad/SubIndicadores'
export default class extends BaseSeeder {
  public async run() {
    await TblSubIndicadores.createMany([
      {
        id: 1,
        nombre: "Fatalidades",
        codigo: "1.1",
        orden: 1,
        indicadorId: 1,
        formularioId: 1,
        periodoId: 1
      }, {
        id: 2,
        nombre: "Heridos graves",
        codigo: "1.2",
        orden: 2,
        indicadorId: 1,
        formularioId: 1,
        periodoId: 1
      }, {
        id: 3,
        nombre: "Heridos leves",
        codigo: "1.3",
        orden: 3,
        indicadorId: 1,
        formularioId: 1,
        periodoId: 1
      }, {
        id: 4,
        nombre: "Choques simples",
        codigo: "1.4",
        orden: 4,
        indicadorId: 1,
        formularioId: 1,
        periodoId: 1
      }, {
        id: 5,
        nombre: "Kilómetros recorridos",
        codigo: "1.5",
        orden: 5,
        indicadorId: 1,
        formularioId: 3,
        periodoId: 1
      }

      , {
        id: 6,
        nombre: "Costos directos de fatalidades",
        codigo: "2.1",
        orden: 6,
        indicadorId: 2,
        formularioId: 1,
        periodoId: 2
      }, {
        id: 7,
        nombre: "Costos indirectos de fatalidades",
        codigo: "2.2",
        orden: 7,
        indicadorId: 2,
        formularioId: 1,
        periodoId: 2
      }, {
        id: 8,
        nombre: "Costos directos de heridos graves",
        codigo: "2.3",
        orden: 8,
        indicadorId: 2,
        formularioId: 1,
        periodoId: 2
      }, {
        id: 9,
        nombre: "Costos indirectos de heridos graves",
        codigo: "2.4",
        orden: 9,
        indicadorId: 2,
        formularioId: 1,
        periodoId: 2
      }, {
        id: 10,
        nombre: "Costos directos de heridos leves",
        codigo: "2.5",
        orden: 10,
        indicadorId: 2,
        formularioId: 1,
        periodoId: 2
      }, {
        id: 11,
        nombre: "Costos indirectos de heridos leves",
        codigo: "2.6",
        orden: 11,
        indicadorId: 2,
        formularioId: 1,
        periodoId: 2
      }, {
        id: 12,
        nombre: "Costos directos de choques simples",
        codigo: "2.7",
        orden: 12,
        indicadorId: 2,
        formularioId: 1,
        periodoId: 2
      }, {
        id: 13,
        nombre: "Costos indirectos de choques simples",
        codigo: "2.8",
        orden: 13,
        indicadorId: 2,
        formularioId: 1,
        periodoId: 2
      }, {
        id: 14,
        nombre: "Cantidad de riesgos identificados al inicio del año",
        codigo: "3.1",
        orden: 14,
        indicadorId: 3,
        formularioId: 2,
        periodoId: 3
      }, {
        id: 15,
        nombre: "Cantidad de riesgos identificados al final del año",
        codigo: "3.2",
        orden: 15,
        indicadorId: 3,
        formularioId: 2,
        periodoId: 3
      }, {
        id: 16,
        nombre: "Cantidad de riesgos con valoración alta identificados al inicio del año",
        codigo: "3.3",
        orden: 16,
        indicadorId: 3,
        formularioId: 2,
        periodoId: 3
      }, {
        id: 17,
        nombre: "Cantidad de riesgos con valoración alta identificados al final del año",
        codigo: "3.4",
        orden: 17,
        indicadorId: 3,
        formularioId: 2,
        periodoId: 3
      }, {
        id: 18,
        nombre: "Cantidad de metas definidas",
        codigo: "4.1",
        orden: 18,
        indicadorId: 4,
        formularioId: 2,
        periodoId: 4
      }, {
        id: 19,
        nombre: "Cantidad de metas alcanzadas o logradas",
        codigo: "4.2",
        orden: 19,
        indicadorId: 4,
        formularioId: 2,
        periodoId: 4
      }, {
        id: 20,
        nombre: "Actividades programadas a partir del plan anual de trabajo PESV",
        codigo: "5.1",
        orden: 20,
        indicadorId: 5,
        formularioId: 2,
        periodoId: 4
      }, {
        id: 21,
        nombre: "Actividades ejecutadas a partir del plan anual de trabajo PESV",
        codigo: "5.2",
        orden: 21,
        indicadorId: 5,
        formularioId: 2,
        periodoId: 4
      }, {
        id: 22,
        nombre: "Excesos en la jornada diaria de trabajo de los conductores",
        codigo: "6.1",
        orden: 22,
        indicadorId: 6,
        formularioId: 3,
        periodoId: 5
      }, {
        id: 23,
        nombre: "Total de días trabajados por todos los conductores",
        codigo: "6.2",
        orden: 23,
        indicadorId: 6,
        formularioId: 3,
        periodoId: 5
      }, {
        id: 24,
        nombre: "Vehículos propios incluidos en el programa",
        codigo: "7.1",
        orden: 24,
        indicadorId: 7,
        formularioId: 4,
        periodoId: 5
      },
      {
        id: 25,
        nombre: "Vehículos propios utilizados para desplazamientos laborales",
        codigo: "7.2",
        orden: 25,
        indicadorId: 7,
        formularioId: 4,
        periodoId: 5
      },
      {
        id: 26,
        nombre: "Vehículos de contratistas incluidos en el programa",
        codigo: "7.3",
        orden: 26,
        indicadorId: 7,
        formularioId: 4,
        periodoId: 5
      },
      {
        id: 27,
        nombre: "Vehículos de contratistas utilizados para desplazamientos laborales",
        codigo: "7.4",
        orden: 27,
        indicadorId: 7,
        formularioId: 4,
        periodoId: 5
      },
      {
        id: 28,
        nombre: "Vehículos de terceros incluidos en el programa",
        codigo: "7.5",
        orden: 28,
        indicadorId: 7,
        formularioId: 4,
        periodoId: 5
      },
      {
        id: 29,
        nombre: "Vehículos de terceros utilizados para desplazamientos laborales",
        codigo: "7.6",
        orden: 29,
        indicadorId: 7,
        formularioId: 4,
        periodoId: 5
      },
      {
        id: 30,
        nombre: "Desplazamientos laborales con exceso de velocidad",
        codigo: "8.1",
        orden: 30,
        indicadorId: 8,
        formularioId: 3,
        periodoId: 5
      },
      {
        id: 31,
        nombre: "Número total de desplazamientos laborales",
        codigo: "8.2",
        orden: 31,
        indicadorId: 8,
        formularioId: 3,
        periodoId: 5
      },
      {
        id: 32,
        nombre: "Promedio de vehículos inspeccionados diariamente",
        codigo: "9.1",
        orden: 32,
        indicadorId: 9,
        formularioId: 4,
        periodoId: 5
      },
      {
        id: 33,
        nombre: "Promedio de vehículos que operan diariamente",
        codigo: "9.2",
        orden: 33,
        indicadorId: 9,
        formularioId: 4,
        periodoId: 5
      },
      {
        id: 34,
        nombre: "Actividades de mantenimiento programadas a los vehículos con los cuales se presta el servicio",
        codigo: "10.1",
        orden: 34,
        indicadorId: 10,
        formularioId: 4,
        periodoId: 4
      },
      {
        id: 35,
        nombre: "Actividades de mantenimiento ejecutadas a los vehículos con los cuales se presta el servicio",
        codigo: "10.2",
        orden: 35,
        indicadorId: 10,
        formularioId: 4,
        periodoId: 4
      },
      {
        id: 36,
        nombre: "Capacitaciones en seguridad vial programadas",
        codigo: "11.1",
        orden: 36,
        indicadorId: 11,
        formularioId: 2,
        periodoId: 4
      },
      {
        id: 37,
        nombre: "Capacitaciones en seguridad vial programadas",
        codigo: "11.2",
        orden: 37,
        indicadorId: 11,
        formularioId: 2,
        periodoId: 4
      },
      {
        id: 38,
        nombre: "Colaboradores capacitados en seguridad vial",
        codigo: "12.1",
        orden: 38,
        indicadorId: 12,
        formularioId: 2,
        periodoId: 4
      },
      {
        id: 39,
        nombre: "Colaboradores de la organización",
        codigo: "12.2",
        orden: 39,
        indicadorId: 12,
        formularioId: 2,
        periodoId: 4
      },
      {
        id: 40,
        nombre: "No conformidades identificadas y analizadas",
        codigo: "13.1",
        orden: 40,
        indicadorId: 13,
        formularioId: 2,
        periodoId: 6
      }
      ,
      {
        id: 41,
        nombre: "No conformidades gestionadas y cerradas",
        codigo: "13.2",
        orden: 41,
        indicadorId: 13,
        formularioId: 2,
        periodoId: 6
      }



    ])
  }
}
