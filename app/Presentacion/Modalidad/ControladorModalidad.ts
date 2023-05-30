/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioModalidad } from 'App/Dominio/Datos/Servicios/ServicioModalidad'
import { RepositorioModalidadDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioModalidadesDB'

export default class ControladorModalidad {
  private service: ServicioModalidad
  constructor () {
    this.service = new ServicioModalidad(new RepositorioModalidadDB())
  }

public async listar ({ request }) {
    const modalidades = await this.service.obtenerModalidades()
    return modalidades
  }

  public async filtro ({ request }:HttpContextContract) {    
    const filtros = await this.service.filtros(request.input('idUsuario'))
    return filtros
  }

}
