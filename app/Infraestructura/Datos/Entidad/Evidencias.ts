import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { TblDatosEvidencias } from './DatosEvidencias';
import { TblSubTipoDatos } from './SubTipoDato';
export class TblEvidencias extends BaseModel {

  @column({ columnName: 'evi_id' }) public id?: number;
  @column({ columnName: 'evi_nombre' }) public nombre: string;
  @column({ columnName: 'evi_orden' }) public orden: number;
  @column({ columnName: 'evi_formulario_id' }) public formularioId: number;
  @column({ columnName: 'evi_sub_tipo_id' }) public subTipoId: number;
  @column({ columnName: 'evi_periodo_id' }) public periodoId: number;
  @column({ columnName: 'evi_tamanio' }) public tamanio?: number;
  @column({ columnName: 'evi_estado' }) public estado: boolean;
  @column({ columnName: 'evi_obligatorio' }) public obligatorio?: boolean;

  @hasMany(() => TblDatosEvidencias, {
    localKey: 'id',
    foreignKey: 'evidenciaId',
  })
  public datosEvidencias: HasMany<typeof TblDatosEvidencias>

  @belongsTo(() => TblSubTipoDatos, {
    localKey: 'id',
    foreignKey: 'subTipoId',
  })
  public subTipoDato: BelongsTo<typeof TblSubTipoDatos>

}
