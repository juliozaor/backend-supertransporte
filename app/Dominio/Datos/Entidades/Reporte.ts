import { DateTime } from 'luxon'
export class ReporteI {
  id: number;
  idEncuesta: number;
  envioSt: string;
  fechaEnviost: DateTime;
  usuarioCreacion: string;
  fechaCreacion: DateTime;
  razonSocialRues: string;
  nitRues: string;
  loginVigilado: string;
}
