/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { EstadoCarga } from 'App/Dominio/Datos/Entidades/EstadoCarga';
export default class TblEstadoCargas extends BaseModel {
  public static table = 'tbl_estado_cargas';

  @column({ isPrimary: true, columnName: 'esc_id' })
  public id: string

  @column({ columnName: 'esc_nombre' }) public nombre: string

  @column({ columnName: 'esc_estado' }) public estado: boolean

  @column.dateTime({ autoCreate: true, columnName: 'esc_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'esc_actualizacion' }) public updatedAt: DateTime

  public establecerEstadoCargaDb (estadoCarga: EstadoCarga) {
    this.id = estadoCarga.id
    this.nombre = estadoCarga.nombre
    this.estado = estadoCarga.estado??true
  }

  public establecerEstadoCargaConId (estadoCarga: EstadoCarga) {
    this.nombre = estadoCarga.nombre
    this.estado = estadoCarga.estado??true
  }

  public obtenerEstadoCarga (): EstadoCarga {
    const estadoCarga = new EstadoCarga()
    estadoCarga.id = this.id
    estadoCarga.nombre = this.nombre
    estadoCarga.estado = this.estado
    return estadoCarga
  }
}
