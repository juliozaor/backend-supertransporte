/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { LogExito } from 'App/Dominio/Datos/Entidades/LogExito';

export default class TblLogsExitos extends BaseModel {
  @column({ isPrimary: true, columnName: 'exi_id' })
  public id: string

  @column({ columnName: 'exi_json_exito' }) public exito: JSON

  @column({ columnName: 'exi_carga_datos_id' }) public idCarga: string

  @column({columnName: 'exi_estado'}) public estado: boolean

  @column.dateTime({ autoCreate: true , columnName: 'exi_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'exi_actualizacion' }) public updatedAt: DateTime

  public establecerLogExitoDb (logExito: LogExito) {
    this.id = logExito.id
    this.exito = logExito.exito
    this.idCarga = logExito.idCarga
    this.estado = logExito.estado
  }

  public establecerLogExitoConId (logExito: LogExito) {
    this.exito = logExito.exito
    this.idCarga = logExito.idCarga
    this.estado = logExito.estado
  }

  public obtenerLogExito (): LogExito {
    const logExito = new LogExito()
    logExito.id = this.id
    logExito.exito = this.exito
    logExito.idCarga = this.idCarga
    logExito.estado = this.estado

    return logExito
  }
}
