import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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


}


