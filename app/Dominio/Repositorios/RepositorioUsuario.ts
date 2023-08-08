import { Usuario } from '../Datos/Entidades/Usuario';
import { PayloadJWT } from '../Dto/PayloadJWT';
import { Paginador } from '../Paginador';

export interface RepositorioUsuario {
  obtenerUsuarios(param: any): Promise<{usuarios: Usuario[], paginacion: Paginador}>
  obtenerUsuarioPorId(id: string): Promise<Usuario>
  obtenerUsuarioPorRol(rol: string): Promise<Usuario[]>
  guardarUsuario(usuario: Usuario): Promise<Usuario>
  actualizarUsuario(id: string, usuario: Usuario, payload?:PayloadJWT): Promise<Usuario>
  obtenerUsuarioPorUsuario(nombreUsuario: string): Promise<Usuario | null>
  caracterizacion(idUsuario:string,idRol:string, idEncuesta?:number): Promise<any>
}
