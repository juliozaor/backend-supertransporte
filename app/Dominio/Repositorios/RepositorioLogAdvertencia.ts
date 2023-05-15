/* eslint-disable @typescript-eslint/semi */
import { LogAdvertencia } from '../Datos/Entidades/LogAdvertencia';
import { Paginador } from '../Paginador';

export interface RepositorioLogAdvertencia {
  obtenerLogsAdvertencias(param: any): Promise<{logsAdvertencias: LogAdvertencia[], paginacion: Paginador}>
  obtenerLogAdvertenciaPorId(id: string): Promise<LogAdvertencia>
  guardarLogAdvertencia(logAdvertencia: LogAdvertencia): Promise<LogAdvertencia>
  actualizarLogAdvertencia(id: string, logAdvertencia: LogAdvertencia): Promise<LogAdvertencia>
}
