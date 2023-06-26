import { RepositorioRespuesta } from 'App/Dominio/Repositorios/RepositorioRespuesta'
import { ServicioUsuario } from "./ServicioUsuario";
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";

export class ServicioRespuestas {
  constructor (private repositorio: RepositorioRespuesta, private servicioUsuarios: ServicioUsuario) { }
 

  async guardar(datos: string, idReporte: number, payload:PayloadJWT): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardar(datos, idReporte, documento);
  }

  async verificar(datos: string, payload:PayloadJWT): Promise<any> {
    if(payload.idRol !== '002'){
      throw new Error("Usted no tiene autorización para hacer una verificación");      
    }
    return this.repositorio.verificar(datos, payload);
  }

  async finalizar(params: any, payload:PayloadJWT): Promise<any> {
    if(payload.idRol !== '002'){
      throw new Error("Usted no tiene autorización para hacer una verificación");      
    }
    params.idUsuario = payload.documento;
    return this.repositorio.finalizar(params);
  }

}
