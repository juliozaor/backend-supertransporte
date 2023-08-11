import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblPeriodos extends BaseModel {
  @column({ columnName: 'per_id' })
  public id?: number;
  @column({ columnName: 'per_nombre' })
  public nombre: string; 
  @column({ columnName: 'per_tipo' })
  public tipo: string; 
  @column({ columnName: 'per_decimal' })
  public decimal: number; 
  @column({ columnName: 'per_estado' })
  public estado: boolean; 
}

