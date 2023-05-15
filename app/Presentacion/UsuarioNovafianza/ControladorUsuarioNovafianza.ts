/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioUsuarioNovafianza } from 'App/Dominio/Datos/Servicios/ServicioUsuarioNovafianza'
import { GeneradorContrasena } from 'App/Dominio/GenerarContrasena/GenerarContrasena'
import { EncriptadorAdonis } from 'App/Infraestructura/Encriptacion/EncriptadorAdonis'
import { RepositorioUsuarioNovafianzaDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioUsuarioNovafianzaDB'
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis'

export default class ControladorUsuarioNovafianza {
  private service: ServicioUsuarioNovafianza
  constructor () {
    this.service = new ServicioUsuarioNovafianza(
      new RepositorioUsuarioNovafianzaDB(), 
      new GeneradorContrasena(), 
      new EncriptadorAdonis(),
      new EnviadorEmailAdonis()
    )
  }

  public async listar ({ params }) {
    const usuariosNovafianza = await this.service.obtenerUsuariosNovafianza(params)
    return usuariosNovafianza
  }

  public async obtenerUsuarioNovafianzaPorId ({ params }) {
    const usuarioNovafianza = await this.service.obtenerUsuarioNovafianzaPorId(params.id)
    return usuarioNovafianza
  }

  public async obtenerUsuarioNovafianzaPorUsuario ({ request }:HttpContextContract) {
    const usuarioNovafianza = await this.service.obtenerUsuarioNovafianzaPorUsuario(request.param('usuario'))
    return usuarioNovafianza
  }

  public async actualizarUsuarioNovafianza ({ params, request }) {
    const dataUsuarioNovafianza = request.all()
    const usuarioNovafianza = await this.service.actualizarUsuarioNovafianza(params.id, dataUsuarioNovafianza)
    return usuarioNovafianza
  }

  public async guardarUsuarioNovafianza ({ request }) {
    const dataUsuarioNovafianza = request.all()
    const usuarioNovafianza = await this.service.guardarUsuarioNovafianza(dataUsuarioNovafianza)
    return usuarioNovafianza
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
