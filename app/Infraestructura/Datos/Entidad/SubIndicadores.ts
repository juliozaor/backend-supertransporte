import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { TblIndicadores } from './Indicadores';
import { TblFormulariosIndicadores } from './FormularioIndicadores';
import { TblPeriodos } from './Periodos';
import { TblDatosIndicadores } from './DatosIndicadores';
export class TblSubIndicadores extends BaseModel {

  @column({ columnName: 'sub_id' }) public id?: number;
  @column({ columnName: 'sub_nombre' }) public nombre: string;
  @column({ columnName: 'sub_codigo' }) public codigo: string;
  @column({ columnName: 'sub_orden' }) public orden: number;
  @column({ columnName: 'sub_indicador_id' }) public indicadorId: number;
  @column({ columnName: 'sub_formulario_id' }) public formularioId: number;
  @column({ columnName: 'sub_periodo_id' }) public periodoId: number;
  @column({ columnName: 'sub_estado' }) public estado: boolean;
  @column({ columnName: 'sub_obligatorio' }) public obligatorio?: boolean;

  @belongsTo(() => TblIndicadores, {
    localKey: 'id',
    foreignKey: 'indicadorId',
  })
  public indicadores: BelongsTo<typeof TblIndicadores>

  @belongsTo(() => TblFormulariosIndicadores, {
    localKey: 'id',
    foreignKey: 'formularioId',
  })
  public formulario: BelongsTo<typeof TblFormulariosIndicadores>

  @belongsTo(() => TblPeriodos, {
    localKey: 'id',
    foreignKey: 'periodoId',
  })
  public periodo: BelongsTo<typeof TblPeriodos>

  @hasMany(() => TblDatosIndicadores, {
    localKey: 'id',
    foreignKey: 'subIndicadorId',
  })
  public datosIndicadores: HasMany<typeof TblDatosIndicadores>
}
