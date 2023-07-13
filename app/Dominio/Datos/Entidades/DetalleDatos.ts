import { DateTime } from 'luxon'
export class DetalleDatos {
  id?: number; 
  datoIndicadorId: number; 
  estado?: boolean; 
  valor: number; 
  anioActivoId: number; 
  reporteId: number; 
  fechaActualizacion: DateTime;
  documento?: string;
  ruta?: string;
  nombredocOriginal?: string;
  observacion?: string;

}
