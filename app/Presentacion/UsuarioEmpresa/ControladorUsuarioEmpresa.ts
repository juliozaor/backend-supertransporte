import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioUsuarioEmpresa } from 'App/Dominio/Datos/Servicios/ServicioUsuarioEmpresa'
import { GeneradorContrasena } from 'App/Dominio/GenerarContrasena/GenerarContrasena'
import { EncriptadorAdonis } from 'App/Infraestructura/Encriptacion/EncriptadorAdonis'
import { RepositorioUsuarioEmpresaDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioUsuarioEmpresaDB'
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis'

export default class ControladorUsuarioEmpresa {
  private service: ServicioUsuarioEmpresa
  constructor () {
    this.service = new ServicioUsuarioEmpresa(
      new RepositorioUsuarioEmpresaDB(), 
      new GeneradorContrasena(), 
      new EncriptadorAdonis(),
      new EnviadorEmailAdonis()
    )
  }

  public async listar ({ params }) {
    const usuariosEmpresa = await this.service.obtenerUsuariosEmpresa(params)
    return usuariosEmpresa
  }

  public async obtenerUsuarioEmpresaPorId ({ params }) {
    const usuarioEmpresa = await this.service.obtenerUsuarioEmpresaPorId(params.id)
    return usuarioEmpresa
  }

  public async obtenerUsuarioEmpresaPorUsuario ({ request }:HttpContextContract) {
    const usuarioEmpresa = await this.service.obtenerUsuarioEmpresaPorUsuario(request.param('usuario'))
    return usuarioEmpresa
  }

  public async actualizarUsuarioEmpresa ({ params, request }) {
    const dataUsuarioEmpresa = request.all()
    const usuarioEmpresa = await this.service.actualizarUsuarioEmpresa(params.id, dataUsuarioEmpresa)
    return usuarioEmpresa
  }

  public async guardarUsuarioEmpresa ({ request }) {
    const dataUsuarioEmpresa = request.all()
    const usuarioEmpresa = await this.service.guardarUsuarioEmpresa(dataUsuarioEmpresa)
    return usuarioEmpresa
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

  public async obtenerUsuariosEmpresaPorIdEmpresa ({ params }) {
    const usuariosEmpresa = await this.service.obtenerUsuariosEmpresaPorIdEmpresa(params)
    return usuariosEmpresa
  }
}
