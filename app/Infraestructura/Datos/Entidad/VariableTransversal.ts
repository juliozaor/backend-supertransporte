/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { VariableTransversal } from 'App/Dominio/Datos/Entidades/VariableTransversal';
import TblMaestras from './Maestra';
import TblMascaras from './Mascara';

export default class TblVariablesTransversales extends BaseModel {
  @column({ isPrimary: true, columnName: 'vrt_id' })
  public id: string

  @column({ columnName: 'vrt_mombre' }) public nombre: string
  @column({ columnName: 'vrt_descripcion' }) public descripcion: string
  @column({ columnName: 'vrt_tipo' }) public tipo: string
  @column({ columnName: 'vrt_valor_inicial' }) public valorInicial: string
  @column({ columnName: 'vrt_valor_final' }) public valorFinal: string

  @column({ columnName: 'vrt_longitud' }) public longitud: number
  @column({ columnName: 'vrt_decimales' }) public decimales: number

  @column({ columnName: 'vrt_estado' }) public estado: boolean
  @column({ columnName: 'vrt_maestra' }) public maestra: boolean
  @column({ columnName: 'vrt_obligatoria' }) public obligatoria: boolean

  @column({ columnName: 'vrt_mascara_id' }) public idMascara: string
  @column({ columnName: 'vrt_maestra_id' }) public idMaestra: string

  @column.dateTime({ autoCreate: true, columnName: 'vrt_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'vrt_actualizacion' }) public updatedAt: DateTime

  public establecerVariableTransversalDb (variableTransversal: VariableTransversal) {
    this.id = variableTransversal.id
    this.nombre = variableTransversal.nombre
    this.descripcion = variableTransversal.descripcion
    this.tipo = variableTransversal.tipo
    this.valorInicial = variableTransversal.valorInicial
    this.valorFinal = variableTransversal.valorFinal
    this.longitud = variableTransversal.longitud
    this.decimales = variableTransversal.decimales
    this.estado = variableTransversal.estado
    this.maestra = variableTransversal.maestra
    this.obligatoria = variableTransversal.obligatoria
    this.idMascara = variableTransversal.idMascara
    this.idMaestra = variableTransversal.idMaestra
  }

  public establecerVariableTransversalConId (variableTransversal: VariableTransversal) {
    this.nombre = variableTransversal.nombre
    this.descripcion = variableTransversal.descripcion
    this.tipo = variableTransversal.tipo
    this.valorInicial = variableTransversal.valorInicial
    this.valorFinal = variableTransversal.valorFinal
    this.longitud = variableTransversal.longitud
    this.decimales = variableTransversal.decimales
    this.estado = variableTransversal.estado
    this.maestra = variableTransversal.maestra
    this.obligatoria = variableTransversal.obligatoria
    this.idMascara = variableTransversal.idMascara
    this.idMaestra = variableTransversal.idMaestra
  }

  public obtenerVariableTransversal (): VariableTransversal {
    const variableTransversal = new VariableTransversal()
    variableTransversal.id = this.id
    variableTransversal.nombre = this.nombre
    variableTransversal.descripcion = this.descripcion
    variableTransversal.tipo = this.tipo
    variableTransversal.valorInicial = this.valorInicial
    variableTransversal.valorFinal = this.valorFinal
    variableTransversal.longitud = this.longitud
    variableTransversal.decimales = this.decimales
    variableTransversal.estado = this.estado
    variableTransversal.maestra = this.maestra
    variableTransversal.obligatoria = this.obligatoria
    variableTransversal.idMascara = this.idMascara
    variableTransversal.idMaestra = this.idMaestra

    return variableTransversal
  }

  @belongsTo(() => TblMaestras, {
    localKey: 'id',
    foreignKey: 'idMaestra',
  })
  public maestra_: BelongsTo<typeof TblMaestras>

  @belongsTo(() => TblMascaras, {
    localKey: 'id',
    foreignKey: 'idMascara',
  })
  public mascara: BelongsTo<typeof TblMascaras>
}

