import { DateTime } from 'luxon'
export class ReporteI {
  id?: number;
  idEncuesta: number;
  envioSt: string;
  fechaEnviost?: DateTime;
  usuarioCreacion?: string;
  razonSocialRues: string;
  nitRues: string;
  loginVigilado: string;
  asignado?: boolean;
  ultimoUsuarioAsignado?: string
  asignador?: string
  fechaAsignacion?: DateTime;
  estadoVerificacionId?:number;
  anioVigencia?:number;
}
