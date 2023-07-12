import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblFormulariosIndicadores } from 'App/Infraestructura/Datos/Entidad/FormularioIndicadores'
export default class extends BaseSeeder {
  public async run() {
    await TblFormulariosIndicadores.createMany([
      {
        id: 1,
        nombre: "A. Formulario sobre siniestros"
      },{
        id: 2,
        nombre: "B. Formulario Administrativo"
      },{
        id: 3,
        nombre: "C. Formulario sobre accidentes"
      },{
        id: 4,
        nombre: "D. Formulario Vehículos"
      }

     
    ])
  }
}
