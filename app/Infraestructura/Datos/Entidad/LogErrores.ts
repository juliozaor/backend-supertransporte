/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { LogErrores } from 'App/Dominio/Datos/Entidades/LogErrores';

export default class TblLogsErrores extends BaseModel {
  @column({ isPrimary: true, columnName: 'err_id' })
  public id: string

  @column({ columnName: 'err_json_error' }) public error: string

  @column({ columnName: 'err_carga_datos_id' }) public idCarga: string

  @column({columnName: 'err_tipo'}) public tipo: string

  @column({columnName: 'err_estado'}) public estado: boolean

  @column.dateTime({ autoCreate: true , columnName: 'err_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'err_actualizacion' }) public updatedAt: DateTime

  public establecerLogErroresDb (logErrores: LogErrores) {
    this.id = logErrores.id
    this.error = logErrores.error
    this.idCarga = logErrores.idCarga
    this.tipo = logErrores.tipo
    this.estado = logErrores.estado
  }

  public establecerLogErroresConId (logErrores: LogErrores) {
    this.error = logErrores.error
    this.idCarga = logErrores.idCarga
    this.tipo = logErrores.tipo
    this.estado = logErrores.estado
  }

  public obtenerLogErrores (): LogErrores {
    const logErrores = new LogErrores()
    logErrores.id = this.id
    logErrores.error = this.error
    logErrores.idCarga = this.idCarga
    logErrores.tipo = this.tipo
    logErrores.estado = this.estado

    return logErrores
  }
}
