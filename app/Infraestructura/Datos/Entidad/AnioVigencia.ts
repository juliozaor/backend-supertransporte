import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblAnioVigencias extends BaseModel {
  @column({ columnName: 'anv_id' })
  public id?: number;
  @column({ columnName: 'anv_anio' })
  public anio: number; 
  @column({ columnName: 'anv_estado' })
  public estado: boolean; 
}


