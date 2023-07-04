import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TblMotivos from 'App/Infraestructura/Datos/Entidad/Motivo'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await TblMotivos.createMany([
      {
        id: 1,
        descripcion: 'No es vigilado de la Superintendencia de Transporte.'
      },
      {
        id: 2,
        descripcion: 'La autoridad competente para la verificación del PESV no es la Superintendencia de Transporte.'
      },
      {
        id: 3,
        descripcion: 'No aplica al nivel de diseño e implementación del PESV categorizado para la organización.'
      },
      {
        id: 4,
        descripcion: 'No existe obligación de presentar la información.'
      },
      {
        id: 5,
        descripcion: 'Desconocimiento de la fecha límite para el diseño e implementación del PESV.'
      },
      {
        id: 6,
        descripcion: 'Desconocimiento de los lineamientos de la Resolución 40595 de 2022 y demás normatividad aplicable.'
      },
      {
        id: 7,
        descripcion: 'Presentó PQR por problemas en el cargue de la evidencia, pero no fue contestada.'
      },
      {
        id: 8,
        descripcion: 'Remitió la información a través de correo electrónico.'
      },
      {
        id: 9,
        descripcion: 'Voluntariamente no entregó lo solicitado.'
      },
      {
        id: 10,
        descripcion: 'Desconocimiento de las líneas de atención dispuestas por la Entidad.'
      }

    ])
  }
}
