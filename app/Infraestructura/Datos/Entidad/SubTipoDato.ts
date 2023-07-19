import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import { TblTipoDatos } from './TipoDato';
export class TblSubTipoDatos extends BaseModel {
  @column({ columnName: 'sds_id' })
  public id?: number;
  @column({ columnName: 'sds_nombre' })
  public nombre: string; 
  @column({ columnName: 'sds_tipo_id' })
  public tipoId: number; 
  @column({ columnName: 'sds_decimales' })
  public decimales: number; 
  @column({ columnName: 'sds_estado' })
  public estado: boolean; 

  @belongsTo(() => TblTipoDatos, {
    localKey: 'id',
    foreignKey: 'tipoId',
  })
  public tipoDato: BelongsTo<typeof TblTipoDatos>
}
