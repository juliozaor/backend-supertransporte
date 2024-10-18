import { EstadosVerificado } from "../Datos/Entidades/EstadosVerificado";
import { Reportadas } from "../Dto/Encuestas/Reportadas";
import { Paginador } from "../Paginador";

export interface RepositorioReporte {
  obtenerAsignadas(param: any): Promise<{asignadas: Reportadas[], paginacion: Paginador}>
  asignadosVerificador(param: any): Promise<{asignadas: Reportadas[], paginacion: Paginador}>
  obtenerAsignadasF2(param: any): Promise<{asignadas: Reportadas[], paginacion: Paginador}>
  asignar(datos: string, asignador: string): Promise<any>
  eliminar(reporte: string, asignador: string): Promise<any>
  obtenerEstadosVerificado(): Promise<EstadosVerificado[]>
  obtenerEnviadas(param: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }>
  visualizar(param: any): Promise<any>  
  formularios(param: any): Promise<any>
  aprobarVerificacion(param: any): Promise<any>
}
