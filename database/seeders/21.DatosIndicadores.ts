import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblDatosIndicadores } from 'App/Infraestructura/Datos/Entidad/DatosIndicadores'
export default class extends BaseSeeder {
  public async run() {
    await TblDatosIndicadores.createMany([
      {
        nombre: 'Fatalidades primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 1,
        visible: false
      },
      {
        nombre: 'Heridos graves primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 2,
        visible: false
      },
      {
        nombre: 'Heridos leves primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 3,
        visible: false
      },
      {
        nombre: 'Choques simples primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 4,
        visible: false
      },
      {
        nombre: 'Kilómetros recorridos primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 5,
        visible: false
      },

      {
        nombre: 'Fatalidades segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 1,
        visible: true
      },
      {
        nombre: 'Heridos graves segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 2,
        visible: true
      },
      {
        nombre: 'Heridos leves segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 3,
        visible: true
      },
      {
        nombre: 'Choques simples segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 4,
        visible: true
      },
      {
        nombre: 'Kilómetros recorridos segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 5,
        visible: true
      },

      {
        nombre: 'Fatalidades tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 1,
        visible: true
      },
      {
        nombre: 'Heridos graves tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 2,
        visible: true
      },
      {
        nombre: 'Heridos leves tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 3,
        visible: true
      },
      {
        nombre: 'Choques simples tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 4,
        visible: true
      },
      {
        nombre: 'Kilómetros recorridos tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 5,
        visible: true
      },

      {
        nombre: 'Fatalidades cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 1,
        visible: true
      },
      {
        nombre: 'Heridos graves cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 2,
        visible: true
      },
      {
        nombre: 'Heridos leves cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 3,
        visible: true
      },
      {
        nombre: 'Choques simples cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 4,
        visible: true
      },
      {
        nombre: 'Kilómetros recorridos cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 5,
        visible: true
      }, {
        nombre: 'Costos directos de fatalidades primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 6,
        visible: false
      },
      {
        nombre: 'Costos indirectos de fatalidades primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 7,
        visible: false
      },
      {
        nombre: 'Costos directos de heridos graves primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 8,
        visible: false
      },
      {
        nombre: 'Costos indirectos de heridos graves primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 9,
        visible: false
      },
      {
        nombre: 'Costos directos de heridos leves primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 10,
        visible: false
      },
      {
        nombre: 'Costos indirectos de heridos leves primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 11,
        visible: false
      },
      {
        nombre: 'Costos directos de choques simples primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 12,
        visible: false
      },
      {
        nombre: 'Costos indirectos de choques simples primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 13,
        visible: false
      },

      {
        nombre: 'Costos directos de fatalidades segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 6,
        visible: true
      },
      {
        nombre: 'Costos indirectos de fatalidades segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 7,
        visible: true
      },
      {
        nombre: 'Costos directos de heridos graves segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 8,
        visible: true
      },
      {
        nombre: 'Costos indirectos de heridos graves segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 9,
        visible: true
      },
      {
        nombre: 'Costos directos de heridos leves segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 10,
        visible: true
      },
      {
        nombre: 'Costos indirectos de heridos leves segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 11,
        visible: true
      },
      {
        nombre: 'Costos directos de choques simples segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 12,
        visible: true
      },
      {
        nombre: 'Costos indirectos de choques simples segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 13,
        visible: true
      },

      {
        nombre: 'Costos directos de fatalidades tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 6,
        visible: true
      },
      {
        nombre: 'Costos indirectos de fatalidades tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 7,
        visible: true
      },
      {
        nombre: 'Costos directos de heridos graves tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 8,
        visible: true
      },
      {
        nombre: 'Costos indirectos de heridos graves tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 9,
        visible: true
      },
      {
        nombre: 'Costos directos de heridos leves tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 10,
        visible: true
      },
      {
        nombre: 'Costos indirectos de heridos leves tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 11,
        visible: true
      },
      {
        nombre: 'Costos directos de choques simples tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 12,
        visible: true
      },
      {
        nombre: 'Costos indirectos de choques simples tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 13,
        visible: true
      },

      {
        nombre: 'Costos directos de fatalidades cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 6,
        visible: true
      },
      {
        nombre: 'Costos indirectos de fatalidades cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 7,
        visible: true
      },
      {
        nombre: 'Costos directos de heridos graves cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 8,
        visible: true
      },
      {
        nombre: 'Costos indirectos de heridos graves cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 9,
        visible: true
      },
      {
        nombre: 'Costos directos de heridos leves cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 10,
        visible: true
      },
      {
        nombre: 'Costos indirectos de heridos leves cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 11,
        visible: true
      },
      {
        nombre: 'Costos directos de choques simples cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 12,
        visible: true
      },
      {
        nombre: 'Costos indirectos de choques simples cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 13,
        visible: true
      }, {
        nombre: 'Cantidad de riesgos identificados al inicio del año anual',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 14,
        visible: true
      },
      {
        nombre: 'Cantidad de riesgos identificados al final del año anual',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 15,
        visible: true
      },
      {
        nombre: 'Cantidad de riesgos con valoración alta identificados al inicio del año anual',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 16,
        visible: true
      },
      {
        nombre: 'Cantidad de riesgos con valoración alta identificados al final del año anual',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 17,
        visible: true
      }, {
        nombre: 'Cantidad de metas definidas primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 18,
        visible: false
      },
      {
        nombre: 'Cantidad de metas alcanzadas o logradas primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 19,
        visible: false
      },
      {
        nombre: 'Actividades programadas a partir del plan anual de trabajo PESV primer trimestre ',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 20,
        visible: false
      },
      {
        nombre: 'Actividades ejecutadas a partir del plan anual de trabajo PESV primer trimestre ',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 21,
        visible: false
      },

      {
        nombre: 'Cantidad de metas definidas segundo trimestre ',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 18,
        visible: true
      },
      {
        nombre: 'Cantidad de metas alcanzadas o logradas segundo trimestre ',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 19,
        visible: true
      },
      {
        nombre: 'Actividades programadas a partir del plan anual de trabajo PESV segundo trimestre ',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 20,
        visible: true
      },
      {
        nombre: 'Actividades ejecutadas a partir del plan anual de trabajo PESV segundo trimestre ',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 21,
        visible: true
      },

      {
        nombre: 'Cantidad de metas definidas tercer trimestre ',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 18,
        visible: true
      },
      {
        nombre: 'Cantidad de metas alcanzadas o logradas tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 19,
        visible: true
      },
      {
        nombre: 'Actividades programadas a partir del plan anual de trabajo PESV tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 20,
        visible: true
      },
      {
        nombre: 'Actividades ejecutadas a partir del plan anual de trabajo PESV tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 21,
        visible: true
      },

      {
        nombre: 'Cantidad de metas definidas cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 18,
        visible: true
      },
      {
        nombre: 'Cantidad de metas alcanzadas o logradas cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 19,
        visible: true
      },
      {
        nombre: 'Actividades programadas a partir del plan anual de trabajo PESV cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 20,
        visible: true
      },
      {
        nombre: 'Actividades ejecutadas a partir del plan anual de trabajo PESV cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 21,
        visible: true
      },





    ])
  }
}
