/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { Paginador } from '../Paginador';
import { VariableTransversal } from '../Datos/Entidades/VariableTransversal';

export interface RepositorioVariableTransversal {
  obtenerVariablesTransversales(param: any): Promise<{variableTransversales: VariableTransversal[], paginacion: Paginador}>
  obtenerVariableTransversalPorId(id: string): Promise<VariableTransversal>
  guardarVariableTransversal(variableTransversal: VariableTransversal): Promise<VariableTransversal>
  actualizarVariableTransversal(id: string, variableTransversal: VariableTransversal): Promise<VariableTransversal>
}
