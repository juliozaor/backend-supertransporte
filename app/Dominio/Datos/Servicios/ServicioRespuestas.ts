import { RepositorioRespuesta } from 'App/Dominio/Repositorios/RepositorioRespuesta'
import { ServicioUsuario } from "./ServicioUsuario";
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";

export class ServicioRespuestas {
  constructor (private repositorio: RepositorioRespuesta, private servicioUsuarios: ServicioUsuario) { }
 

  async guardar(datos: string, idReporte: number, payload:PayloadJWT): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardar(datos, idReporte, documento);
  }

}
