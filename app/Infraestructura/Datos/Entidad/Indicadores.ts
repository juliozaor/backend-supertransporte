import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import { TblSubIndicadores } from './SubIndicadores';

export class TblIndicadores extends BaseModel {
  @column({ columnName: 'ind_id' })
  public id?: number;
  @column({ columnName: 'ind_nombre' })
  public nombre: string;
  @column({ columnName: 'ind_descripcion' })
  public descripcion: string;
  @column({ columnName: 'ind_codigo' })
  public codigo: string;
  @column({ columnName: 'ind_estado' })
  public estado: boolean;

  @hasMany(() => TblSubIndicadores, {
    localKey: 'id',
    foreignKey: 'indicadorId',
  })
  public subIndicadores: HasMany<typeof TblSubIndicadores>
}



