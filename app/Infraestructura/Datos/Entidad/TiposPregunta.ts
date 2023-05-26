/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { TiposPregunta } from 'App/Dominio/Datos/Entidades/TiposPregunta';
export default class TblTiposPregunta extends BaseModel {
  public static readonly table = 'tbl_tipos_preguntas'

  @column({ isPrimary: true, columnName: 'tpp_id' }) public id: number

  @column({ columnName: 'tpp_nombre' }) public nombre: string

  @column({ columnName: 'tpp_opciones' }) public opciones: JSON

  @column({ columnName: 'tpp_validaciones' }) public validaciones: JSON

  @column({ columnName: 'tpp_estado' }) public estado: boolean


  public establecerTiposTblTiposPregunta (tipoPregunta:TiposPregunta):void{
    this.id = tipoPregunta.id
    this.nombre = tipoPregunta.nombre
    this.opciones = tipoPregunta.opciones
    this.validaciones = tipoPregunta.validaciones
    this.estado = tipoPregunta.estado
  }

  public obtenerTiposPregunta ():TiposPregunta{
    const tipoPregunta = new TiposPregunta()
    tipoPregunta.id = this.id 
    tipoPregunta.nombre = this.nombre
    tipoPregunta.opciones = this.opciones
    tipoPregunta.validaciones = this.validaciones
    tipoPregunta.estado = this.estado
    return tipoPregunta
  }
}
