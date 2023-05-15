/* eslint-disable @typescript-eslint/semi */
import { UsuarioEmpresa } from '../Datos/Entidades/UsuarioEmpresa';
import { Paginador } from '../Paginador';

export interface RepositorioUsuarioEmpresa {
  obtenerUsuariosEmpresa(param: any): Promise<{usuariosEmpresa: UsuarioEmpresa[], paginacion: Paginador}>
  obtenerUsuarioEmpresaPorId(id: string): Promise<UsuarioEmpresa>
  guardarUsuarioEmpresa(usuarioEmpresa: UsuarioEmpresa): Promise<UsuarioEmpresa>
  actualizarUsuarioEmpresa(id: string, usuarioEmpresa: UsuarioEmpresa): Promise<UsuarioEmpresa>
  obtenerUsuarioEmpresaPorUsuario(nombreUsuario: string): Promise<UsuarioEmpresa | null>
  obtenerUsuariosEmpresaPorIdEmpresa(param: any): Promise<{usuariosEmpresa: UsuarioEmpresa[], paginacion: Paginador}>
}
