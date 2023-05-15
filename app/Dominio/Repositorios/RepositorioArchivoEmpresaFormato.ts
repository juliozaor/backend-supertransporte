/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { ArchivoEmpresaFormato } from '../Datos/Entidades/ArchivoEmpresaFormato';
import { Paginador } from '../Paginador';

export interface RepositorioArchivoEmpresaFormato {
  obtenerArchivosEmpresasFormatos(param: any): Promise<{archivosEmpresasFormatos: ArchivoEmpresaFormato[], paginacion: Paginador}>
  obtenerArchivoEmpresaFormatoPorId(id: string): Promise<ArchivoEmpresaFormato>
  guardarArchivoEmpresaFormato(archivoEmpresaFormato: ArchivoEmpresaFormato): Promise<ArchivoEmpresaFormato>
  actualizarArchivoEmpresaFormato(id: string, archivoEmpresaFormato: ArchivoEmpresaFormato): Promise<ArchivoEmpresaFormato>
}

