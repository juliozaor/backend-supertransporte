/* eslint-disable @typescript-eslint/semi */
import { LogExito } from '../Datos/Entidades/LogExito';
import { Paginador } from '../Paginador';

export interface RepositorioLogExito {
  obtenerLogsExitos(param: any): Promise<{logsExitos: LogExito[], paginacion: Paginador}>
  obtenerLogExitoPorId(id: string): Promise<LogExito>
  guardarLogExito(logExito: LogExito): Promise<LogExito>
  actualizarLogExito(id: string, logExito: LogExito): Promise<LogExito>
}
