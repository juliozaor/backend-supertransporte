import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import { RadioAccion } from 'App/Dominio/Datos/Entidades/RadioAccion';
import TblModalidades from './modalidad';

export default class TblRadioAccion extends BaseModel {
  public static table = 'tb_radio_accion';
  @column({ isPrimary: true, columnName: 'id_radio' })
  public id: number
  @column({ columnName: 'nombre' }) public nombre: string;
  @column({ columnName: 'estado' }) public estado: number;

  public establecerRadioAccionDb(radio: RadioAccion) {
    this.id = radio.id
    this.nombre = radio.nombre
    this.estado = radio.estado
  }

  public estableceRadioAccionConId(radio: RadioAccion) {
    this.nombre = radio.nombre
    this.estado = radio.estado
  }

  public obtenerRadioAccion(): RadioAccion {
    const radio = new RadioAccion()
    radio.id = this.id
    radio.nombre = this.nombre
    radio.estado = this.estado
    return radio
  }

  @manyToMany(() => TblModalidades, {
    localKey: 'id',
    pivotForeignKey: 'tmr_radio_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tmr_modalidad_id', 
    pivotColumns:['tmr_id'],
    pivotTable: 'tbl_modalidades_radios'
  })
  public modalidades: ManyToMany<typeof TblModalidades>

  @manyToMany(() => TblModalidades, {
    localKey: 'id',
    pivotForeignKey: 'trr_radio_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'trr_modalidad_id', 
    pivotTable: 'tbl_restriccion_radios'
  })
  public restriccion: ManyToMany<typeof TblModalidades>

}
