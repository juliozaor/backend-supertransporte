import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblTipoDatos } from 'App/Infraestructura/Datos/Entidad/TipoDato'
export default class extends BaseSeeder {
  public async run() {
    await TblTipoDatos.createMany([
      {
        id: 1,
        nombre: 'FILE'
      },
      {
        id: 2,
        nombre: 'NUMBER'
      },
      {
        id: 3,
        nombre: 'STRING'
      }

    ])
  }
}
