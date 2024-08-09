import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import { ModalidadRadio } from 'App/Dominio/Datos/Entidades/ModalidadRadio';
import TblModalidades from './modalidad';

export default class TblModalidadesRadios extends BaseModel {
  public static table = 'tbl_modalidades_radios';
  @column({ isPrimary: true, columnName: 'tmr_id' })
  public id?: number

  @column({ columnName: 'tmr_modalidad_id' }) public modalidadId: number
  @column({ columnName: 'tmr_radio_id' }) public radioId: number
  @column({ columnName: 'tmr_usuario_id' }) public usuarioId: string
  @column({ columnName: 'tmr_estado' }) public estado: boolean
  @column({ columnName: 'tmr_vigencia' }) public vigencia: number

  @column.dateTime({ autoCreate: true , columnName: 'tmr_creado'}) public createdAt?: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'tmr_actualizado' }) public updatedAt?: DateTime

  public establecerModalidadRadioDb(modalidadRadio: ModalidadRadio) {
    this.modalidadId = modalidadRadio.modalidadId
    this.radioId =modalidadRadio.radioId
    this.usuarioId = modalidadRadio.usuarioId
    this.estado = modalidadRadio.estado
    this.vigencia = modalidadRadio.vigencia
    
  }

  @belongsTo(() => TblModalidades, {
    localKey: 'id',
    foreignKey: 'modalidadId',
  })
  public modalidades: BelongsTo<typeof TblModalidades>

}
