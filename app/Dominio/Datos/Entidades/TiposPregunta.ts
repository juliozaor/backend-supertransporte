import { DateTime } from 'luxon'
export class TiposPregunta {
  id: number;
  nombre: string;
  opciones: JSON;
  validaciones: JSON;
  estado: boolean;
}
