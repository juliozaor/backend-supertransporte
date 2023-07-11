import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblIndicadores } from 'App/Infraestructura/Datos/Entidad/Indicadores'
export default class extends BaseSeeder {
  public async run() {
    await TblIndicadores.createMany([
      {
        id: 1,
        nombre: 'Tasa de siniestros viales por nivel de pérdida',
        descripcion:'Registro de siniestros viales ocurridos por trimestre y por nivel de perdida, medidos en forma acumulativa',
        codigo: '1'
      }
    ])
  }
}
