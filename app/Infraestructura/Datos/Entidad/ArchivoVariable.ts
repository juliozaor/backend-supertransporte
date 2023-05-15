/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import { ArchivoVariable } from 'App/Dominio/Datos/Entidades/ArchivoVariable';
import TblArchivoEmpresaFormatos from './ArchivoEmpresaFormato';

export default class TblArchivosVariables extends BaseModel {
  @column({ isPrimary: true, columnName: 'arv_id' })
  public id: string

  @column({ columnName: 'arv_variable_id' }) public idVariable: string
  @column({ columnName: 'arv_archivo_empresa_id' }) public idArchivoEmpresaFormato: string

  @column({ columnName: 'posicion' }) public posicion: number

  @column({ columnName: 'arv_tipo' }) public tipo: string

  @column({ columnName: 'arv_estado' }) public estado: boolean

  @column.dateTime({ autoCreate: true, columnName: 'arv_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'arv_actualizacion' }) public updatedAt: DateTime

  public establecerArchivoVariableDb (archivoVariable: ArchivoVariable) {
    this.id = archivoVariable.id
    this.idVariable = archivoVariable.idVariable
    this.posicion = archivoVariable.posicion
    this.idArchivoEmpresaFormato = archivoVariable.idArchivoEmpresaFormato
    this.tipo = archivoVariable.tipo
    this.estado = archivoVariable.estado
  }

  public establecerArchivoVariableConId (archivoVariable: ArchivoVariable) {
    this.idVariable = archivoVariable.idVariable
    this.posicion = archivoVariable.posicion
    this.idArchivoEmpresaFormato = archivoVariable.idArchivoEmpresaFormato
    this.tipo = archivoVariable.tipo
    this.estado = archivoVariable.estado
  }

  public obtenerArchivoVariable (): ArchivoVariable {
    const archivoVariable = new ArchivoVariable()
    archivoVariable.id = this.id
    archivoVariable.idVariable = this.idVariable
    archivoVariable.idArchivoEmpresaFormato = this.idArchivoEmpresaFormato
    archivoVariable.posicion = this.posicion
    archivoVariable.tipo = this.tipo
    archivoVariable.estado = this.estado

    return archivoVariable
  }

  @belongsTo(() => TblArchivoEmpresaFormatos, {
    localKey: 'id',
    foreignKey: 'idArchivoEmpresaFormato',
  })
  public archivoEmpresaFormato: BelongsTo<typeof TblArchivoEmpresaFormatos>
}
