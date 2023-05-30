import { RadioAccion } from '../Datos/Entidades/RadioAccion';

export interface RepositorioRadioAccion{
  obtenerRadiosAccion(): Promise<{radios: RadioAccion[]}>
}
