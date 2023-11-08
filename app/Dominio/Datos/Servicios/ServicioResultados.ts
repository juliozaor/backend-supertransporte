import { RepositorioResultado} from 'App/Dominio/Repositorios/RepositorioResultado'
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";

export class ServicioResultados {
  constructor (private repositorio: RepositorioResultado) { }
 

  async generar(datos: string, payload:PayloadJWT): Promise<any> {
    const {documento} = payload;
    return this.repositorio.generar(datos, documento);
  }

  

}
