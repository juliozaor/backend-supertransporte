import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblMeses } from 'App/Infraestructura/Datos/Entidad/Mes'
export default class extends BaseSeeder {
  public async run() {
    await TblMeses.createMany([
      {
        id: 1,
        nombre: 'Enero'
      },
      {
        id: 2,
        nombre: 'Febrero'
      },
      {
        id: 3,
        nombre: 'Marzo'
      },
      {
        id: 4,
        nombre: 'Abril'
      },
      {
        id: 5,
        nombre: 'Mayo'
      },
      {
        id: 6,
        nombre: 'Junio'
      },
      {
        id: 7,
        nombre: 'Julio'
      },
      {
        id: 8,
        nombre: 'Agosto'
      },
      {
        id: 9,
        nombre: 'Septiembre'
      },
      {
        id: 10,
        nombre: 'Octubre'
      },
      {
        id: 11,
        nombre: 'Noviembre'
      },
      {
        id: 12,
        nombre: 'Diciembre'
      }

    ])
  }
}
