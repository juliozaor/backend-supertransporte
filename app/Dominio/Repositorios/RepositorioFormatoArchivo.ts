/* eslint-disable @typescript-eslint/semi */
import { FormatoArchivo } from '../Datos/Entidades/FormatoArchivo';
import { Paginador } from '../Paginador';

export interface RepositorioFormatoArchivo {
  obtenerFormatosArchivos(param: any): Promise<{formatosArchivos: FormatoArchivo[], paginacion: Paginador}>
  obtenerFormatoArchivoPorId(id: string): Promise<FormatoArchivo>
  guardarFormatoArchivo(formatoArchivo: FormatoArchivo): Promise<FormatoArchivo>
  actualizarFormatoArchivo(id: string, formatoArchivo: FormatoArchivo): Promise<FormatoArchivo>
}
