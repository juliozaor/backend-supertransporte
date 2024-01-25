import { Reportadas } from "../Dto/Encuestas/Reportadas"
import { PayloadJWT } from "../Dto/PayloadJWT"
import { Paginador } from "../Paginador"

export interface RepositorioIndicador {
  visualizar(param: any): Promise<any>
  enviarSt(param: any): Promise<any>
  enviarInformacion(param: any): Promise<any>
  guardar(datos: string, documento:string): Promise<any> 
  guardarRespuestas(datos: string, documento:string): Promise<any> 
  finalizarFaseDos(mes): Promise<any> 
  verificar(datos: string, payload:PayloadJWT): Promise<any>
}
