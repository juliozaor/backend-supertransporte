/* eslint-disable @typescript-eslint/semi */
import { LogErrores } from '../Datos/Entidades/LogErrores';
import { Paginador } from '../Paginador';

export interface RepositorioLogErrores {
  obtenerLogsErrores(param: any): Promise<{logsErrores: LogErrores[], paginacion: Paginador}>
  obtenerLogErroresPorId(id: string): Promise<LogErrores>
  guardarLogErrores(logErrores: LogErrores): Promise<LogErrores>
  actualizarLogErrores(id: string, logErrores: LogErrores): Promise<LogErrores>
}
