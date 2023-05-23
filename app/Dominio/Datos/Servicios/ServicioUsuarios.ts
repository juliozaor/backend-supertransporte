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

export class ServicioUsuarios {
  constructor(
    private repositorio: RepositorioUsuario,
    private generarContraseña: GeneradorContrasena,
    private encriptador: Encriptador,
    private enviadorEmail: EnviadorEmail) { }

  async obtenerUsuarios(params: any): Promise<{ usuarios: Usuario[], paginacion: Paginador }> {
    return this.repositorio.obtenerUsuarios(params);
  }

  async obtenerUsuarioPorId(id: string): Promise<Usuario> {
    return this.repositorio.obtenerUsuarioPorId(id);
  }

  async obtenerUsuarioPorUsuario(nombreUsuario: string): Promise<Usuario | null> {
    return this.repositorio.obtenerUsuarioPorUsuario(nombreUsuario);
  }

  async guardarUsuario(usuario: Usuario): Promise<Usuario> {
    const clave = await this.generarContraseña.generar()
    usuario.id = uuidv4();
    usuario.clave = await this.encriptador.encriptar(clave)
    usuario.usuario = usuario.identificacion.toString()
    const user = this.repositorio.guardarUsuario(usuario);
    await this.enviadorEmail.enviarEmail(
      `Bienvenido ${usuario.nombre}`,
      `Tu contraseña es: ${clave}`,
      [usuario.correo]
    )
    return user
  }

  async actualizarUsuario(id: string, usuario: Usuario): Promise<Usuario> {
    usuario.clave = await this.encriptador.encriptar(usuario.clave)
    return this.repositorio.actualizarUsuario(id, usuario);
  }

  async cambiarEstado(id: string): Promise<Usuario> {
    let usuario = await this.repositorio.obtenerUsuarioPorId(id)
    usuario.estado = !usuario.estado
    return await this.repositorio.actualizarUsuario(id, usuario);
  }
}
