/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioLogExito } from '../../Repositorios/RepositorioLogExito';
import { LogExito } from "../Entidades/LogExito";

export class ServicioLogExito{
  constructor (private repositorio: RepositorioLogExito) { }

  async obtenerLogsExitos (params: any): Promise<{ logsExitos: LogExito[], paginacion: Paginador }> {
    return this.repositorio.obtenerLogsExitos(params);
  }

  async obtenerLogExitoPorId (id: string): Promise<LogExito>{
    return this.repositorio.obtenerLogExitoPorId(id);
  }

  async guardarLogExito (logExito: LogExito): Promise<LogExito>{
    logExito.id = uuidv4();
    return this.repositorio.guardarLogExito(logExito);
  }

  async actualizarLogExito (id: string, logExito: LogExito): Promise<LogExito> {
    return this.repositorio.actualizarLogExito(id, logExito);
  }

  async cambiarEstado (id:string):Promise<LogExito>{
    let logExito = await this.repositorio.obtenerLogExitoPorId(id)
    logExito.estado = !logExito.estado
    return await this.repositorio.actualizarLogExito(id, logExito);
  }
}
