import { RepositorioModalidad } from 'App/Dominio/Repositorios/RepositorioModalidad'
import { Modalidad } from '../Entidades/Modalidad';
import { ServicioUsuario } from './ServicioUsuario';

export class ServicioModalidad{
  constructor (
    private repositorio: RepositorioModalidad, 
    private servicioUsuarios: ServicioUsuario
    ) {}

  async obtenerModalidades (): Promise<{ modalidades: Modalidad[]}> {
    return this.repositorio.obtenerModalidades();
  }

  async filtros (idUsuario: string): Promise<{}> {
   const usuario = await this.servicioUsuarios.obtenerUsuario(idUsuario)
   return this.repositorio.filtros(usuario.id);
  }
  async crearActualizar (idUsuario: string, json:string): Promise<{}> {
    const usuario = await this.servicioUsuarios.obtenerUsuario(idUsuario)
     return this.repositorio.crearActualizar(usuario.id, json);
    }

}
