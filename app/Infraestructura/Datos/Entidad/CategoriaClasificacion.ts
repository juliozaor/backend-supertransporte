
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm';
import TblFilasClasificaciones from './FilasClasificacion';

export default class TbCategoriasClasificaciones extends BaseModel {
  public static table = 'tbl_categorias_clasificaciones';
  @column({ isPrimary: true, columnName: 'tcc_id' })
  public id: number

@column({ columnName: 'tcc_nombre' }) public nombre:string;
@column({ columnName: 'tcc_titulo' }) public titulo:string;
@column({ columnName: 'tcc_orden' }) public orden:number;
@column({ columnName: 'tcc_estado' }) public estado:boolean;
@column({ columnName: 'tcc_tipo_categoria_id' }) public tipoCategoriaId:number;


@hasMany(() => TblFilasClasificaciones, {
  localKey: 'id',
  foreignKey: 'categoriaClasificacionId',
})
public filaClasificacion: HasMany<typeof TblFilasClasificaciones>
}
