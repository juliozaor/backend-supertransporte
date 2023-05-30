/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioRadioAccion } from 'App/Dominio/Datos/Servicios/ServicioRadioAccion'
import { RepositorioRadioAccionDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioRadioAccionDB'

export default class ControladorRadioAccion {
  private service: ServicioRadioAccion
  constructor () {
    this.service = new ServicioRadioAccion(new RepositorioRadioAccionDB())
  }

public async listar () {
    const radiosAccion = await this.service.obtenerRadiosAccion()
    return radiosAccion
  }


}
