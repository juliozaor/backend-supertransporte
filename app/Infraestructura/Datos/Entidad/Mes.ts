import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblMeses extends BaseModel {
  @column({ columnName: 'mes_id' })
  public id?: number;
  @column({ columnName: 'mes_nombre' })
  public nombre: string; 
  @column({ columnName: 'mes_estado' })
  public estado: boolean; 
}


