import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { TblDatosEvidencias } from './DatosEvidencias';
export class TblEvidencias extends BaseModel {

  @column({ columnName: 'evi_id' }) public id?: number;
  @column({ columnName: 'evi_nombre' }) public nombre: string;
  @column({ columnName: 'evi_orden' }) public orden: number;
  @column({ columnName: 'evi_formulario_id' }) public formularioId: number;
  @column({ columnName: 'evi_periodo_id' }) public periodoId: number;
  @column({ columnName: 'evi_estado' }) public estado: boolean;

  @hasMany(() => TblDatosEvidencias, {
    localKey: 'id',
    foreignKey: 'evidenciaId',
  })
  public datosEvidencias: HasMany<typeof TblDatosEvidencias>
}
