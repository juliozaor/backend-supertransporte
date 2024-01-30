import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TblEstadoEmpresa from 'App/Infraestructura/Datos/Entidad/EstadoEmpresa'


export default class extends BaseSeeder {
  public async run() {
    await TblEstadoEmpresa.createMany([
      {
        id: 3000,
        nombre: 'Inicio',
        descripcion: 'Cuando se crea el reporte de una encuesta determinada'
      },
      {
        id: 3001,
        nombre: 'Filtro Clasificación',
        descripcion: 'Consulto filtro para clasificacion'
      },{
        id: 3002,
        nombre: 'Guardar Clasificación',
        descripcion: 'Se guardo la clasificación'
      },{
        id: 3003,
        nombre: 'En proceso',
        descripcion: 'Cuando guarda la primera pregunta en una encuesta determinada'
      },{
        id: 3004,
        nombre: 'Finalizado',
        descripcion: 'Cuando envía a la Super de transporte'
      }

    ])
  }
}
