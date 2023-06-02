import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TblClasificaciones from 'App/Infraestructura/Datos/Entidad/Clasificaciones'


export default class extends BaseSeeder {
  public async run () {
    await TblClasificaciones.createMany([
      {
          id: 1,
            nombre: 'Básico',
            descripcion: 'Organizaciones con una flota de vehículos automotores o no automotores entre once (11) y diecinueve (19) unidades, o que contraten o administren entre dos (2) y diecinueve (19) conductores.',
            pasos:18
        },{
          id: 2,
            nombre: 'Estándar',
            descripcion: 'Organizaciones con una flota de vehículos automotores o no automotores entre veinte (20) y cincuenta (50) unidades o que contraten o administren entre veinte (20) y cincuenta (50) conductores.',
            pasos:18
        },{
          id: 3,
            nombre: 'Avanzado',
            descripcion: 'Organizaciones con una flota de vehículos automotores o no automotores superior a cincuenta (50) unidades o que contraten o administren más de cincuenta (50) ',
            pasos:18
        },{
          id: 4,
            nombre: 'Sin clasificar',
            descripcion: 'Organizaciones que no cuentan con la capacidad necesaria para ser clasificados',
            pasos:18
        }

    ])
  }
}
