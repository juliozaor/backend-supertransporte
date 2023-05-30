import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import tiposCategorias from 'App/Infraestructura/Datos/Entidad/TipoCategoria'


export default class extends BaseSeeder {
  public async run () {
    await tiposCategorias.createMany([
      {
          id: 1,
            nombre: 'Conductores',
            orden: 1
        },{
          id: 2,
            nombre: 'vehículos',
            orden: 2
        }
    ])
  }
}
