/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Mascara } from "../Entidades/Mascara";
import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioMascara } from "App/Dominio/Repositorios/RepositorioMascara";

export class ServicioMascara{
  constructor (private repositorio: RepositorioMascara) { }

  async obtenerMascaras (params: any): Promise<{ mascaras: Mascara[], paginacion: Paginador }> {
    return this.repositorio.obtenerMascaras(params);
  }

  async obtenerMascaraPorId (id: string): Promise<Mascara>{
    return this.repositorio.obtenerMascaraPorId(id);
  }

  async guardarMascara (mascara: Mascara): Promise<Mascara>{
    mascara.id = uuidv4();
    return this.repositorio.guardarMascara(mascara);
  }

  async actualizarMascara (id: string, mascara: Mascara): Promise<Mascara> {
    return this.repositorio.actualizarMascara(id, mascara);
  }

  async cambiarEstado (id:string):Promise<Mascara>{
    let mascara = await this.repositorio.obtenerMascaraPorId(id)
    mascara.estado = !mascara.estado
    return await this.repositorio.actualizarMascara(id, mascara);
  }
}
