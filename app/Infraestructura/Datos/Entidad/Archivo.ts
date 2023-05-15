/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { Archivo } from 'App/Dominio/Datos/Entidades/Archivo';
export default class TblArchivos extends BaseModel {
  @column({ isPrimary: true, columnName: 'arc_id' })
  public id: string

  @column({ columnName: 'arc_nombre' }) public nombre: string

  @column({ columnName: 'arc_tipo' }) public tipo: string

  @column({ columnName: 'arc_estado' }) public estado: boolean

  @column({ columnName: 'arc_prefijo' }) public prefijo: string

  @column({ columnName: 'arc_prefijo_archivo' }) public prefijoArchivo: string

  @column.dateTime({ autoCreate: true, columnName: 'arc_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'arc_actualizacion' }) public updatedAt: DateTime

  public establecerArchivoDb (archivo: Archivo) {
    this.id = archivo.id
    this.nombre = archivo.nombre
    this.tipo = archivo.tipo
    this.prefijo = archivo.prefijo
    this.prefijoArchivo = archivo.prefijoArchivo
    this.estado = archivo.estado
  }

  public establecerArchivoConId (archivo: Archivo) {
    this.nombre = archivo.nombre
    this.tipo = archivo.tipo
    this.prefijo = archivo.prefijo
    this.prefijoArchivo = archivo.prefijoArchivo
    this.estado = archivo.estado
  }

  public obtenerArchivo (): Archivo {
    const archivo = new Archivo()
    archivo.id = this.id
    archivo.nombre = this.nombre
    archivo.tipo = this.tipo
    archivo.prefijo = this.prefijo
    archivo.prefijoArchivo = this.prefijoArchivo
    archivo.estado = this.estado
    return archivo
  }
}
