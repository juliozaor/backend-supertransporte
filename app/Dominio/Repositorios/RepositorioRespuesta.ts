import { PayloadJWT } from "../Dto/PayloadJWT"

export interface RepositorioRespuesta {
  guardar(datos: string, idReporte: number, documento:string): Promise<any>  
  verificar(datos: string, payload:PayloadJWT): Promise<any>
  finalizar(param: any): Promise<any>
}
