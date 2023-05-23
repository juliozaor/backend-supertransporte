/* eslint-disable @typescript-eslint/semi */
import { Encuesta } from '../Datos/Entidades/Encuesta';
import { Paginador } from '../Paginador';

export interface RepositorioEncuesta {
  obtenerRolporID(id: string): Promise<Encuesta>
 /*  guardarRol(rol: Rol): Promise<Rol> */
  obtenerEncuestas(param: any): Promise<{encuestas: Encuesta[], paginacion: Paginador}>
}
