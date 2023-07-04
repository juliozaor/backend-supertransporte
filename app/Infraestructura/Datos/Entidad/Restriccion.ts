import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblRestriccionRadio extends BaseModel {
  public static table = 'tbl_restriccion_radios';
  @column({ isPrimary: true, columnName: 'id' })
  public id: number
  @column({ columnName: 'trr_modalidad_id' }) public modalidad_id: string;
  @column({ columnName: 'trr_radio_id' }) public radio_id: number;



}
