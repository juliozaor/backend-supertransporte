/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioUsuario } from "App/Dominio/Repositorios/RepositorioUsuario";
import { Usuario } from "../Entidades/Usuario";
import { GeneradorContrasena } from "App/Dominio/GenerarContrasena/GenerarContrasena";
import { Encriptador } from "App/Dominio/Encriptacion/Encriptador";
import { EnviadorEmail } from "App/Dominio/Email/EnviadorEmail";
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";
import { EmailBienvenida } from "App/Dominio/Email/Emails/EmailBienvenida";
import { Credenciales } from "App/Dominio/Email/Modelos/Credenciales";
import Env from '@ioc:Adonis/Core/Env';
import { ServicioAuditoria } from "./ServicioAuditoria";

export class ServicioUsuarios {  
  private servicioAuditoria = new ServicioAuditoria();
  constructor(
    private repositorio: RepositorioUsuario,
    private generarContraseña: GeneradorContrasena,
    private encriptador: Encriptador,
    private enviadorEmail: EnviadorEmail
    ) { }

  async obtenerUsuarios(params: any): Promise<{ usuarios: Usuario[], paginacion: Paginador }> {
    return this.repositorio.obtenerUsuarios(params);
  }

  async obtenerUsuarioPorId(id: string): Promise<Usuario> {
    return this.repositorio.obtenerUsuarioPorId(id);
  }

  async obtenerUsuarioPorUsuario(nombreUsuario: string): Promise<Usuario | null> {
    return this.repositorio.obtenerUsuarioPorUsuario(nombreUsuario);
  }

  async guardarUsuario(usuario: Usuario, payload:PayloadJWT): Promise<Usuario> {
    if(payload.idRol !== '006' && payload.idRol !== '001'){
      throw new Error("Usted no tiene autorización para crear usuarios");      
    }
    const clave = await this.generarContraseña.generar()
    usuario.id = uuidv4();
    usuario.clave = await this.encriptador.encriptar(clave)
    usuario.usuario = usuario.identificacion.toString()
    const user = this.repositorio.guardarUsuario(usuario);
    await this.enviadorEmail.enviarTemplate<Credenciales>({ 
      asunto: `Bienvenido(a) ${usuario.nombre}`, 
      destinatarios: usuario.correo,
    }, new EmailBienvenida({ clave: clave, nombre: usuario.nombre, usuario: usuario.usuario, logo: Env.get('LOGO') }))
    
    this.servicioAuditoria.Auditar({
      accion: "Creación de usuarios",
      modulo: "Usuarios",
      jsonNuevo: JSON.stringify(user),
      usuario: payload.documento,
      descripcion: 'Se creo un usuario'
    })

    return user
  }

  async actualizarUsuario(id: string, usuario: Usuario, payload?:PayloadJWT): Promise<Usuario> {
    usuario.clave = await this.encriptador.encriptar(usuario.clave)
    return this.repositorio.actualizarUsuario(id, usuario, payload);
  }

  async cambiarEstado(id: string): Promise<Usuario> {
    let usuario = await this.repositorio.obtenerUsuarioPorId(id)
    usuario.estado = !usuario.estado
    return await this.repositorio.actualizarUsuario(id, usuario);
  }
}
