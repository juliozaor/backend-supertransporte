/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm';
import { UsuarioEmpresa } from 'App/Dominio/Datos/Entidades/UsuarioEmpresa';
import TblVariablesEspecificas from './VariableEspecifica';
import TblEmpresas from './Empresa';
import TblRoles from './Autorizacion/Rol';

export default class TblUsuariosEmpresas extends BaseModel {
  @column({ isPrimary: true, columnName: 'use_id' })
  public id: string

  @column({ columnName: 'use_nombre' }) public nombre: string

  @column({ columnName: 'use_usuario' }) public usuario: string

  @column({ columnName: 'use_identificacion' }) public identificacion: string

  @column({ columnName: 'use_clave_temporal' }) public claveTemporal: boolean

  @column({ columnName: 'use_empresa_id' }) public idEmpresa: string

  @column({ columnName: 'use_telefono' }) public telefono: string

  @column({ columnName: 'use_correo' }) public correo: string

  @column({ columnName: 'use_fechaNacimiento' }) public fechaNacimiento: DateTime

  @column({ columnName: 'use_cargo' }) public cargo: string

  @column({ columnName: 'use_apellido' }) public apellido: string

  @column({ columnName: 'use_clave' }) public clave: string

  @column({ columnName: 'use_estado' }) public estado: boolean

  @column({ columnName: 'use_rol_id' }) public idRol: string

  @column.dateTime({ autoCreate: true , columnName: 'use_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'use_actualizacion' }) public updatedAt: DateTime

  public establecerUsuarioEmpresaDb (usuarioEmpresa: UsuarioEmpresa) {
    this.id = usuarioEmpresa.id
    this.nombre = usuarioEmpresa.nombre
    this.clave = usuarioEmpresa.clave
    this.estado = usuarioEmpresa.estado
    this.usuario = usuarioEmpresa.usuario
    this.idEmpresa = usuarioEmpresa.idEmpresa
    this.identificacion = usuarioEmpresa.identificacion
    this.apellido = usuarioEmpresa.apellido
    this.cargo = usuarioEmpresa.cargo
    this.fechaNacimiento = usuarioEmpresa.fechaNacimiento
    this.correo = usuarioEmpresa.correo
    this.telefono = usuarioEmpresa.telefono
    this.claveTemporal = usuarioEmpresa.claveTemporal
    this.idRol = usuarioEmpresa.idRol
  }

  public estableceUsuarioEmpresaConId (usuarioEmpresa: UsuarioEmpresa) {
    this.nombre = usuarioEmpresa.nombre
    this.clave = usuarioEmpresa.clave
    this.estado = usuarioEmpresa.estado
    this.usuario = usuarioEmpresa.usuario
    this.idEmpresa = usuarioEmpresa.idEmpresa
    this.identificacion = usuarioEmpresa.identificacion
    this.apellido = usuarioEmpresa.apellido
    this.cargo = usuarioEmpresa.cargo
    this.fechaNacimiento = usuarioEmpresa.fechaNacimiento
    this.correo = usuarioEmpresa.correo
    this.telefono = usuarioEmpresa.telefono
    this.claveTemporal = usuarioEmpresa.claveTemporal
    this.idRol = usuarioEmpresa.idRol
  }

  public obtenerUsuarioEmpresa (): UsuarioEmpresa {
    const usuarioEmpresa = new UsuarioEmpresa()
    usuarioEmpresa.id = this.id
    usuarioEmpresa.nombre = this.nombre
    usuarioEmpresa.clave = this.clave
    usuarioEmpresa.estado = this.estado
    usuarioEmpresa.usuario = this.usuario
    usuarioEmpresa.idEmpresa = this.idEmpresa
    usuarioEmpresa.claveTemporal = this.claveTemporal
    usuarioEmpresa.identificacion = this.identificacion
    usuarioEmpresa.correo = this.correo
    usuarioEmpresa.fechaNacimiento = this.fechaNacimiento
    usuarioEmpresa.cargo = this.cargo
    usuarioEmpresa.telefono = this.telefono
    usuarioEmpresa.apellido = this.apellido
    usuarioEmpresa.idRol = this.idRol

    return usuarioEmpresa
  }

  @hasMany(() => TblVariablesEspecificas)
  public variableEspecifica: HasMany<typeof TblVariablesEspecificas>

  @belongsTo(() => TblEmpresas, {
    localKey: 'id',
    foreignKey: 'idEmpresa',
  })
  public empresa: BelongsTo<typeof TblEmpresas>

  @belongsTo(() => TblRoles, {
    localKey: 'id',
    foreignKey: 'idRol',
  })
  public rol: BelongsTo<typeof TblRoles>
}

