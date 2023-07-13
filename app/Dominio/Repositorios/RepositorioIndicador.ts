import { Reportadas } from "../Dto/Encuestas/Reportadas"
import { Paginador } from "../Paginador"

export interface RepositorioIndicador {
  visualizar(param: any): Promise<any>
  enviarSt(param: any): Promise<any>
  guardar(datos: string, idReporte: number, documento:string): Promise<any>  
}
