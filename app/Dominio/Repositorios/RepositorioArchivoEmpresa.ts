/* eslint-disable @typescript-eslint/semi */
import { ArchivoEmpresa } from '../Datos/Entidades/ArchivoEmpresa';
import { Paginador } from '../Paginador';

export interface RepositorioArchivoEmpresa {
  obtenerArchivosEmpresas(param: any): Promise<{archivosEmpresas: ArchivoEmpresa[], paginacion: Paginador}>
  obtenerArchivoEmpresaPorId(id: string): Promise<ArchivoEmpresa>
  obtenerArchivosPorEmpresa(idEmpresa: string): Promise<ArchivoEmpresa[]> 
  guardarArchivoEmpresa(archivoEmpresa: ArchivoEmpresa): Promise<ArchivoEmpresa>
  guardarArchivosEmpresa(archivosEmpresa: ArchivoEmpresa[]): Promise<ArchivoEmpresa[]>
  eliminarArchivosEmpresa(idEmpresa: string, idArchivos: string[]): Promise<number> // regresa el numero de registros eliminados
  actualizarArchivoEmpresa(id: string, archivoEmpresa: ArchivoEmpresa): Promise<ArchivoEmpresa>
}

