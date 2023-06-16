import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TblEstadoVigilado from 'App/Infraestructura/Datos/Entidad/EstadoVigilado'


export default class extends BaseSeeder {
  public async run() {
    await TblEstadoVigilado.createMany([
      {
        id: 1,
        nombre: 'Inactivo',
        descripcion: 'Logueado por primera vez en una encuesta determinada'
      },{
        id: 2,
        nombre: 'Inicio',
        descripcion: 'Cuando se crea el reporte de una encuesta determinada'
      },{
        id: 3,
        nombre: 'En proceso',
        descripcion: 'Cuando guarda la primera pregunta en una encuesta determinada'
      },{
        id: 4,
        nombre: 'Finalizado',
        descripcion: 'Cuando envía a la Super de transporte'
      }

    ])
  }
}
