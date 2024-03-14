
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
export default class TblEnviadosStFormularios extends BaseModel {
  public static table = 'tbl_enviados_st_formularios';
  @column({ isPrimary: true, columnName: 'id' })
  public id?: number

  @column({ columnName: 'reporte' }) public reporte: number;
  @column({ columnName: 'estado' }) public estado: number;
  @column({ columnName: 'mes' }) public mes: number;
  @column({ columnName: 'vigencia' }) public vigencia: number;

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public actualizacion: DateTime

}
