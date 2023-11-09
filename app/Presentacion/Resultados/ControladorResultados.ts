/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioResultados } from 'App/Dominio/Datos/Servicios/ServicioResultados'
import { RepositorioResultadosDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioResultadosDB'

export default class ControladorRespuesta {
  private service: ServicioResultados
  constructor () {
    this.service = new ServicioResultados(
      new RepositorioResultadosDB(),
    )
  }

  public async resultado ({ request, response, params }:HttpContextContract) {
  /*   if(!idIndicador){
        response.status(400).send({
          mensaje: "El id de indicador es necesario"
        })

    } */
    const payload = await request.obtenerPayloadJWT()
    const respuesta = await this.service.generar(JSON.stringify(request.all()), payload )
    response.status(200).send(respuesta) 
  }


}
