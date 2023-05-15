/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import { UsuarioNovafianza } from 'App/Dominio/Datos/Entidades/UsuarioNovafianza';
import TblRoles from './Autorizacion/Rol';

export default class TblUsuariosNovafianzas extends BaseModel {
  @column({ isPrimary: true, columnName: 'usn_id' })
  public id: string

  @column({ columnName: 'usn_nombre' }) public nombre: string

  @column({ columnName: 'usn_identificacion' }) public identificacion: string

  @column({ columnName: 'usn_usuario' }) public usuario: string

  @column({ columnName: 'usn_clave' }) public clave: string

  @column({ columnName: 'usn_estado' }) public estado: boolean

  @column({ columnName: 'usn_clave_temporal' }) public claveTemporal: boolean

  @column({ columnName: 'usn_telefono' }) public telefono: string

  @column({ columnName: 'usn_correo' }) public correo: string

  @column({ columnName: 'usn_fechaNacimiento' }) public fechaNacimiento: DateTime

  @column({ columnName: 'usn_cargo' }) public cargo: string

  @column({ columnName: 'usn_apellido' }) public apellido: string

  @column({ columnName: 'usn_rol_id' }) public idRol: string

  @column.dateTime({ autoCreate: true , columnName: 'usn_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'usn_actualizacion' }) public updatedAt: DateTime

  public establecerUsuarioNovafianzaDb (usuarioNovafianza: UsuarioNovafianza) {
    this.id = usuarioNovafianza.id
    this.nombre = usuarioNovafianza.nombre
    this.usuario = usuarioNovafianza.usuario
    this.clave = usuarioNovafianza.clave
    this.claveTemporal = usuarioNovafianza.claveTemporal
    this.telefono = usuarioNovafianza.telefono
    this.correo = usuarioNovafianza.correo
    this.fechaNacimiento = usuarioNovafianza.fechaNacimiento
    this.cargo = usuarioNovafianza.cargo
    this.apellido = usuarioNovafianza.apellido
    this.identificacion = usuarioNovafianza.identificacion
    this.estado = usuarioNovafianza.estado
    this.idRol = usuarioNovafianza.idRol
  }

  public estableceUsuarioNovafianzaConId (usuarioNovafianza: UsuarioNovafianza) {
    this.nombre = usuarioNovafianza.nombre
    this.usuario = usuarioNovafianza.usuario
    this.clave = usuarioNovafianza.clave
    this.claveTemporal = usuarioNovafianza.claveTemporal
    this.telefono = usuarioNovafianza.telefono
    this.correo = usuarioNovafianza.correo
    this.fechaNacimiento = usuarioNovafianza.fechaNacimiento
    this.cargo = usuarioNovafianza.cargo
    this.apellido = usuarioNovafianza.apellido
    this.identificacion = usuarioNovafianza.identificacion
    this.estado = usuarioNovafianza.estado
    this.idRol = usuarioNovafianza.idRol
  }

  public obtenerUsuarioNovafianza (): UsuarioNovafianza {
    const usuarioNovafianza = new UsuarioNovafianza()
    usuarioNovafianza.id = this.id
    usuarioNovafianza.nombre = this.nombre
    usuarioNovafianza.usuario = this.usuario
    usuarioNovafianza.clave = this.clave
    usuarioNovafianza.estado = this.estado
    usuarioNovafianza.apellido = this.apellido
    usuarioNovafianza.cargo = this.cargo
    usuarioNovafianza.identificacion = this.identificacion
    usuarioNovafianza.claveTemporal = this.claveTemporal
    usuarioNovafianza.correo = this.correo
    usuarioNovafianza.fechaNacimiento = this.fechaNacimiento
    usuarioNovafianza.telefono = this.telefono
    usuarioNovafianza.idRol = this.idRol

    return usuarioNovafianza
  }

  @belongsTo(() => TblRoles, {
    localKey: 'id',
    foreignKey: 'idRol',
  })
  public rol: BelongsTo<typeof TblRoles>
}
