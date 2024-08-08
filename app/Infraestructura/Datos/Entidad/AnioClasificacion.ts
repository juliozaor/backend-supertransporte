import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblAnioClasificaciones extends BaseModel {
  @column({ columnName: 'anc_anio' })
  public anio: number; 
  @column({ columnName: 'anc_estado' })
  public estado: boolean; 
}


