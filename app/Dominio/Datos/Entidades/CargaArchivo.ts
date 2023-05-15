import { DateTime } from 'luxon'

export class CargaArchivo{
  id: string;
  nombre: string;
  fechaInicial: DateTime;
  fechaFinal: DateTime;
  usuario: string;
  tipoArchivo: string;
  estadoProceso: number;
  registrosEncontrados?: number;
  registrosFallidos?: number;
  registrosInsertados?: number;
  estado?: boolean;
  empresa?:string;
}
