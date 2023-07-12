import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { TblSubIndicadores } from './SubIndicadores';
export class TblDatosIndicadores extends BaseModel {

  @column({ columnName: 'dai_id' }) public id?: number;
  @column({ columnName: 'dai_nombre' }) public nombre: string;
  @column({ columnName: 'sub_tipo_id' }) public tipoId: number;
  @column({ columnName: 'dai_orden' }) public orden: number;
  @column({ columnName: 'dai_estado' }) public estado: boolean;
  @column({ columnName: 'dai_sub_indicador_id' }) public subIndicadorId: number;
  @column({ columnName: 'dai_visible' }) public visible: boolean;

  @belongsTo(() => TblSubIndicadores, {
    localKey: 'id',
    foreignKey: 'subIndicadorId',
  })
  public subIndicador: BelongsTo<typeof TblSubIndicadores>
}
