/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioMascara } from 'App/Dominio/Datos/Servicios/ServicioMascara'
import { RepositorioMascaraDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioMascaraDB'

export default class ControladorMascara {
  private service: ServicioMascara
  constructor () {
    this.service = new ServicioMascara(new RepositorioMascaraDB())
  }

  public async listar ({ params }) {
    const empresa = await this.service.obtenerMascaras(params)
    return empresa
  }

  public async obtenerMascaraPorId ({ params }) {
    const empresa = await this.service.obtenerMascaraPorId(params.id)
    return empresa
  }

  public async actualizarMascara ({ params, request }) {
    const dataEmpresa = request.all()
    const empresa = await this.service.actualizarMascara(params.id, dataEmpresa)
    return empresa
  }

  public async guardarMascara ({ request }) {
    const dataEmpresa = request.all()
    const empresa = await this.service.guardarMascara(dataEmpresa)
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
