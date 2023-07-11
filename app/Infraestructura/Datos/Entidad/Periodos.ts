import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblPeriodos extends BaseModel {
  @column({ columnName: 'per_id' })
  public id?: number;
  @column({ columnName: 'per_nombre' })
  public anio: string; 
  @column({ columnName: 'per_tipo' })
  public tipo: string; 
  @column({ columnName: 'per_nombre' })
  public nombre: string; 
  @column({ columnName: 'anv_estado' })
  public estado: boolean; 
}

/* table.increments('per_id')
table.string('per_nombre', 150)
table.string('per_tipo').comment('modeda, numero, porcentaje, real')
table.integer('per_decimal')
table.boolean('per_estado').defaultTo(true)
 */