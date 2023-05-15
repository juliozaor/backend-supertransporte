/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { Paginador } from "App/Dominio/Paginador";
import { RepositorioVariableTransversal } from "App/Dominio/Repositorios/RepositorioVariableTransversal";
import { VariableTransversal } from "../Entidades/VariableTransversal";
import { v4 as uuidv4 } from 'uuid';

export class ServicioVariableTransversal{
  constructor (private repositorio: RepositorioVariableTransversal) { }

  async obtenerVariablesTransversales (params: any): Promise<{variableTransversales: VariableTransversal[], paginacion: Paginador}> {
    return this.repositorio.obtenerVariablesTransversales(params);
  }

  async obtenerVariableTransversalPorId (id: string): Promise<VariableTransversal>{
    return this.repositorio.obtenerVariableTransversalPorId(id);
  }

  async guardarVariableTransversal (variableTransversal: VariableTransversal): Promise<VariableTransversal>{
    variableTransversal.id = uuidv4();
    return this.repositorio.guardarVariableTransversal(variableTransversal);
  }

  async actualizarVariableTransversal (id: string, variableTransversal: VariableTransversal): Promise<VariableTransversal> {
    return this.repositorio.actualizarVariableTransversal(id, variableTransversal);
  }

  async cambiarEstado (id:string):Promise<VariableTransversal>{
    let variableTransversal = await this.repositorio.obtenerVariableTransversalPorId(id)
    variableTransversal.estado = !variableTransversal.estado
    return await this.repositorio.actualizarVariableTransversal(id, variableTransversal);
  }
}
