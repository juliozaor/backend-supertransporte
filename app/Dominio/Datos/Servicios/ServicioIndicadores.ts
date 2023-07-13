
import { Paginador } from "App/Dominio/Paginador";
import { Reportadas } from "App/Dominio/Dto/Encuestas/Reportadas";
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";
import { RepositorioIndicador } from "App/Dominio/Repositorios/RepositorioIndicador";

export class ServicioIndicadores {
  constructor (private repositorio: RepositorioIndicador) { }

  async visualizar(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    return this.repositorio.visualizar(params);
  }

  async enviarSt(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    return this.repositorio.enviarSt(params);
  }

  async guardar(datos: string, payload:PayloadJWT): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardar(datos, documento);
  }

}
