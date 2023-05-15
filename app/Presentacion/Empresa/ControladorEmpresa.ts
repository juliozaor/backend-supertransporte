/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioEmpresa } from 'App/Dominio/Datos/Servicios/ServicioEmpresa'
import { RepositorioEmpresaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioEmpresaDB'
import { esquemaEmpresa } from './Validadores/ValidadorEmpresa'
import { readFile } from 'fs/promises'
import { RepositorioFicheroLocal } from 'App/Infraestructura/Ficheros/RepositorioFicheroLocal'
import { MapeadorFicheroAdonis } from '../Mapeadores/MapeadorFicheroAdonis'
export default class ControladorEmpresa {

  static get inject(){
    return ['App/Dominio/Ficheros/RepositorioFichero']
  }

  private service: ServicioEmpresa
  constructor () {
    this.service = new ServicioEmpresa(new RepositorioEmpresaDB(), new RepositorioFicheroLocal())
  }

  public async listar ({ params }) {
    const empresa = await this.service.obtenerEmpresas(params)
    return empresa
  }

  public async obtenerEmpresaPorId ({ params }) {
    const empresa = await this.service.obtenerEmpresaPorId(params.id)
    return empresa
  }

  public async actualizarEmpresa ({ params, request }) {
    const dataEmpresa = request.all()
    const empresa = await this.service.actualizarEmpresa(params.id, dataEmpresa)
    return empresa
  }

  public async guardarEmpresa ({ request }:HttpContextContract) {
    const peticion = await request.validate({
      schema: esquemaEmpresa
    })
    const logo = peticion.logo ? await MapeadorFicheroAdonis.obtenerFichero(peticion.logo) : undefined
    const empresa = this.service.guardarEmpresa({
      nit: peticion.nit,
      nombre: peticion.nombre,
      convenio: peticion.convenio,
      logo: logo
    })
    return empresa
  }

  public async cambiarEstado ({request, response}:HttpContextContract){
    try{
      let id = request.param('id')
      await this.service.cambiarEstado(id)
      response.status(200).send('Cambio realizado correctamente')
    } catch (e) {
      response.status(500).send(e)
    }
  }

  public async buscar({ request, response }: HttpContextContract) {
    const archivos = await this.service.buscar(JSON.stringify(request.all()))

    if (Object.keys(archivos).length !== 0) {
      response.status(202).send(archivos)
    } else {
      response.status(400).send({ mensaje: 'Se presento un error al consultar las entidades' })
    }
  }
}
