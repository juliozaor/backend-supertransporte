import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblDatosIndicadores } from 'App/Infraestructura/Datos/Entidad/DatosIndicadores'
export default class extends BaseSeeder {
  public async run() {
    await TblDatosIndicadores.createMany([
      {
        nombre: 'Actividades de mantenimiento programadas a los vehículos con los cuales se presta el servicio primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 34,
        visible: true
      },
      {
        nombre: 'Actividades de mantenimiento ejecutadas a los vehículos con los cuales se presta el servicio primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 35,
        visible: true
      },
      {
        nombre: 'Capacitaciones en seguridad vial programadas primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 36,
        visible: true
      },
      {
        nombre: 'Capacitaciones en seguridad vial programadas primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 37,
        visible: true
      },
      {
        nombre: 'Colaboradores capacitados en seguridad vial primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 38,
        visible: true
      },
      {
        nombre: 'Colaboradores de la organización primer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 39,
        visible: true
      },

      {
        nombre: 'Actividades de mantenimiento programadas a los vehículos con los cuales se presta el servicio segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 34,
        visible: true
      },
      {
        nombre: 'Actividades de mantenimiento ejecutadas a los vehículos con los cuales se presta el servicio segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 35,
        visible: true
      },
      {
        nombre: 'Capacitaciones en seguridad vial programadas segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 36,
        visible: true
      },
      {
        nombre: 'Capacitaciones en seguridad vial programadas segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 37,
        visible: true
      },
      {
        nombre: 'Colaboradores capacitados en seguridad vial segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 38,
        visible: true
      },
      {
        nombre: 'Colaboradores de la organización segundo trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 39,
        visible: true
      },

      {
        nombre: 'Actividades de mantenimiento programadas a los vehículos con los cuales se presta el servicio tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 34,
        visible: true
      },
      {
        nombre: 'Actividades de mantenimiento ejecutadas a los vehículos con los cuales se presta el servicio tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 35,
        visible: true
      },
      {
        nombre: 'Capacitaciones en seguridad vial programadas tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 36,
        visible: true
      },
      {
        nombre: 'Capacitaciones en seguridad vial programadas tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 37,
        visible: true
      },
      {
        nombre: 'Colaboradores capacitados en seguridad vial tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 38,
        visible: true
      },
      {
        nombre: 'Colaboradores de la organización tercer trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 39,
        visible: true
      },

      {
        nombre: 'Actividades de mantenimiento programadas a los vehículos con los cuales se presta el servicio cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 34,
        visible: true
      },
      {
        nombre: 'Actividades de mantenimiento ejecutadas a los vehículos con los cuales se presta el servicio cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 35,
        visible: true
      },
      {
        nombre: 'Capacitaciones en seguridad vial programadas cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 36,
        visible: true
      },
      {
        nombre: 'Capacitaciones en seguridad vial programadas cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 37,
        visible: true
      },
      {
        nombre: 'Colaboradores capacitados en seguridad vial cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 38,
        visible: true
      },
      {
        nombre: 'Colaboradores de la organización cuarto trimestre',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 39,
        visible: true
      }, {
        nombre: 'No conformidades identificadas y analizadas anual',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 40,
        visible: true
      },
      {
        nombre: 'No conformidades gestionadas y cerradas anual',
        tipoId: 0,
        orden: 1,
        subIndicadorId: 41,
        visible: true
      }

    ])
  }
}
