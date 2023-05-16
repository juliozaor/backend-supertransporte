import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TblFuncionalidades from 'App/Infraestructura/Datos/Entidad/Autorizacion/Submodulo'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await TblFuncionalidades.createMany([
      {
        id: '001',
        nombre: 'crear',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '002',
        nombre: 'leer',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '003',
        nombre: 'actualizar',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '004',
        nombre: 'eliminar',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
    ])
  }
}
