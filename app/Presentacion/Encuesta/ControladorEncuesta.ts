/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioEncuestas } from 'App/Dominio/Datos/Servicios/ServicioEncuestas'
import { ServicioAutenticacionJWT } from '../../Dominio/Datos/Servicios/ServicioJWT';
import { RepositorioEncuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioEncuestasDB'

export default class ControladorEncuesta {
  private service: ServicioEncuestas
  constructor () {
    this.service = new ServicioEncuestas(
      new RepositorioEncuestasDB()
    )
  }

  public async listarReportadas ({ request }:HttpContextContract) {
    const Encuestas = await this.service.obtenerReportadas(request.all())
    return Encuestas
  }

  public async visualizar ({ request }:HttpContextContract) {
    const Encuestas = await this.service.visualizar(request.all())
    return Encuestas
  }


}
