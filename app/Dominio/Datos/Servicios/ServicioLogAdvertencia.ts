/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { Paginador } from "App/Dominio/Paginador";
import { RepositorioLogAdvertencia } from "App/Dominio/Repositorios/RepositorioLogAdvertencia";
import { v4 as uuidv4 } from 'uuid'
import { LogAdvertencia } from "../Entidades/LogAdvertencia";

export class ServicioLogAdvertencia{
  constructor (private repositorio: RepositorioLogAdvertencia) { }

  async obtenerLogsAdvertencias (params: any): Promise<{ logsAdvertencias: LogAdvertencia[], paginacion: Paginador }> {
    return this.repositorio.obtenerLogsAdvertencias(params);
  }

  async obtenerLogAdvertenciaPorId (id: string): Promise<LogAdvertencia>{
    return this.repositorio.obtenerLogAdvertenciaPorId(id);
  }

  async guardarLogAdvertencia (logAdvertencia: LogAdvertencia): Promise<LogAdvertencia>{
    logAdvertencia.id = uuidv4();
    return this.repositorio.guardarLogAdvertencia(logAdvertencia);
  }

  async actualizarLogAdvertencia (id: string, logAdvertencia: LogAdvertencia): Promise<LogAdvertencia> {
    return this.repositorio.actualizarLogAdvertencia(id, logAdvertencia);
  }

  async cambiarEstado (id:string):Promise<LogAdvertencia>{
    let logAdvertencia = await this.repositorio.obtenerLogAdvertenciaPorId(id)
    logAdvertencia.estado = !logAdvertencia.estado
    return await this.repositorio.actualizarLogAdvertencia(id, logAdvertencia);
  }
}
