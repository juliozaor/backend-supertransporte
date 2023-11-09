import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblEstadosReportes extends BaseModel {
  @column({ columnName: 'id' })
  public id?: number;
  @column({ columnName: 'reporte' })
  public reporte: number;
  @column({ columnName: 'estado' })
  public estado: number;
  @column({ columnName: 'vigencia' })
  public vigencia: number;
  @column({ columnName: 'mes' })
  public mes: number;
  @column({ columnName: 'enviost' }) public fechaEnviost?: DateTime;

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public actualizacion: DateTime

}


