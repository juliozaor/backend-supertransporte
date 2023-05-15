/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { VariableEspecifica } from 'App/Dominio/Datos/Entidades/VariableEspecifica';
import TblMaestras from './Maestra';
import TblMascaras from './Mascara';
import TblUsuariosEmpresas from './UsuarioEmpresa';

export default class TblVariablesEspecificas extends BaseModel {
  @column({ isPrimary: true, columnName: 'vre_id' })
  public id: string

  @column({ columnName: 'vre_mombre' }) public nombre: string
  @column({ columnName: 'vre_descripcion' }) public descripcion: string
  @column({ columnName: 'vre_tipo' }) public tipo: string
  @column({ columnName: 'vre_valor_inicial' }) public valorInicial: string
  @column({ columnName: 'vre_valor_final' }) public valorFinal: string

  @column({ columnName: 'vre_longitud' }) public longitud: number
  @column({ columnName: 'vre_decimales' }) public decimales: number

  @column({ columnName: 'vre_estado' }) public estado: boolean
  @column({ columnName: 'vre_maestra' }) public maestra: boolean
  @column({ columnName: 'vre_obligatoria' }) public obligatoria: boolean

  @column({ columnName: 'vre_mascara_id' }) public idMascara: string
  @column({ columnName: 'vre_maestra_id' }) public idMaestra: string
  @column({ columnName: 'vre_usuario_id' }) public idUsuarioEmpresa: string

  @column.dateTime({ autoCreate: true, columnName: 'vre_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'vre_actualizacion' }) public updatedAt: DateTime

  public establecerVariableEspecificaDb (variableEspecifica: VariableEspecifica) {
    this.id = variableEspecifica.id
    this.nombre = variableEspecifica.nombre
    this.descripcion = variableEspecifica.descripcion
    this.tipo = variableEspecifica.tipo
    this.valorInicial = variableEspecifica.valorInicial
    this.valorFinal = variableEspecifica.valorFinal
    this.longitud = variableEspecifica.longitud
    this.decimales = variableEspecifica.decimales
    this.estado = variableEspecifica.estado
    this.maestra = variableEspecifica.maestra
    this.obligatoria = variableEspecifica.obligatoria
    this.idMascara = variableEspecifica.idMascara
    this.idMaestra = variableEspecifica.idMaestra
    this.idUsuarioEmpresa = variableEspecifica.idUsuarioEmpresa
  }

  public establecerVariableEspecificaConId (variableEspecifica: VariableEspecifica) {
    this.nombre = variableEspecifica.nombre
    this.descripcion = variableEspecifica.descripcion
    this.tipo = variableEspecifica.tipo
    this.valorInicial = variableEspecifica.valorInicial
    this.valorFinal = variableEspecifica.valorFinal
    this.longitud = variableEspecifica.longitud
    this.decimales = variableEspecifica.decimales
    this.estado = variableEspecifica.estado
    this.maestra = variableEspecifica.maestra
    this.obligatoria = variableEspecifica.obligatoria
    this.idMascara = variableEspecifica.idMascara
    this.idMaestra = variableEspecifica.idMaestra
    this.idUsuarioEmpresa = variableEspecifica.idUsuarioEmpresa
  }

  public obtenerVariableEspecifica (): VariableEspecifica {
    const variableEspecifica = new VariableEspecifica()
    variableEspecifica.id = this.id
    variableEspecifica.nombre = this.nombre
    variableEspecifica.descripcion = this.descripcion
    variableEspecifica.tipo = this.tipo
    variableEspecifica.valorInicial = this.valorInicial
    variableEspecifica.valorFinal = this.valorFinal
    variableEspecifica.longitud = this.longitud
    variableEspecifica.decimales = this.decimales
    variableEspecifica.estado = this.estado
    variableEspecifica.maestra = this.maestra
    variableEspecifica.obligatoria = this.obligatoria
    variableEspecifica.idMascara = this.idMascara
    variableEspecifica.idMaestra = this.idMaestra
    variableEspecifica.idUsuarioEmpresa = this.idUsuarioEmpresa

    return variableEspecifica
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

  @belongsTo(() => TblUsuariosEmpresas, {
    localKey: 'id',
    foreignKey: 'idUsuarioEmpresa',
  })
  public UsuarioEmpresa: BelongsTo<typeof TblUsuariosEmpresas>
}
