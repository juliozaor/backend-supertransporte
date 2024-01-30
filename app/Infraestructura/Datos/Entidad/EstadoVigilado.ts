
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
export default class TblEstadoVigilado extends BaseModel {
  public static table = 'tbl_estados_vigilados';
  @column({ isPrimary: true, columnName: 'esv_id' })
  public id: number

  @column({ columnName: 'esv_nombre' }) public nombre: string;
  @column({ columnName: 'esv_descripcion' }) public descripcion: string;
  @column({ columnName: 'esv_estado' }) public estado: boolean;



}
