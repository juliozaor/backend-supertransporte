import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblTipoDatos extends BaseModel {
  @column({ columnName: 'tds_id' })
  public id?: number;
  @column({ columnName: 'tds_nombre' })
  public nombre: string; 
  @column({ columnName: 'tds_estado' })
  public estado: boolean; 
}


