import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany} from '@ioc:Adonis/Lucid/Orm';
import TblDetallesClasificaciones from './detalleClasificacion';
import TblUsuarios from './Usuario';

export default class TblFilasColumnas extends BaseModel {
  public static table = 'tbl_filas_columnas';
  @column({ isPrimary: true, columnName: 'cls_id' })
  public id: number

@column({ columnName: 'cls_fila_clasificacion_id' }) public filaClasificacionId:number;
@column({ columnName: 'cls_columna_clasificacion_id' }) public columnaClasificacionId:number;
@column({ columnName: 'cls_estado' }) public estado:boolean;

/* @manyToMany(() => TblUsuarios, {
  localKey: 'id',
  pivotForeignKey: 'tdc_clasificacion_columna_id',
  relatedKey: 'id',
  pivotRelatedForeignKey: 'tdc_usuario_id', 
  pivotColumns: ['tdc_valor'],
  pivotTable: 'tbl_detalle_clasificaciones'
})
public usuario: ManyToMany<typeof TblUsuarios> */

/* @hasMany(() => TblDetallesClasificaciones, {
  localKey: 'id',
  pivotForeignKey: 'tdc_clasificacion_columna_id',
})
public filasDetalleClasificacion: HasMany<typeof TblDetallesClasificaciones> */

@hasMany(() => TblDetallesClasificaciones, {
  localKey: 'id',
  foreignKey: 'filaColumnaId',
})
public detalles: HasMany<typeof TblDetallesClasificaciones>


}
