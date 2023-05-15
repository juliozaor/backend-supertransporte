/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioVariableEspecifica } from 'App/Dominio/Datos/Servicios/ServicioVariableEspecifica'
import { RepositorioVariableEspecificaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioVariableEspecificaDB'

export default class ControladorVariableEspecifica {
  private service: ServicioVariableEspecifica
  constructor () {
    this.service = new ServicioVariableEspecifica(new RepositorioVariableEspecificaDB())
  }

  public async listar ({ params }) {
    const variablesEspecificas = await this.service.obtenerVariablesEspecificas(params)
    return variablesEspecificas
  }

  public async obtenerVariableEspecificaPorId ({ params }) {
    const variableEspecifica = await this.service.obtenerVariableEspecificaPorId(params.id)
    return variableEspecifica
  }

  public async actualizarVariableEspecifica ({ params, request }) {
    const dataVariableEspecifica = request.all()
    const variableEspecifica = await this.service.actualizarVariableEspecifica(params.id, dataVariableEspecifica)
    return variableEspecifica
  }

  public async guardarVariableEspecifica ({ request }) {
    const dataVariableEspecifica = request.all()
    const variableEspecifica = await this.service.guardarVariableEspecifica(dataVariableEspecifica)
    return variableEspecifica
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
