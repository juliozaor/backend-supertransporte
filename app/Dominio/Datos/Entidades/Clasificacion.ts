import { DateTime } from 'luxon'
export class Clasificacion {
  id: number;
  nombre: string;
  estado: number;
  usuarioCreacion: string;
  fechaCreacion: DateTime;
}
