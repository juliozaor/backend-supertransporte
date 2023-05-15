import { DateTime } from 'luxon'
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export class UsuarioNovafianza{
  id: string;
  usuario: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: DateTime;
  cargo: string;
  correo: string;
  telefono: string;
  estado: boolean;
  clave: string;
  claveTemporal: boolean;
  idRol: string;
}
