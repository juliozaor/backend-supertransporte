
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
export default class TblEstadoEmpresa extends BaseModel {
  public static table = 'tbl_estados_empresas';
  @column({ isPrimary: true, columnName: 'ese_id' })
  public id: number

  @column({ columnName: 'ese_nombre' }) public nombre: string;
  @column({ columnName: 'ese_descripcion' }) public descripcion: string;
  @column({ columnName: 'ese_estado' }) public estado: boolean;



}
