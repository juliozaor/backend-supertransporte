/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioArchivoEmpresa } from 'App/Dominio/Datos/Servicios/ServicioArchivoEmpresa'
import { RepositorioArchivoEmpresaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioArchivoEmpresaDB'
import { validadorArchivosEmpresa } from './Validadores/ValidadorArchivosEmpresa'

export default class ControladorArchivoEmpresa {
  private service: ServicioArchivoEmpresa
  constructor () {
    this.service = new ServicioArchivoEmpresa(new RepositorioArchivoEmpresaDB())
  }

  public async listarPorEmpresa({ request, response }:HttpContextContract){
    const idEmpresa = request.param('idEmpresa')
    const archivosEmpresa = await this.service.obtenerArchivosPorEmpresa(idEmpresa)
    response.status(200).send(archivosEmpresa)
  }

  public async listar ({ params }) {
    const archivosEmpresas = await this.service.obtenerArchivosEmpresas(params)
    return archivosEmpresas
  }

  public async obtenerArchivoEmpresaPorId ({ params }: HttpContextContract) {
    const archivoEmpresa = await this.service.obtenerArchivoEmpresaPorId(params.id)
    return archivoEmpresa
  }

  public async actualizarArchivoEmpresa ({ params, request }: HttpContextContract) {
    const dataArchivoEmpresa = request.all() as any
    const archivoEmpresa= await this.service.actualizarArchivoEmpresa(params.id, dataArchivoEmpresa)
    return archivoEmpresa
  }

  public async guardarArchivoEmpresa ({ request }) {
    const dataArchivoEmpresa = request.all()
    const archivoEmpresa = await this.service.guardarArchivoEmpresa(dataArchivoEmpresa)
    return archivoEmpresa
  }

  public async guardarMultiplesArchivosEmpresa({ request, response }: HttpContextContract){
    const { idArchivos, idEmpresa } = await request.validate({ schema: validadorArchivosEmpresa })
    await this.service.guardarArchivosEmpresa(idArchivos, idEmpresa)
    response.status(204).send(undefined)
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
