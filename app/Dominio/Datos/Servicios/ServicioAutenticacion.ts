/* eslint-disable max-len */
import { GeneradorContrasena } from 'App/Dominio/GenerarContrasena/GenerarContrasena'
import { ServicioUsuarioEmpresa } from './ServicioUsuarioEmpresa'
import { ServicioUsuarioNovafianza } from './ServicioUsuarioNovafianza'
import { ServicioAutenticacionJWT } from 'App/Dominio/Datos/Servicios/ServicioJWT'
import { Exception } from '@adonisjs/core/build/standalone'
import { RespuestaInicioSesion } from 'App/Dominio/Dto/RespuestaInicioSesion'
import { UsuarioEmpresa } from '../Entidades/UsuarioEmpresa'
import { UsuarioNovafianza } from '../Entidades/UsuarioNovafianza'
import { Encriptador } from 'App/Dominio/Encriptacion/Encriptador'
import { RepositorioBloqueoUsuario } from 'App/Dominio/Repositorios/RepositorioBloqueoUsuario'
import { RegistroBloqueo } from '../Entidades/Usuarios/RegistroBloqueo'
import { v4 as uuid } from 'uuid'
import { RepositorioAutorizacion } from 'App/Dominio/Repositorios/RepositorioAutorizacion'
import { RepositorioUsuarioNovafianza } from 'App/Dominio/Repositorios/RepositorioUsuarioNovafianza'
import { RepositorioUsuarioEmpresa } from 'App/Dominio/Repositorios/RepositorioUsuarioEmpresa'
import { EnviadorEmail } from 'App/Dominio/Email/EnviadorEmail'
import { RolDto } from 'App/Presentacion/Autenticacion/Dtos/RolDto'

export class ServicioAutenticacion {
  private servicioUsuarioEmpresa: ServicioUsuarioEmpresa
  private servicioUsuarioNovafianza: ServicioUsuarioNovafianza

  constructor(
    private encriptador: Encriptador,
    private enviadorEmail: EnviadorEmail,
    private repositorioBloqueo: RepositorioBloqueoUsuario,
    private repositorioAutorizacion: RepositorioAutorizacion,
    private repositorioUsuarioNovafianza: RepositorioUsuarioNovafianza,
    private repositorioUsuarioEmpresa: RepositorioUsuarioEmpresa
  ) {
    this.servicioUsuarioNovafianza = new ServicioUsuarioNovafianza(
      this.repositorioUsuarioNovafianza, 
      new GeneradorContrasena(),
      this.encriptador,
      this.enviadorEmail
    )
    this.servicioUsuarioEmpresa = new ServicioUsuarioEmpresa(
      this.repositorioUsuarioEmpresa, 
      new GeneradorContrasena(), 
      this.encriptador,
      this.enviadorEmail
    )
  }

  public async cambiarClave(identificacion: string, clave: string, nuevaClave: string) {
    const usuario = await this.verificarUsuario(identificacion)
    if (usuario instanceof UsuarioEmpresa) {
      if (!(await this.encriptador.comparar(clave, usuario.clave))) {
        throw new Exception('Credenciales incorrectas', 400)
      }
      usuario.clave = nuevaClave
      usuario.claveTemporal = false;
      this.servicioUsuarioEmpresa.actualizarUsuarioEmpresa(usuario.id, usuario)
      return;
    }
    if (usuario instanceof UsuarioNovafianza) {
      if (!(await this.encriptador.comparar(clave, usuario.clave))) {
        throw new Exception('Credenciales incorrectas', 400)
      }
      usuario.clave = nuevaClave
      usuario.claveTemporal = false;
      this.servicioUsuarioNovafianza.actualizarUsuarioNovafianza(usuario.id, usuario)
      return;
    }
    throw new Exception('Credenciales incorrectas', 400)
  }

  public async iniciarSesion(usuario: string, contrasena: string): Promise<RespuestaInicioSesion> {
    const usuarioVerificado = await this.verificarUsuario(usuario)
    let registroDeBloqueo = await this.repositorioBloqueo.obtenerRegistroPorUsuario(usuarioVerificado.identificacion)
    if (!registroDeBloqueo) {
      registroDeBloqueo = await this.crearRegistroDeBloqueo(usuarioVerificado.identificacion)
    }
    if (registroDeBloqueo.elUsuarioEstaBloqueado()) {
      throw new Exception('El usuario se encuentra bloqueado por exceder el número de intentos de inicio de sesión', 423)
    }
    if (!usuarioVerificado) {
      this.manejarIntentoFallido(registroDeBloqueo)
      throw new Exception('Credenciales incorrectas', 400)
    }

    if (!await this.encriptador.comparar(contrasena, usuarioVerificado.clave)) {
      this.manejarIntentoFallido(registroDeBloqueo)
      throw new Exception('Credenciales incorrectas', 400)
    }

    const rolUsuario = await this.repositorioAutorizacion.obtenerRolConModulosYPermisos(usuarioVerificado.idRol)
    const token = ServicioAutenticacionJWT.generarToken({
      documento: usuarioVerificado.identificacion,
      idRol: usuarioVerificado.idRol
    })

    return new RespuestaInicioSesion(
      {
        id: usuarioVerificado.id,
        usuario: usuarioVerificado.identificacion,
        nombre: usuarioVerificado.nombre,
        apellido: usuarioVerificado.apellido,
        telefono: usuarioVerificado.telefono,
        correo: usuarioVerificado.correo,
        idEmpresa: usuarioVerificado instanceof UsuarioEmpresa ? usuarioVerificado.idEmpresa : undefined
      },
      token,
      new RolDto(rolUsuario),
      usuarioVerificado.claveTemporal)
  }

  public async verificarUsuario(usuario: string): Promise<UsuarioEmpresa | UsuarioNovafianza> {
    const usuarioEmpresa = await this.servicioUsuarioEmpresa.obtenerUsuarioEmpresaPorUsuario(usuario)
    if (!usuarioEmpresa) {
      const usuarioNovafianza = await this.servicioUsuarioNovafianza.obtenerUsuarioNovafianzaPorUsuario(usuario)
      if (!usuarioNovafianza) {
        throw new Exception('Credenciales incorrectas', 400)
      }
      return usuarioNovafianza
    }
    return usuarioEmpresa
  }

  private async crearRegistroDeBloqueo(identificacion: string): Promise<RegistroBloqueo> {
    const registro = new RegistroBloqueo(uuid(), identificacion, 0, false)
    return await this.repositorioBloqueo.crearRegistro(registro)
  }

  private async manejarIntentoFallido(registro: RegistroBloqueo): Promise<RegistroBloqueo> {
    registro.agregarIntentoFallido()
    return await this.repositorioBloqueo.actualizarRegistro(registro)
  }
}
