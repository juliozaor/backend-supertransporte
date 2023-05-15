/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioFormatoArchivo } from 'App/Dominio/Datos/Servicios/ServicioFormatoArchivo'
import { RepositorioFormatoArchivoDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioFormatoArchivoDB'

export default class ControladorFormatoArchivo {
  private service: ServicioFormatoArchivo
  constructor () {
    this.service = new ServicioFormatoArchivo(new RepositorioFormatoArchivoDB())
  }

  public async listar ({ params }) {
    const formatosArchivos = await this.service.obtenerFormatosArchivos(params)
    return formatosArchivos
  }

  public async obtenerFormatoArchivoPorId ({ params }) {
    const formatoArchivo = await this.service.obtenerFormatoArchivoPorId(params.id)
    return formatoArchivo
  }

  public async actualizarFormatoArchivo ({ params, request }) {
    const dataFormatoArchivo = request.all()
    const formatoArchivo = await this.service.actualizarFormatoArchivo(params.id, dataFormatoArchivo)
    return formatoArchivo
  }

  public async guardarFormatoArchivo ({ request }) {
    const dataFormatoArchivo = request.all()
    const formatoArchivo = await this.service.guardarFormatoArchivo(dataFormatoArchivo)
    return formatoArchivo
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
