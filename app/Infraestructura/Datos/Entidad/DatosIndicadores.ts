import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { TblSubIndicadores } from './SubIndicadores';
import { TblDetalleDatos } from './DetalleDatos';
export class TblDatosIndicadores extends BaseModel {

  @column({ columnName: 'dai_id' }) public id?: number;
  @column({ columnName: 'dai_nombre' }) public nombre: string;
  @column({ columnName: 'dai_tipo_id' }) public tipoId: number;
  @column({ columnName: 'dai_orden' }) public orden: number;
  @column({ columnName: 'dai_estado' }) public estado: boolean;
  @column({ columnName: 'dai_sub_indicador_id' }) public subIndicadorId: number;
  @column({ columnName: 'dai_visible' }) public visible: boolean;

  @belongsTo(() => TblSubIndicadores, {
    localKey: 'id',
    foreignKey: 'subIndicadorId',
  })
  public subIndicador: BelongsTo<typeof TblSubIndicadores>

  @hasMany(() => TblDetalleDatos, {
    localKey: 'id',
    foreignKey: 'datoIndicadorId',
  })
  public detalleDatos: HasMany<typeof TblDetalleDatos>
}
