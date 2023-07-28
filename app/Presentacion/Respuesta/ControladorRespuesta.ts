/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB'
import { ServicioUsuario } from 'App/Dominio/Datos/Servicios/ServicioUsuario'
import { RepositorioUsuariosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB'

export default class ControladorRespuesta {
  private service: ServicioRespuestas
  constructor () {
    this.service = new ServicioRespuestas(
      new RepositorioRespuestasDB(),
      new ServicioUsuario( new RepositorioUsuariosDB())
    )
  }

  public async guardar ({ request, response, params }:HttpContextContract) {
    const {idReporte} = params
    const payload = await request.obtenerPayloadJWT()
    const respuesta = await this.service.guardar(JSON.stringify(request.all()), idReporte, payload )
  /*   response.status(200).send({
      mensaje: "Encuesta guardada correctamente"
    }) */
    response.status(200).send(respuesta) 
  }

  public async verificar({ request }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    return this.service.verificar(JSON.stringify(request.all()), payload);
  }

  public async finalizar ({ request, response }:HttpContextContract) {   
    const payload = await request.obtenerPayloadJWT()
    const enviado = await this.service.finalizar(request.all(), payload)
    if(enviado && !enviado.aprobado){
      return response.status(400). send(enviado)
      }
      return enviado
  }

}
