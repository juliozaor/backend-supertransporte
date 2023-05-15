/* eslint-disable @typescript-eslint/semi */
import { Maestra } from '../Datos/Entidades/Maestra';
import { Paginador } from '../Paginador';

export interface RepositorioMaestra {
  obtenerMaestras(param: any): Promise<{maestras: Maestra[], paginacion: Paginador}>
  obtenerMaestraPorId(id: string): Promise<Maestra>
  guardarMaestra(maestra: Maestra): Promise<Maestra>
  actualizarMaestra(id: string, maestra: Maestra): Promise<Maestra>
}
