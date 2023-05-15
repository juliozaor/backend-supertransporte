/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioArchivoVariable } from 'App/Dominio/Datos/Servicios/ServicioArchivoVariable'
import { RepositorioArchivoVariableDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioArchivoVariableDB'

export default class ControladorArchivoVariable {
  private service: ServicioArchivoVariable
  constructor () {
    this.service = new ServicioArchivoVariable(new RepositorioArchivoVariableDB())
  }

  public async listar ({ params }) {
    const archivosVariables = await this.service.obtenerArchivosVariables(params)
    return archivosVariables
  }

  public async obtenerArchivoVariablePorId ({ params }) {
    const archivoVariable = await this.service.obtenerArchivoVariablePorId(params.id)
    return archivoVariable
  }

  public async actualizarArchivoVariable ({ params, request }) {
    const dataArchivoVariable = request.all()
    const archivoVariable= await this.service.actualizarArchivoVariable(params.id, dataArchivoVariable)
    return archivoVariable
  }

  public async guardarArchivoVariable ({ request }) {
    const dataArchivoVariable = request.all()
    const archivoVariable = await this.service.guardarArchivoVariable(dataArchivoVariable)
    return archivoVariable
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
