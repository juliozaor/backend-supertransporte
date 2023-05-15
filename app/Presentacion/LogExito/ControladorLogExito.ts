/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioLogExito } from 'App/Dominio/Datos/Servicios/ServicioLogExito'
import { RepositorioLogExitoDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioLogExitoDB'

export default class ControladorLogExito {
  private service: ServicioLogExito
  constructor () {
    this.service = new ServicioLogExito(new RepositorioLogExitoDB())
  }

  public async listar ({ params }) {
    const logsExitos = await this.service.obtenerLogsExitos(params)
    return logsExitos
  }

  public async obtenerLogExitoPorId ({ params }) {
    const logExito = await this.service.obtenerLogExitoPorId(params.id)
    return logExito
  }

  public async actualizarLogExito ({ params, request }) {
    const dataLogExito = request.all()
    const logExito = await this.service.actualizarLogExito(params.id, dataLogExito)
    return logExito
  }

  public async guardarLogExito ({ request }) {
    const dataLogExito = request.all()
    const logExito = await this.service.guardarLogExito(dataLogExito)
    return logExito
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
