/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioArchivoEmpresaFormato } from 'App/Dominio/Datos/Servicios/ServicioArchivoEmpresaFormato'
import { RepositorioArchivoEmpresaFormatoDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioArchivoEmpresaFormatoDB'

export default class ControladorArchivoVariable {
  private service: ServicioArchivoEmpresaFormato
  constructor () {
    this.service = new ServicioArchivoEmpresaFormato(new RepositorioArchivoEmpresaFormatoDB())
  }

  public async listar ({ params }) {
    const archivosEmpresasFormatos = await this.service.obtenerArchivosEmpresasFormatos(params)
    return archivosEmpresasFormatos
  }

  public async obtenerArchivoEmpresaFormatoPorId ({ params }) {
    const archivoEmpresaFormato = await this.service.obtenerArchivoEmpresaFormatoPorId(params.id)
    return archivoEmpresaFormato
  }

  public async actualizarArchivoEmpresaFormato ({ params, request }) {
    const dataArchivoEmpresaFormato = request.all()
    const archivoEmpresaFormato= await this.service.actualizarArchivoEmpresaFormato(params.id, dataArchivoEmpresaFormato)
    return archivoEmpresaFormato
  }

  public async guardarArchivoEmpresaFormato ({ request }) {
    const dataArchivoEmpresaFormato = request.all()
    const archivoEmpresaFormato = await this.service.guardarArchivoEmpresaFormato(dataArchivoEmpresaFormato)
    return archivoEmpresaFormato
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
