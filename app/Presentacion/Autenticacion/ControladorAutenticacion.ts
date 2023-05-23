import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioAutenticacion } from 'App/Dominio/Datos/Servicios/ServicioAutenticacion'
import { ServicioAutenticacionJWT } from 'App/Dominio/Datos/Servicios/ServicioJWT'
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis'
import { EncriptadorAdonis } from 'App/Infraestructura/Encriptacion/EncriptadorAdonis'
import { RepositorioAutorizacionDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioAutorizacionDB'
import { RepositorioBloqueoUsuarioDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioBloqueoUsuarioDB'
import { RepositorioUsuariosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB'

export default class ControladorArchivoVariable {
  private service: ServicioAutenticacion
  constructor () {
    this.service = new ServicioAutenticacion(
      new EncriptadorAdonis(),
      new EnviadorEmailAdonis(),
      new RepositorioBloqueoUsuarioDB(),
      new RepositorioAutorizacionDB(),
      new RepositorioUsuariosDB()
    )
  }

  public async inicioSesion ({ request }) {
    const peticion = request.all()
    const usuario = peticion['usuario']
    const contrasena = peticion['contrasena']
    const datos = await this.service.iniciarSesion(usuario, contrasena)
    return datos
  }

/*   public async inicioSesion ({ request, response }:HttpContextContract) {
    const peticion = request.all()
    const usuario = peticion['usuario']
    const contrasena = peticion['contrasena']
    response.status(200).send({
      token: ServicioAutenticacionJWT.generarToken(usuario, contrasena),
    })
  } */

  public async cambiarClave({request, response}:HttpContextContract){
    const peticion = await request.body()
    const identificacion = peticion.identificacion
    const clave = peticion.clave
    const nuevaClave = peticion.nuevaClave

    await this.service.cambiarClave(identificacion, clave, nuevaClave)
    response.status(200).send({
      mensaje: 'Su contraseña ha sido cambiada exitosamente',
      estado: 200
    })
  }
}
