/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioArchivo } from 'App/Dominio/Datos/Servicios/ServicioArchivo'
import { RepositorioArchivoDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioArchivoDB'
export default class ControladorArchivo {
  private service: ServicioArchivo
  constructor () {
    this.service = new ServicioArchivo(new RepositorioArchivoDB())
  }

  public async listar ({ params }) {
    const archivos = await this.service.obtenerArchivos(params)
    return archivos
  }

  public async obtenerArchivoPorId ({ params }) {
    const archivo = await this.service.obtenerArchivoPorId(params.id)
    return archivo
  }

  public async actualizarArchivo ({ params, request }) {
    const dataArchivo = request.all()
    const archivo = await this.service.actualizarArchivo(params.id, dataArchivo)
    return archivo
  }

  public async guardarArchivo ({ request }) {
    const dataArchivo = request.all()
    const archivo = await this.service.guardarArchivo(dataArchivo)
    return archivo
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

  public async buscar({ request, response }: HttpContextContract) {
    const archivos = await this.service.buscar(JSON.stringify(request.all()))

    if (Object.keys(archivos).length !== 0) {
      response.status(202).send(archivos)
    } else {
      response.status(400).send({ mensaje: 'Se presento un error al consultar los servicios' })
    }
  }
}
