import { EstadosVerificado } from "../Datos/Entidades/EstadosVerificado";
import { Reportadas } from "../Dto/Encuestas/Reportadas";
import { PayloadJWT } from "../Dto/PayloadJWT";
import { Paginador } from "../Paginador";

export interface RepositorioReporte {
  obtenerAsignadas(param: any): Promise<{reportadas: Reportadas[], paginacion: Paginador}>
  asignar(datos: string, asignador: string): Promise<any>
  eliminar(reporte: string, asignador: string): Promise<any>
  obtenerEstadosVerificado(): Promise<EstadosVerificado[]>
  verificar(datos: string, payload:PayloadJWT): Promise<any>
}
