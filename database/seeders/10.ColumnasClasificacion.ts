import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ColumnaClasificacion from 'App/Infraestructura/Datos/Entidad/ColumnaClasificacion'


export default class extends BaseSeeder {
  public async run() {
    await ColumnaClasificacion.createMany([
      {
        id: 1,
        nombre: 'Total de conductores',
        orden: 1,
      },
      {
        id: 2,
        nombre: 'Eléctrico',
        orden: 2,
      },
      {
        id: 3,
        nombre: 'Gasolina',
        orden: 3,
      },
      {
        id: 4,
        nombre: 'Mécanica',
        orden: 4,
      },
      {
        id: 5,
        nombre: 'Híbrido',
        orden: 5,
      },

      {
        id: 6,
        nombre: 'ACPM',
        orden: 6,
      },
      {
        id: 7,
        nombre: 'Gas',
        orden: 7,
      },
      {
        id: 8,
        nombre: 'Cantidad  de vehículos activos',
        orden: 8,
      },
      {
        id: 9,
        nombre: 'Cantidad  de vehículos inactivos',
        orden: 9,
      },
      {
        id: 10,
        nombre: 'Cantidad de Vehículo',
        orden: 10,
      },
      {
        id: 11,
        nombre: 'Capacidad total pasajero',
        orden: 11,
      },

      {
        id: 12,
        nombre: 'Capacidad total de carga',
        orden: 12,
      }

    ])
  }
}
