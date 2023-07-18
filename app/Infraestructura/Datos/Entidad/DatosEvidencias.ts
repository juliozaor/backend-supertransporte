import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { TblDetalleDatosEvidencias } from './DetalleEvidencias';
export class TblDatosEvidencias extends BaseModel {

  @column({ columnName: 'dae_id' }) public id?: number;
  @column({ columnName: 'dae_nombre' }) public nombre: string;
  @column({ columnName: 'dae_orden' }) public orden: number;
  @column({ columnName: 'dae_estado' }) public estado: boolean;
  @column({ columnName: 'dae_evidencia_id' }) public evidenciaId: number;
  @column({ columnName: 'dae_visible' }) public visible: boolean;
  @column({ columnName: 'dae_meses' }) public meses: string;



  @hasMany(() => TblDetalleDatosEvidencias, {
    localKey: 'id',
    foreignKey: 'datoEvidenciaId',
  })
  public detalleEvidencias: HasMany<typeof TblDetalleDatosEvidencias>
}
