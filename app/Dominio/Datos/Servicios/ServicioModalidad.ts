/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioModalidad } from 'App/Dominio/Repositorios/RepositorioModalidad'
import { Modalidad } from '../Entidades/Modalidad';

export class ServicioModalidad{
  constructor (private repositorio: RepositorioModalidad) { }

  async obtenerModalidades (): Promise<{ modalidades: Modalidad[]}> {
    return this.repositorio.obtenerModalidades();
  }

  async filtros (idUsuario: string): Promise<{}> {
    return this.repositorio.filtros(idUsuario);
  }

}
