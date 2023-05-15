/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioVariableTransversal } from 'App/Dominio/Datos/Servicios/ServicioVariableTransversal'
import { RepositorioVariableTransversalDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioVariableTransversalDB'

export default class ControladorVariableTransversal {
  private service: ServicioVariableTransversal
  constructor () {
    this.service = new ServicioVariableTransversal(new RepositorioVariableTransversalDB())
  }

  public async listar ({ params }) {
    const variablesTransversales = await this.service.obtenerVariablesTransversales(params)
    return variablesTransversales
  }

  public async obtenerVariableTransversalPorId ({ params }) {
    const variableTransversal = await this.service.obtenerVariableTransversalPorId(params.id)
    return variableTransversal
  }

  public async actualizarVariableTransversal ({ params, request }) {
    const dataVariableTransversal = request.all()
    const variableTransversal = await this.service.actualizarVariableTransversal(params.id, dataVariableTransversal)
    return variableTransversal
  }

  public async guardarVariableTransversal ({ request }) {
    const dataVariableTransversal = request.all()
    const variableTransversal = await this.service.guardarVariableTransversal(dataVariableTransversal)
    return variableTransversal
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
