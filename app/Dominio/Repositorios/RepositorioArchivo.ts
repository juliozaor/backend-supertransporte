/* eslint-disable @typescript-eslint/semi */
import { Archivo } from '../Datos/Entidades/Archivo';
import { Paginador } from '../Paginador';

export interface RepositorioArchivo {
  obtenerArchivos(param: any): Promise<{archivos: Archivo[], paginacion: Paginador}>
  obtenerArchivoPorId(id: string): Promise<Archivo>
  guardarArchivo(archivo: Archivo): Promise<Archivo>
  actualizarArchivo(id: string, archivo: Archivo): Promise<Archivo>
  buscar(parametros:string): Promise<{}>
}

