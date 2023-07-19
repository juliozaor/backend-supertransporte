import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblPeriodos } from 'App/Infraestructura/Datos/Entidad/Periodos'
export default class extends BaseSeeder {
  public async run() {
    await TblPeriodos.createMany([
      {
        id: 1,
        nombre: 'Trimestral',
        tipo:'real',
        decimal: 1
      }, {
        id: 2,
        nombre: 'Trimestral',
        tipo:'moneda',
        decimal: 1
      },{
        id: 3,
        nombre: 'Anual',
        tipo:'entero',
        decimal: 0
      }, {
        id: 4,
        nombre: 'Trimestral',
        tipo:'porcentaje',
        decimal: 1
      },{
        id: 5,
        nombre: 'Mensual',
        tipo:'porcentaje',
        decimal: 1
      },{
        id: 6,
        nombre: 'Anual',
        tipo:'porcentaje',
        decimal: 1
      },{
        id: 7,
        nombre: 'Trimestral',
        tipo:'archivo',
        decimal: 0
      }
    ])
  }
}
