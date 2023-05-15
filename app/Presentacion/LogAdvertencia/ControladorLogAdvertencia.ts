/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioLogAdvertencia } from 'App/Dominio/Datos/Servicios/ServicioLogAdvertencia'
import { RepositorioLogAdvertenciaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioLogAdvertenciaDB'

export default class ControladorLogAdvertencia {
  private service: ServicioLogAdvertencia
  constructor () {
    this.service = new ServicioLogAdvertencia(new RepositorioLogAdvertenciaDB())
  }

  public async listar ({ params }) {
    const logsAdvertencias = await this.service.obtenerLogsAdvertencias(params)
    return logsAdvertencias
  }

  public async obtenerLogAdvertenciaPorId ({ params }) {
    const logAdvertencia = await this.service.obtenerLogAdvertenciaPorId(params.id)
    return logAdvertencia
  }

  public async actualizarLogAdvertencia ({ params, request }) {
    const dataLogAdvertencia = request.all()
    const logAdvertencia = await this.service.actualizarLogAdvertencia(params.id, dataLogAdvertencia)
    return logAdvertencia
  }

  public async guardarLogAdvertencia ({ request }) {
    const dataLogAdvertencia = request.all()
    const logAdvertencia = await this.service.guardarLogAdvertencia(dataLogAdvertencia)
    return logAdvertencia
  }

  public async cambiarEstado ({request, response}:HttpContextContract){
    try{
      let id = request.param('id')
      await this.service.cambiarEstado(id)
      response.status(200).send('Cambio realizado correctamente')
    } catch (e) {
      response.status(200).send(e)
    }
  }
}
