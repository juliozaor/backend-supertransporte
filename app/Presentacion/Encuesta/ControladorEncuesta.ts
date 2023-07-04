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
    const encuestas = await this.service.obtenerReportadas(request.all(), payload)
    return encuestas
  }

  public async visualizar ({ request }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const encuestas = await this.service.visualizar(request.all(), payload)
    return encuestas
  }

  public async enviarSt ({ request, response }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const enviado = await this.service.enviarSt(request.all(), payload)
    if(enviado && !enviado.aprobado){
    return response.status(400). send(enviado)
    }
    return enviado
  }

  public async motivos () {
    const motivos = await this.service.obtenerMotivos()
    return motivos
  }

}
