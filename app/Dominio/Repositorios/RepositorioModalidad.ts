import { Modalidad } from '../Datos/Entidades/Modalidad';

export interface RepositorioModalidad{
  obtenerModalidades(): Promise<{modalidades: Modalidad[]}>
  filtros(idUsuario: string): Promise<{}>
  crearActualizar(idUsuario: string, json:string): Promise<{}>  
  filtrar(idUsuario: string, idEmpresa: string): Promise<{}>
  guardar(idUsuario: string, json:string, idEmpresa: string): Promise<{}>  
}
