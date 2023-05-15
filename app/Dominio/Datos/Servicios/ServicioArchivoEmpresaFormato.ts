/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioArchivoEmpresaFormato } from "App/Dominio/Repositorios/RepositorioArchivoEmpresaFormato";
import { ArchivoEmpresaFormato } from "../Entidades/ArchivoEmpresaFormato";

export class ServicioArchivoEmpresaFormato{
  constructor (private repositorio: RepositorioArchivoEmpresaFormato) { }

  async obtenerArchivosEmpresasFormatos (params: any): Promise<{archivosEmpresasFormatos: ArchivoEmpresaFormato[], paginacion: Paginador}> {
    return this.repositorio.obtenerArchivosEmpresasFormatos(params);
  }

  async obtenerArchivoEmpresaFormatoPorId (id: string): Promise<ArchivoEmpresaFormato>{
    return this.repositorio.obtenerArchivoEmpresaFormatoPorId(id);
  }

  async guardarArchivoEmpresaFormato (archivoEmpresaFormato: ArchivoEmpresaFormato): Promise<ArchivoEmpresaFormato>{
    archivoEmpresaFormato.id = uuidv4();
    return this.repositorio.guardarArchivoEmpresaFormato(archivoEmpresaFormato);
  }

  async actualizarArchivoEmpresaFormato (id: string, archivoEmpresaFormato: ArchivoEmpresaFormato): Promise<ArchivoEmpresaFormato> {
    return this.repositorio.actualizarArchivoEmpresaFormato(id, archivoEmpresaFormato);
  }

  async cambiarEstado (id:string):Promise<ArchivoEmpresaFormato>{
    let archivoEmpresaFormato = await this.repositorio.obtenerArchivoEmpresaFormatoPorId(id)
    archivoEmpresaFormato.estado = !archivoEmpresaFormato.estado
    return await this.repositorio.actualizarArchivoEmpresaFormato(id, archivoEmpresaFormato);
  }
}
