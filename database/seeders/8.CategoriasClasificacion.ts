import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CategoriaClasificacion from 'App/Infraestructura/Datos/Entidad/CategoriaClasificacion'


export default class extends BaseSeeder {
  public async run () {
    await CategoriaClasificacion.createMany([
      {
          id: 1,
            nombre: 'Tipo contratación',
            orden: 1,
            tipoCategoriaId:1
        },{
          id: 2,
            nombre: 'Rol en la vía',
            orden: 2,
            tipoCategoriaId:1
        },{
          id: 3,
            nombre: 'Tipo de servicio',
            orden: 3,
            tipoCategoriaId:2
        },{
          id: 4,
            nombre: 'Tipo de vehículo',
            orden: 4,
            tipoCategoriaId:2
        }
    ])
  }
}
