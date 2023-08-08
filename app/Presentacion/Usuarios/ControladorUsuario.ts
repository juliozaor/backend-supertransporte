/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioUsuarios } from 'App/Dominio/Datos/Servicios/ServicioUsuarios'
import { GeneradorContrasena } from 'App/Dominio/GenerarContrasena/GenerarContrasena'
import { EncriptadorAdonis } from 'App/Infraestructura/Encriptacion/EncriptadorAdonis'
import { RepositorioUsuariosDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB'
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis'

export default class ControladorUsuario {
  private service: ServicioUsuarios
  constructor () {
    this.service = new ServicioUsuarios(
      new RepositorioUsuariosDB(), 
      new GeneradorContrasena(), 
      new EncriptadorAdonis(),
      new EnviadorEmailAdonis()
    )
  }

  public async listar ({ request }:HttpContextContract) {
    const usuarios = await this.service.obtenerUsuarios(request.all())
    return usuarios
  }

  public async obtenerUsuarioPorId ({ params }) {
    const usuario = await this.service.obtenerUsuarioPorId(params.id)
    return usuario
  }

  public async obtenerUsuarioPorUsuario ({ request }:HttpContextContract) {
    const usuario = await this.service.obtenerUsuarioPorUsuario(request.param('usuario'))
    return usuario
  }

  public async actualizarUsuario ({ params, request }) {
    const payload = await request.obtenerPayloadJWT()
    const dataUsuario = request.all()
    const usuario = await this.service.actualizarUsuario(params.id, dataUsuario, payload)
    return usuario
  }

  public async guardarUsuario ({ request }) {
    const dataUsuario = request.all()
    const payload = await request.obtenerPayloadJWT()
    const usuario = await this.service.guardarUsuario(dataUsuario, payload)
    return usuario
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
