/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { Paginador } from "App/Dominio/Paginador";
import { RepositorioLogErrores } from "App/Dominio/Repositorios/RepositorioLogErrores";
import { v4 as uuidv4 } from 'uuid'
import { LogErrores } from "../Entidades/LogErrores";

export class ServicioLogErrores{
  constructor (private repositorio: RepositorioLogErrores) { }

  async obtenerLogsErrores (params: any): Promise<{ logsErrores: LogErrores[], paginacion: Paginador }> {
    return this.repositorio.obtenerLogsErrores(params);
  }

  async obtenerLogErroresPorId (id: string): Promise<LogErrores>{
    return this.repositorio.obtenerLogErroresPorId(id);
  }

  async guardarLogErrores (logErrores: LogErrores): Promise<LogErrores>{
    logErrores.id = uuidv4();
    return this.repositorio.guardarLogErrores(logErrores);
  }

  async actualizarLogErrores (id: string, logErrores: LogErrores): Promise<LogErrores> {
    return this.repositorio.actualizarLogErrores(id, logErrores);
  }

  async cambiarEstado (id:string):Promise<LogErrores>{
    let logErrores = await this.repositorio.obtenerLogErroresPorId(id)
    logErrores.estado = !logErrores.estado
    return await this.repositorio.actualizarLogErrores(id, logErrores);
  }
}
