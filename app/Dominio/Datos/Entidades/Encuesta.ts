import { DateTime } from 'luxon'
export class Encuesta{
  id: number;
  nombre:string;
  descripcion:string;
  fechaInicio:DateTime;
  fechaFin:DateTime;
  usuarioCreacion:string;
  fechaCreacion:DateTime;
  categorizable?:boolean;
  observacion?:boolean;
  logueo?:boolean;
}
