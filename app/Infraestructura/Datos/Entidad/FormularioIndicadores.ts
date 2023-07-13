import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import { TblSubIndicadores } from './SubIndicadores';
export class TblFormulariosIndicadores extends BaseModel {
  @column({ columnName: 'fmi_id' })
  public id?: number;
  @column({ columnName: 'fri_nombre' })
  public nombre: string; 
  @column({ columnName: 'fri_estado' })
  public estado: boolean; 

  @hasMany(() => TblSubIndicadores, {
    localKey: 'id',
    foreignKey: 'formularioId',
  })
  public subIndicadores: HasMany<typeof TblSubIndicadores>
}

