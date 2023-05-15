/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Rol } from '../Datos/Entidades/Autorizacion/Rol'

export class RespuestaInicioSesion {

  constructor(
    public readonly usuario: {
      id: string,
      usuario: string,
      nombre?: string,
      apellido?: string,
      telefono?: string,
      correo?: string,
      idEmpresa?: string
    },
    public readonly token: string,
    public readonly rol: Rol,
    public readonly claveTemporal: boolean
  ) { }
}
