import { Usuario } from '../Datos/Entidades/Usuario';
import { Paginador } from '../Paginador';

export interface RepositorioUsuario {
  obtenerUsuarios(param: any): Promise<{usuarios: Usuario[], paginacion: Paginador}>
  obtenerUsuarioPorId(id: string): Promise<Usuario>
  guardarUsuario(usuario: Usuario): Promise<Usuario>
  actualizarUsuario(id: string, usuario: Usuario): Promise<Usuario>
  obtenerUsuarioPorUsuario(nombreUsuario: string): Promise<Usuario | null>
  caracterizacion(idUsuario:string, idEncuesta?:number): Promise<any>
}
