import { Exception } from '@adonisjs/core/build/standalone'
import { EnviadorEmail } from 'App/Dominio/Email/EnviadorEmail'
import { GeneradorContrasena } from 'App/Dominio/GenerarContrasena/GenerarContrasena'
import { Usuario } from '../Entidades/Usuario'
import { ServicioUsuarios } from './ServicioUsuarios'
import { RepositorioBloqueoUsuario } from 'App/Dominio/Repositorios/RepositorioBloqueoUsuario'
import Env from '@ioc:Adonis/Core/Env'
import { EmailRecuperacionContrasena } from 'App/Dominio/Email/Emails/EmailRecuperacionContrasena'

export class ServicioEmail{
  constructor (
    private enviadorEmail: EnviadorEmail, 
    private generarContrasena: GeneradorContrasena, 
    private servicioUsuarios: ServicioUsuarios,
    private repositorioRegistroBloqueo: RepositorioBloqueoUsuario
    ) { }

  public async ComprobarUsuario (usuario: string, correo: string) {
    const usuarioVerificado = await this.verificarUsuario(usuario)
    if (!usuarioVerificado) {
      throw new Exception('usuario no encontrado y/o correo incorrecto (error: 001)', 400)
    //  throw new Exception('No se encuentra usuario registrado', 400)
    }
    if (usuarioVerificado.correo.toLowerCase() !== correo.toLowerCase()) {
     //throw new Exception('El email ingresado no coincide con el del usuario', 400)
      throw new Exception('usuario no encontrado y/o correo incorrecto, (error: 002)', 400)
    }
    const clave = await this.generarContrasena.generar()

    console.log({clave});
    
    usuarioVerificado.clave = clave
    usuarioVerificado.claveTemporal = true 

    if (usuarioVerificado instanceof Usuario) {
      await this.servicioUsuarios.actualizarUsuario(usuarioVerificado.id, usuarioVerificado)
      const registroBloqueo = await this.repositorioRegistroBloqueo.obtenerRegistroPorUsuario(usuarioVerificado.identificacion)
      if(registroBloqueo && registroBloqueo.elUsuarioEstaBloqueado()){
        registroBloqueo.desbloquearUsuario()
        await this.repositorioRegistroBloqueo.actualizarRegistro(registroBloqueo)
      } 
    }

    await this.enviadorEmail.enviarTemplate({
      asunto: 'Recuperar contraseña.',
      destinatarios: usuarioVerificado.correo,
      de: Env.get('SMTP_USERNAME')
    }, new EmailRecuperacionContrasena({
      nombre: usuarioVerificado.nombre,
      clave: clave,
      usuario: usuarioVerificado.identificacion,
      logo: Env.get('LOGO')
    }))
  }

  public async verificarUsuario (usuario: string): Promise< Usuario> {
   
      const usuarioDB = await this.servicioUsuarios.obtenerUsuarioPorUsuario(usuario)
      if(!usuarioDB){
        throw new Exception('usuario no encontrado y/o correo incorrecto, (error: 001)', 400)
       // throw new Exception('No se encuentra usuario registrado', 400)
      }
      return usuarioDB
   
  }
}
