import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioEncuestas } from 'App/Dominio/Datos/Servicios/ServicioEncuestas'
import { RepositorioEncuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioEncuestasDB'
import { ServicioUsuario } from 'App/Dominio/Datos/Servicios/ServicioUsuario';
import { RepositorioUsuariosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB';

export default class ControladorEncuesta {
  private service: ServicioEncuestas
  constructor () {
    this.service = new ServicioEncuestas(
      new RepositorioEncuestasDB(),
      new ServicioUsuario( new RepositorioUsuariosDB())
    )
  }

  public async listarReportadas ({ request }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const Encuestas = await this.service.obtenerReportadas(request.all(), payload)
    return Encuestas
  }

  public async visualizar ({ request }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const Encuestas = await this.service.visualizar(request.all(), payload)
    return Encuestas
  }


}
