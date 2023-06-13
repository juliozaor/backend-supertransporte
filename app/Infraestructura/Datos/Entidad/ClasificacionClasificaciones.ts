import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';


export default class TblClasificacionClasificacioens extends BaseModel {
  public static table = 'tbl_clasificacion_clasificaciones';
  @column({ isPrimary: true, columnName: 'tcc_id' })
  public id: number

@column({ columnName: 'tcc_clasificaciones_id' }) public clasificacionesId:number;
@column({ columnName: 'tcc_clasificacion_id' }) public clasificacionId:number;
@column({ columnName: 'tcc_estado' }) public estado:boolean;



}
