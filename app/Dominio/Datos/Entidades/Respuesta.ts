import { DateTime } from 'luxon'
export class Respuesta {
  id: number;
  idPregunta: number;
  valor: string;
  documento: string;
  usuarioActualizacion: string;
  fechaActualizacion: DateTime;
  idReporte: number;
  ruta: string;
  nombredoc_original: string;
}
