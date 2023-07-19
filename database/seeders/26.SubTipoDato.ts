import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblSubTipoDatos } from 'App/Infraestructura/Datos/Entidad/SubTipoDato'
export default class extends BaseSeeder {
  public async run() {
    await TblSubTipoDatos.createMany([
      {
        id: 1,
        nombre: 'real',
        tipoId: 2,
        decimales: 1
      },
      {
        id: 2,
        nombre: 'entero',
        tipoId: 2,
        decimales: 0
      },
      {
        id: 3,
        nombre: 'pdf',
        tipoId: 1,
        decimales: 0
      },
      {
        id: 4,
        nombre: 'excel',
        tipoId: 1,
        decimales: 0
      },
      {
        id: 5,
        nombre: 'winrar',
        tipoId: 1,
        decimales: 0
      },
      {
        id: 6,
        nombre: 'texto',
        tipoId: 3,
        decimales: 0
      }

    ])
  }
}
