import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import { LogEmpresa } from 'App/Dominio/Datos/Entidades/LogEmpresa';
export class TblLogEmpresas extends BaseModel {
  @column({ columnName: 'tle_id' }) public id?: number;
  @column({ columnName: 'tle_empresa' }) public idEmpresa: string;
  @column({ columnName: 'tle_vigilado' }) public idVigilado: string;
  @column({ columnName: 'tle_estado' }) public estado: number;
  @column({ columnName: 'tle_encuesta' }) public encuesta: number;
  @column({ columnName: 'tle_enviost' }) public fechaEnviost?: DateTime;

  

  @column.dateTime({ autoCreate: true, columnName: 'tev_created_at' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'tev_updated_at' })
  public actualizacion: DateTime
  

}

