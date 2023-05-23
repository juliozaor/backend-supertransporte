import { DateTime } from 'luxon'
export class Pregunta {
  id: number;
  pregunta: string;
  estado: number;
  usuarioCreacion: string;
  fechaCreacion: DateTime;
  idClasificacion: number;
  tipoEvidencia: string;
  idEncuesta: number;
  secuencia: string;
}
