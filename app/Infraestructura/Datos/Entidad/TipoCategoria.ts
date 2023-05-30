
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm';
import TbCategoriasClasificaciones from './CategoriaClasificacion';

export default class TblTiposCategorias extends BaseModel {
  public static table = 'tbl_tipos_categorias';
  @column({ isPrimary: true, columnName: 'ttc_id' })
  public id: number

@column({ columnName: 'ttc_nombre' }) public nombre:string;
@column({ columnName: 'ttc_orden' }) public orden:number;
@column({ columnName: 'ttc_estado' }) public estado:boolean;

@hasMany(() => TbCategoriasClasificaciones, {
  localKey: 'id',
  foreignKey: 'tipoCategoriaId',
})
public categoriaClasificacion: HasMany<typeof TbCategoriasClasificaciones>


}
