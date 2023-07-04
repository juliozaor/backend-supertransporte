import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMotivos extends BaseModel {
  public static table = 'tbl_motivos';
  @column({ isPrimary: true, columnName: 'id' })
  public id: number
  @column({ columnName: 'mov_descripcion' }) public descripcion: string;



}
