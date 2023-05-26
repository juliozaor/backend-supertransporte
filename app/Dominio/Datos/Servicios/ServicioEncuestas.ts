/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Paginador } from "App/Dominio/Paginador";
import { Encuesta } from "../Entidades/Encuesta";
import { RepositorioEncuesta } from 'App/Dominio/Repositorios/RepositorioEncuesta'
import { Reportadas } from "App/Dominio/Dto/Encuestas/Reportadas";

export class ServicioEncuestas {
  constructor (private repositorio: RepositorioEncuesta) { }
  
  async obtenerReportadas(params: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    params.pagina = params.pagina??1;
    params.limite = params.limite??100;
    return this.repositorio.obtenerReportadas(params);
  }

  async visualizar(params: any): Promise<{ encuesta:any }> {
    return this.repositorio.visualizar(params);
  }

}
