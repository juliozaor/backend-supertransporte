/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioIndicadores } from 'App/Dominio/Datos/Servicios/ServicioIndicadores'
import { RepositorioIndicadoresDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioIndicadoresDB'
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB' */

export default class ControladorReporte {
  private service: ServicioIndicadores
  constructor() {
    this.service = new ServicioIndicadores(
      new RepositorioIndicadoresDB()
    )
  }


  public async formularios({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const encuestas = await this.service.visualizar(request.all(), payload)
    return encuestas
  }


  public async respuestas({ request, response }: HttpContextContract) {
    /*   response.status(200).send({
      mensaje: "Formulario guardado correctamente"
    })  */
    const payload = await request.obtenerPayloadJWT()
    const respuesta = await this.service.guardar(JSON.stringify(request.all()), payload)

    response.status(200).send(respuesta)
  }

  public async enviar({ request, response }: HttpContextContract) {
    /* response.status(200).send({
      aprobado:true, faltantes:[]
  }) */ 
    const payload = await request.obtenerPayloadJWT()
    const enviado = await this.service.enviarSt(request.all(), payload)
    if (enviado && !enviado.aprobado) {
      return response.status(400).send(enviado)
    }
    return enviado
  }

  public async finalizarFaseDos({ params, response }: HttpContextContract){
    const {mes} = params
   return await this.service.finalizarFaseDos(mes)
  }


}
