import { RadioAccion } from '../Datos/Entidades/RadioAccion';

export interface RepositorioRadioAccion{
  obtenerRadiosAccion(modalidad:number): Promise<{radios: RadioAccion[]}>
}
