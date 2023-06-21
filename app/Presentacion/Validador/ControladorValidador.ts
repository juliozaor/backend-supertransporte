/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB'
import { ServicioUsuario } from 'App/Dominio/Datos/Servicios/ServicioUsuario'
import { RepositorioUsuariosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB' */

export default class ControladorValidador {
/*   private service: ServicioRespuestas
  constructor () {
    this.service = new ServicioRespuestas(
      new RepositorioRespuestasDB(),
      new ServicioUsuario( new RepositorioUsuariosDB())
    )
  } */

  public async obtenerCorresponde () {
    return [{
      id: 1,
      nombre: 'Corresponde',
    },{
      id: 2,
      nombre: 'No corresponde',
    }]
  }

  public async obtenerCumple () {
    return [{
      id: 1,
      nombre: 'Cumple',
    },{
      id: 2,
      nombre: 'No cumple',
    }]
  }

}
