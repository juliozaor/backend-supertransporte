import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DateTime } from 'luxon'
import TblTiposPregunta from 'App/Infraestructura/Datos/Entidad/TiposPregunta'
import { v4 } from 'uuid'


export default class extends BaseSeeder {
  public async run () {
    await TblTiposPregunta.createMany([
      {
          id: 1,
            nombre: 'SELECT',
            opciones: undefined,
          validaciones: undefined,
          estado:true
        },{
          id: 2,
            nombre: 'NUMERICO',
            opciones: undefined,
          validaciones: undefined,
          estado:true
        }
    ])
  }
}
