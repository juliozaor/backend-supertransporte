/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { FormatoArchivo } from 'App/Dominio/Datos/Entidades/FormatoArchivo';

export default class TblFormatoArchivo extends BaseModel {
  @column({ isPrimary: true, columnName: 'for_id' })
  public id: string

  @column({ columnName: 'for_formato' }) public formato: string

  @column({columnName: 'for_estado'}) public estado: boolean

  @column.dateTime({ autoCreate: true , columnName: 'for_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'for_actualizacion' }) public updatedAt: DateTime

  public establecerFormatoArchivoDb (formatoArchivo: FormatoArchivo) {
    this.id = formatoArchivo.id
    this.formato = formatoArchivo.formato
    this.estado = formatoArchivo.estado
  }

  public establecerFormatoArchivoConId (formatoArchivo: FormatoArchivo) {
    this.formato = formatoArchivo.formato
    this.estado = formatoArchivo.estado
  }

  public obtenerFormatoArchivo (): FormatoArchivo {
    const formatoArchivo = new FormatoArchivo()
    formatoArchivo.id = this.id
    formatoArchivo.formato = this.formato
    formatoArchivo.estado = this.estado

    return formatoArchivo
  }
}
