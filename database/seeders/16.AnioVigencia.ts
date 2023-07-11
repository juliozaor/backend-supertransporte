import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblAnioVigencias } from 'App/Infraestructura/Datos/Entidad/AnioVigencia'
export default class extends BaseSeeder {
  public async run() {
    await TblAnioVigencias.createMany([
      {
        id: 1,
        anio: 2023
      }
    ])
  }
}
