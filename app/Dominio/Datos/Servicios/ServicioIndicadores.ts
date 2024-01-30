
import { Paginador } from "App/Dominio/Paginador";
import { Reportadas } from "App/Dominio/Dto/Encuestas/Reportadas";
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";
import { RepositorioIndicador } from "App/Dominio/Repositorios/RepositorioIndicador";

export class ServicioIndicadores {
  constructor (private repositorio: RepositorioIndicador) { }

  async visualizar(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol;
    return this.repositorio.visualizar(params);
  }

  async enviarSt(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    return this.repositorio.enviarSt(params);
  }

  async enviarInformacion(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol
    return this.repositorio.enviarInformacion(params);
  }

  async guardar(datos: string, payload:PayloadJWT): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardar(datos, documento);
  }

  async guardarRespuestas(datos: string, payload:PayloadJWT): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardarRespuestas(datos, documento);
  }

  async finalizarFaseDos(mes): Promise<any> {
    return this.repositorio.finalizarFaseDos(mes);
  }

  async verificar(datos: string, payload:PayloadJWT): Promise<any> {
    if(payload.idRol !== '002'){
      throw new Error("Usted no tiene autorización para hacer una verificación");      
    }
    return this.repositorio.verificar(datos, payload);
  }


}
