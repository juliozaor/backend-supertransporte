/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { ArchivoVariable } from "../Entidades/ArchivoVariable";
import { RepositorioArchivoVariable } from "App/Dominio/Repositorios/RepositorioArchivoVariable";

export class ServicioArchivoVariable{
  constructor (private repositorio: RepositorioArchivoVariable) { }

  async obtenerArchivosVariables (params: any): Promise<{archivosVariables: ArchivoVariable[], paginacion: Paginador}> {
    return this.repositorio.obtenerArchivosVariables(params);
  }

  async obtenerArchivoVariablePorId (id: string): Promise<ArchivoVariable>{
    return this.repositorio.obtenerArchivoVariablePorId(id);
  }

  async guardarArchivoVariable (archivoVariable: ArchivoVariable): Promise<ArchivoVariable>{
    archivoVariable.id = uuidv4();
    return this.repositorio.guardarArchivoVariable(archivoVariable);
  }

  async actualizarArchivoVariable (id: string, archivoVariable: ArchivoVariable): Promise<ArchivoVariable> {
    return this.repositorio.actualizarArchivoVariable(id, archivoVariable);
  }

  async cambiarEstado (id:string):Promise<ArchivoVariable>{
    let archivoVariable = await this.repositorio.obtenerArchivoVariablePorId(id)
    archivoVariable.estado = !archivoVariable.estado
    return await this.repositorio.actualizarArchivoVariable(id, archivoVariable);
  }
}
