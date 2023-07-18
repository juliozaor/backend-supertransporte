import { DateTime } from 'luxon'
export class DetalleEvidencia {
  id?: number; 
  datoEvidenciaId: number; 
  estado?: boolean; 
  anioActivoId: number; 
  reporteId: number; 
  fechaActualizacion: DateTime;
  documento?: string;
  ruta?: string;
  valor?:string;
  nombredocOriginal?: string;
}
