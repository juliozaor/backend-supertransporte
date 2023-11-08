
import { RepositorioResultado } from 'App/Dominio/Repositorios/RepositorioResultado';
export class RepositorioResultadosDB implements RepositorioResultado {

  async generar(datos: string, documento: string): Promise<any> {
  const {idReporte, idVigilado, idMes} = JSON.parse(datos);
  

  }


}
