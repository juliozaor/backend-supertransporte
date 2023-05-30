import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';

export default class TblModalidadesRadios extends BaseModel {
  public static table = 'tbl_modalidades_radios';
  @column({ isPrimary: true, columnName: 'tmr_id' })
  public id: number

  @column({ columnName: 'tmr_modalidad_id' }) public modalidadId: number
  @column({ columnName: 'tmr_radio_id' }) public radioId: number
  @column({ columnName: 'tmr_usuario_id' }) public usuarioId: string

  @column.dateTime({ autoCreate: true , columnName: 'tmr_creado'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'tmr_actualizado' }) public updatedAt: DateTime

}
