/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioModalidad } from 'App/Dominio/Datos/Servicios/ServicioModalidad'
import { ServicioUsuario } from 'App/Dominio/Datos/Servicios/ServicioUsuario'
import { RepositorioModalidadDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioModalidadesDB'
import { RepositorioUsuariosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB'

export default class ControladorModalidad {
  private service: ServicioModalidad
  constructor () {
    this.service = new ServicioModalidad(
      new RepositorioModalidadDB(), 
      new ServicioUsuario( new RepositorioUsuariosDB() ))
    
  }

public async listar ({ request, response }:HttpContextContract) {
    const modalidades = await this.service.obtenerModalidades()
    response.status(200).send(modalidades);
  }

  public async filtro ({ request, response }:HttpContextContract) {   
    const payload = await request.obtenerPayloadJWT() 
    const filtros = await this.service.filtros(payload.documento)
    response.status(200).send(filtros);
  }

  public async crearActualizar ({ request, response }:HttpContextContract) {  
    const payload = await request.obtenerPayloadJWT() 
    const crearActualizar = await this.service.crearActualizar(payload.documento, JSON.stringify(request.all()))
    response.status(200).send(crearActualizar);
  }

}
