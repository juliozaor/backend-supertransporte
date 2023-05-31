import { Modalidad } from '../Datos/Entidades/Modalidad';

export interface RepositorioModalidad{
  obtenerModalidades(): Promise<{modalidades: Modalidad[]}>
  filtros(idUsuario: string): Promise<{}>
  crearActualizar(idUsuario: string, json:string): Promise<{}>  
}
