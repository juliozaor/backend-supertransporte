import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblFormulariosIndicadores extends BaseModel {
  @column({ columnName: 'fmi_id' })
  public id?: number;
  @column({ columnName: 'fri_nombre' })
  public nombre: string; 
  @column({ columnName: 'fri_estado' })
  public estado: boolean; 
}

