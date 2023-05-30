
import { DateTime } from 'luxon';
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany} from '@ioc:Adonis/Lucid/Orm';
import TblFilasClasificaciones from './FilasClasificacion';

export default class TblColumnasClasificaciones extends BaseModel {
  public static table = 'tbl_columnas_clasificaciones';
  @column({ isPrimary: true, columnName: 'col_id' })
  public id: number

@column({ columnName: 'col_nombre' }) public nombre:string;
@column({ columnName: 'col_orden' }) public orden:number;
@column({ columnName: 'col_estado' }) public estado:boolean;

@manyToMany(() => TblFilasClasificaciones, {
  localKey: 'id',
  pivotForeignKey: 'cls_columna_clasificacion_id',
  relatedKey: 'id',
  pivotRelatedForeignKey: 'cls_fila_clasificacion_id', 
  pivotTable: 'tbl_filas_columnas'

})

public columnasFilas: ManyToMany<typeof TblFilasClasificaciones>

}
