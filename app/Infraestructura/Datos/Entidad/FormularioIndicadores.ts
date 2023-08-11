import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import { TblSubIndicadores } from './SubIndicadores';
import { TblEvidencias } from './Evidencias';
export class TblFormulariosIndicadores extends BaseModel {
  @column({ columnName: 'fmi_id' })
  public id?: number;
  @column({ columnName: 'fri_nombre' })
  public nombre: string; 
  @column({ columnName: 'fri_estado' })
  public estado: boolean; 
  @column({ columnName: 'fri_mensaje' })
  public mensaje: string; 

  @hasMany(() => TblSubIndicadores, {
    localKey: 'id',
    foreignKey: 'formularioId',
  })
  public subIndicadores: HasMany<typeof TblSubIndicadores>

  @hasMany(() => TblEvidencias, {
    localKey: 'id',
    foreignKey: 'formularioId',
  })
  public evidencias: HasMany<typeof TblEvidencias>
}

