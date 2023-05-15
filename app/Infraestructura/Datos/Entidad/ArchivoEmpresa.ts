/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm';
import { ArchivoEmpresa } from 'App/Dominio/Datos/Entidades/ArchivoEmpresa';
import TblArchivos from './Archivo';
import TblEmpresas from './Empresa';

export default class TblArchivosEmpresas extends BaseModel {
  @column({ isPrimary: true, columnName: 'are_id' })
  public id: string

  @column({ columnName: 'are_archivo_id' }) public idArchivo: string

  @column({ columnName: 'are_empresa_id' }) public idEmpresa: string

  @column({ columnName: 'are_tipo' }) public tipo?: string

  @column({columnName: 'are_estado'}) public estado: boolean

  @column.dateTime({ autoCreate: true , columnName: 'are_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'are_actualizacion' }) public updatedAt: DateTime

  public establecerArchivoEmpresaDb (archivoEmpresa: ArchivoEmpresa) {
    this.id = archivoEmpresa.id
    this.tipo = archivoEmpresa.tipo
    this.idArchivo = archivoEmpresa.idArchivo
    this.idEmpresa = archivoEmpresa.idEmpresa
    this.estado = archivoEmpresa.estado
  }

  public establecerArchivoEmpresaConId (archivoEmpresa: ArchivoEmpresa) {
    this.tipo = archivoEmpresa.tipo
    this.idArchivo = archivoEmpresa.idArchivo
    this.idEmpresa = archivoEmpresa.idEmpresa
    this.estado = archivoEmpresa.estado
  }

  public obtenerArchivoEmpresa (): ArchivoEmpresa {
    const archivoEmpresa = new ArchivoEmpresa()
    archivoEmpresa.id = this.id
    archivoEmpresa.tipo = this.tipo
    archivoEmpresa.idArchivo = this.idArchivo
    archivoEmpresa.idEmpresa = this.idEmpresa
    archivoEmpresa.estado = this.estado

    return archivoEmpresa
  }

  @hasMany(() => TblArchivos, {
    localKey: 'id',
    foreignKey: 'idArchivo',
  })
  public archivo: HasMany<typeof TblArchivos>

  @hasMany(() => TblEmpresas, {
    localKey: 'id',
    foreignKey: 'idEmpresa',
  })
  public empresa: HasMany<typeof TblEmpresas>
}
