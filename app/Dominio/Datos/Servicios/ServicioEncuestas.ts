
import { Paginador } from "App/Dominio/Paginador";
import { RepositorioEncuesta } from 'App/Dominio/Repositorios/RepositorioEncuesta'
import { Reportadas } from "App/Dominio/Dto/Encuestas/Reportadas";
import { ServicioUsuario } from "./ServicioUsuario";
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";
import TblMotivos from "App/Infraestructura/Datos/Entidad/Motivo";

export class ServicioEncuestas {
  constructor (private repositorio: RepositorioEncuesta, private servicioUsuarios: ServicioUsuario) { }
  
  async obtenerReportadas(params: any, payload:PayloadJWT): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    params.pagina = params.pagina??1;
    params.limite = params.limite??100;
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol;
    return this.repositorio.obtenerReportadas(params);
  }

  async visualizar(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol;
    return this.repositorio.visualizar(params);
  }

  async enviarSt(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    return this.repositorio.enviarSt(params);
  }

  async obtenerMotivos(): Promise<any> {
    return await TblMotivos.query()
  }

}
