/* eslint-disable @typescript-eslint/semi */
import { Paginador } from '../Paginador';
import { VariableEspecifica } from '../Datos/Entidades/VariableEspecifica';

export interface RepositorioVariableEspecifica {
  obtenerVariablesEspecificas(param: any): Promise<{variablesEspecificas: VariableEspecifica[], paginacion: Paginador}>
  obtenerVariableEspecificaPorId(id: string): Promise<VariableEspecifica>
  guardarVariableEspecifica(variableEspecifica: VariableEspecifica): Promise<VariableEspecifica>
  actualizarVariableEspecifica(id: string, variableEspecifica: VariableEspecifica): Promise<VariableEspecifica>
}
