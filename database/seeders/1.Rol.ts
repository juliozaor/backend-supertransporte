import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { v4 as uuid } from "uuid"
import TblRoles from 'App/Infraestructura/Datos/Entidad/Autorizacion/Rol'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await TblRoles.createMany([
      {
        id: '001',
        nombre: 'super',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '002',
        nombre: 'admin_novafianza',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '003',
        nombre: 'admin_cliente',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '004',
        nombre: 'usuario_operativo',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '005',
        nombre: 'consultor',
        estado: true,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      }

    ])
  }
}
