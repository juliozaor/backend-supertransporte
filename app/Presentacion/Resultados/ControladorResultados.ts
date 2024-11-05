/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioResultados } from 'App/Dominio/Datos/Servicios/ServicioResultados'
import { RepositorioResultadosDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioResultadosDB'

export default class ControladorResultados {
  service: ServicioResultados
  constructor () {
    this.service = new ServicioResultados(
      new RepositorioResultadosDB(),
    )
  }

  public async resultado ({ request, response, params }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const respuesta = await this.service.generar(JSON.stringify(request.all()), payload )
    response.status(200).send(respuesta) 
  }


}
