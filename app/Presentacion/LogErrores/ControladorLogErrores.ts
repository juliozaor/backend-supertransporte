/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioLogErrores } from 'App/Dominio/Datos/Servicios/ServicioLogErrores'
import { RepositorioLogErroresDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioLogErroresDB'

export default class ControladorLogErrores {
  private service: ServicioLogErrores
  constructor () {
    this.service = new ServicioLogErrores(new RepositorioLogErroresDB())
  }

  public async listar ({ params }) {
    const logsErrores = await this.service.obtenerLogsErrores(params)
    return logsErrores
  }

  public async obtenerLogErroresPorId ({ params }) {
    const logErrores = await this.service.obtenerLogErroresPorId(params.id)
    return logErrores
  }

  public async actualizarLogErrores ({ params, request }) {
    const dataLogErrores = request.all()
    const logErrores = await this.service.actualizarLogErrores(params.id, dataLogErrores)
    return logErrores
  }

  public async guardarLogErrores ({ request }) {
    const dataLogErrores = request.all()
    const logErrores = await this.service.guardarLogErrores(dataLogErrores)
    return logErrores
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
