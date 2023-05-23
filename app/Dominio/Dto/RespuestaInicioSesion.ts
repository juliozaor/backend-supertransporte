/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RolDto } from 'App/Presentacion/Autenticacion/Dtos/RolDto'
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
    },
    public readonly token: string,
    public readonly rol: RolDto,
    public readonly claveTemporal: boolean
  ) { }
}
