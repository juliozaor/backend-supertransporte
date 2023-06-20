import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import { Modalidad } from 'App/Dominio/Datos/Entidades/Modalidad';
import TblRadioAccion from './RadioAccion';

export default class TblModalidades extends BaseModel {
  public static table = 'tb_modalidades';
  @column({ isPrimary: true, columnName: 'id_mod' })
  public id: number
  @column({ columnName: 'nombre' }) public nombre: string;
  @column({ columnName: 'abreviatura' }) public abreviatura: string;
  @column({ columnName: 'estado' }) public estado: number;

  public establecerModalidadDb(modalidad: Modalidad) {
    this.id = modalidad.id
    this.nombre = modalidad.nombre
    this.abreviatura = modalidad.abreviatura
    this.estado = modalidad.estado
  }

  public estableceModalidadConId(modalidad: Modalidad) {
    this.nombre = modalidad.nombre
    this.abreviatura = modalidad.abreviatura
    this.estado = modalidad.estado
  }

  public obtenerModalidad(): Modalidad {
    const modalidad = new Modalidad()
    modalidad.id = this.id
    modalidad.nombre = `${this.nombre} (${this.abreviatura})`
    modalidad.abreviatura = this.abreviatura
    modalidad.estado = this.estado
    return modalidad
  }

  @manyToMany(() => TblRadioAccion, {
  localKey: 'id',
  pivotForeignKey: 'tmr_modalidad_id',
  relatedKey: 'id',
  pivotRelatedForeignKey: 'tmr_radio_id', 
  pivotColumns:['tmr_id'],
  pivotTable: 'tbl_modalidades_radios'
})
public radios: ManyToMany<typeof TblRadioAccion>


}
