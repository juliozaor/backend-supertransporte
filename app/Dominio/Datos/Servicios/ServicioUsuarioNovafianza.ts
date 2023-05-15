/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioUsuarioNovafianza } from "App/Dominio/Repositorios/RepositorioUsuarioNovafianza";
import { UsuarioNovafianza } from "../Entidades/UsuarioNovafianza";
import { GeneradorContrasena } from "App/Dominio/GenerarContrasena/GenerarContrasena";
import { Encriptador } from "App/Dominio/Encriptacion/Encriptador";
import { EnviadorEmail } from "App/Dominio/Email/EnviadorEmail";

export class ServicioUsuarioNovafianza {
  constructor(
    private repositorio: RepositorioUsuarioNovafianza,
    private generarContraseña: GeneradorContrasena,
    private encriptador: Encriptador,
    private enviadorEmail: EnviadorEmail) { }

  async obtenerUsuariosNovafianza(params: any): Promise<{ usuariosNovafianza: UsuarioNovafianza[], paginacion: Paginador }> {
    return this.repositorio.obtenerUsuariosNovafianza(params);
  }

  async obtenerUsuarioNovafianzaPorId(id: string): Promise<UsuarioNovafianza> {
    return this.repositorio.obtenerUsuarioNovafianzaPorId(id);
  }

  async obtenerUsuarioNovafianzaPorUsuario(nombreUsuario: string): Promise<UsuarioNovafianza | null> {
    return this.repositorio.obtenerUsuarioNovafianzaPorUsuario(nombreUsuario);
  }

  async guardarUsuarioNovafianza(usuarioNovafianza: UsuarioNovafianza): Promise<UsuarioNovafianza> {
    const clave = await this.generarContraseña.generar()
    usuarioNovafianza.id = uuidv4();
    usuarioNovafianza.clave = await this.encriptador.encriptar(clave)
    usuarioNovafianza.usuario = usuarioNovafianza.identificacion.toString()
    const usuario = this.repositorio.guardarUsuarioNovafianza(usuarioNovafianza);
    await this.enviadorEmail.enviarEmail(
      `Bienvenido ${usuarioNovafianza.nombre}`,
      `Tu contraseña es: ${clave}`,
      [usuarioNovafianza.correo]
    )
    return usuario
  }

  async actualizarUsuarioNovafianza(id: string, usuarioNovafianza: UsuarioNovafianza): Promise<UsuarioNovafianza> {
    usuarioNovafianza.clave = await this.encriptador.encriptar(usuarioNovafianza.clave)
    return this.repositorio.actualizarUsuarioNovafianza(id, usuarioNovafianza);
  }

  async cambiarEstado(id: string): Promise<UsuarioNovafianza> {
    let usuarioNovafianza = await this.repositorio.obtenerUsuarioNovafianzaPorId(id)
    usuarioNovafianza.estado = !usuarioNovafianza.estado
    return await this.repositorio.actualizarUsuarioNovafianza(id, usuarioNovafianza);
  }
}
