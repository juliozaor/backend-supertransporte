import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany} from '@ioc:Adonis/Lucid/Orm';
import TblColumnasClasificaciones from './ColumnaClasificacion';
import TblFilasColumnas from './FilasColumnas';

export default class TblFilasClasificaciones extends BaseModel {
  public static table = 'tbl_filas_clasificaciones';
  @column({ isPrimary: true, columnName: 'tfc_id' })
  public id: number

@column({ columnName: 'tfc_nombre' }) public nombre:string;
@column({ columnName: 'tfc_orden' }) public orden:number;
@column({ columnName: 'tfc_estado' }) public estado:boolean;
@column({ columnName: 'tfc_categoria_clasificacion_id' }) public categoriaClasificacionId:number;

@manyToMany(() => TblColumnasClasificaciones, {
  localKey: 'id',
  pivotForeignKey: 'cls_fila_clasificacion_id',
  relatedKey: 'id',
  pivotRelatedForeignKey: 'cls_columna_clasificacion_id', 
  pivotTable: 'tbl_filas_columnas'

})

public filasColumnasDet: ManyToMany<typeof TblColumnasClasificaciones>

@hasMany(() => TblFilasColumnas, {
  localKey: 'id',
  foreignKey: 'filaClasificacionId'
})
public filasColumas: HasMany<typeof TblFilasColumnas>

}
