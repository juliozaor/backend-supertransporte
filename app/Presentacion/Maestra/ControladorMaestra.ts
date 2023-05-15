/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioMaestra } from 'App/Dominio/Datos/Servicios/ServicioMaestra'
import { RepositorioMaestraDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioMaestraDB'

export default class ControladorMaestra {
  private service: ServicioMaestra
  constructor () {
    this.service = new ServicioMaestra(new RepositorioMaestraDB())
  }

  public async listar ({ params }) {
    const empresa = await this.service.obtenerMaestras(params)
    return empresa
  }

  public async obtenerMaestraPorId ({ params }) {
    const empresa = await this.service.obtenerMaestraPorId(params.id)
    return empresa
  }

  public async actualizarMaestra ({ params, request }) {
    const dataEmpresa = request.all()
    const empresa = await this.service.actualizarMaestra(params.id, dataEmpresa)
    return empresa
  }

  public async guardarMaestra ({ request }) {
    const dataEmpresa = request.all()
    const empresa = await this.service.guardarMaestra(dataEmpresa)
    return empresa
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
