import { Reportadas } from '../Dto/Encuestas/Reportadas';
import { Paginador } from '../Paginador';

export interface RepositorioEncuesta {
  obtenerReportadas(param: any): Promise<{reportadas: Reportadas[], paginacion: Paginador}>
  visualizar(param: any): Promise<any>
  enviarSt(param: any): Promise<any>
  enviarInformacion(param: any): Promise<any>
}
