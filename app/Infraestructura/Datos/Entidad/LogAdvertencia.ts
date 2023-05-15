/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { LogAdvertencia } from 'App/Dominio/Datos/Entidades/LogAdvertencia';

export default class TblLogsAdvertencias extends BaseModel {
  @column({ isPrimary: true, columnName: 'adv_id' })
  public id: string

  @column({ columnName: 'adv_json_advertencia' }) public advertencia: JSON

  @column({ columnName: 'adv_carga_datos_id' }) public idCarga: string

  @column({columnName: 'adv_almacenado'}) public almacenado: boolean

  @column({columnName: 'adv_estado'}) public estado: boolean

  @column.dateTime({ autoCreate: true , columnName: 'adv_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'adv_actualizacion' }) public updatedAt: DateTime

  public establecerLogAdvertenciaDb (logAdvertencia: LogAdvertencia) {
    this.id = logAdvertencia.id
    this.advertencia = logAdvertencia.advertencia
    this.idCarga = logAdvertencia.idCarga
    this.almacenado = logAdvertencia.almacenado
    this.estado = logAdvertencia.estado
  }

  public establecerLogAdvertenciaConId (logAdvertencia: LogAdvertencia) {
    this.advertencia = logAdvertencia.advertencia
    this.idCarga = logAdvertencia.idCarga
    this.almacenado = logAdvertencia.almacenado
    this.estado = logAdvertencia.estado
  }

  public obtenerLogAdvertencia (): LogAdvertencia {
    const logAdvertencia = new LogAdvertencia()
    logAdvertencia.id = this.id
    logAdvertencia.advertencia = this.advertencia
    logAdvertencia.idCarga = this.idCarga
    logAdvertencia.almacenado = this.almacenado
    logAdvertencia.estado = this.estado

    return logAdvertencia
  }
}
