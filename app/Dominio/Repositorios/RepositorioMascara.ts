/* eslint-disable @typescript-eslint/semi */
import { Mascara } from '../Datos/Entidades/Mascara';
import { Paginador } from '../Paginador';

export interface RepositorioMascara {
  obtenerMascaras(param: any): Promise<{mascaras: Mascara[], paginacion: Paginador}>
  obtenerMascaraPorId(id: string): Promise<Mascara>
  guardarMascara(mascara: Mascara): Promise<Mascara>
  actualizarMascara(id: string, mascara: Mascara): Promise<Mascara>
}
