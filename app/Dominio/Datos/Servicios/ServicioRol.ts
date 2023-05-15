/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioRol } from 'App/Dominio/Repositorios/RepositorioRol'
import { Rol } from '../Entidades/Autorizacion/Rol'
import { Paginador } from '../../Paginador';

export class ServicioRol{
  constructor (private repositorio: RepositorioRol) { }

  async obtenerRolporID (id: string): Promise<Rol>{
    return this.repositorio.obtenerRolporID(id)
  }

  /* async guardarRol (rol: Rol): Promise<Rol>{
    return this.repositorio.guardarRol(rol);
  } */

  async obtenerRols (params: any): Promise<{ rols: Rol[], paginacion: Paginador }> {
    return this.repositorio.obtenerRols(params);
  }

}
