/* eslint-disable @typescript-eslint/semi */
import { UsuarioNovafianza } from '../Datos/Entidades/UsuarioNovafianza';
import { Paginador } from '../Paginador';

export interface RepositorioUsuarioNovafianza {
  obtenerUsuariosNovafianza(param: any): Promise<{usuariosNovafianza: UsuarioNovafianza[], paginacion: Paginador}>
  obtenerUsuarioNovafianzaPorId(id: string): Promise<UsuarioNovafianza>
  guardarUsuarioNovafianza(usuarioNovafianza: UsuarioNovafianza): Promise<UsuarioNovafianza>
  actualizarUsuarioNovafianza(id: string, usuarioNovafianza: UsuarioNovafianza): Promise<UsuarioNovafianza>
  obtenerUsuarioNovafianzaPorUsuario(nombreUsuario: string): Promise<UsuarioNovafianza | null>
}
