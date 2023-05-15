/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioFormatoArchivo } from "App/Dominio/Repositorios/RepositorioFormatoArchivo";
import { FormatoArchivo } from "../Entidades/FormatoArchivo";

export class ServicioFormatoArchivo{
  constructor (private repositorio: RepositorioFormatoArchivo) { }

  async obtenerFormatosArchivos (params: any): Promise<{formatosArchivos: FormatoArchivo[], paginacion: Paginador}> {
    return this.repositorio.obtenerFormatosArchivos(params);
  }

  async obtenerFormatoArchivoPorId (id: string): Promise<FormatoArchivo>{
    return this.repositorio.obtenerFormatoArchivoPorId(id);
  }

  async guardarFormatoArchivo (formatoArchivo: FormatoArchivo): Promise<FormatoArchivo>{
    formatoArchivo.id = uuidv4();
    return this.repositorio.guardarFormatoArchivo(formatoArchivo);
  }

  async actualizarFormatoArchivo (id: string, formatoArchivo: FormatoArchivo): Promise<FormatoArchivo> {
    return this.repositorio.actualizarFormatoArchivo(id, formatoArchivo);
  }

  async cambiarEstado (id:string):Promise<FormatoArchivo>{
    let formatoArchivo = await this.repositorio.obtenerFormatoArchivoPorId(id)
    formatoArchivo.estado = !formatoArchivo.estado
    return await this.repositorio.actualizarFormatoArchivo(id, formatoArchivo);
  }
}
