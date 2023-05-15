/* eslint-disable @typescript-eslint/semi */
import { ArchivoVariable } from '../Datos/Entidades/ArchivoVariable';
import { Paginador } from '../Paginador';

export interface RepositorioArchivoVariable {
  obtenerArchivosVariables(param: any): Promise<{archivosVariables: ArchivoVariable[], paginacion: Paginador}>
  obtenerArchivoVariablePorId(id: string): Promise<ArchivoVariable>
  guardarArchivoVariable(archivoVariable: ArchivoVariable): Promise<ArchivoVariable>
  actualizarArchivoVariable(id: string, archivoVariable: ArchivoVariable): Promise<ArchivoVariable>
}
