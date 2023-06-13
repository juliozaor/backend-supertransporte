
import { DateTime } from 'luxon';
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany} from '@ioc:Adonis/Lucid/Orm';
import { Clasificaciones } from 'App/Dominio/Datos/Entidades/Clasificaciones';
import TbClasificacion from './Clasificacion';

export default class TblClasificaciones extends BaseModel {
  public static table = 'tbl_clasificaciones';
  @column({ isPrimary: true, columnName: 'cla_id' })
  public id: number

@column({ columnName: 'cla_nombre' }) public nombre:string;
@column({ columnName: 'cla_descripcion' }) public descripcion:string;
@column({ columnName: 'cla_pasos' }) public pasos:number;
@column({ columnName: 'cla_clasificado' }) public clasificado:boolean;


  
  public establecerClasificacionesDb (clasificaciones: Clasificaciones) {
    this.id = clasificaciones.id
    this.nombre = clasificaciones.nombre
    this.descripcion = clasificaciones.descripcion
    this.pasos = clasificaciones.pasos
    this.clasificado = clasificaciones.clasificado
  }

  public estableceClasificacionesConId (clasificaciones: Clasificaciones) {
    this.nombre = clasificaciones.nombre
    this.descripcion = clasificaciones.descripcion
    this.pasos = clasificaciones.pasos
    this.clasificado = clasificaciones.clasificado
  }

  public obtenerClasificaciones (): Clasificaciones {
    const clasificaciones = new Clasificaciones()
     clasificaciones.nombre = this.nombre 
     clasificaciones.descripcion = this.descripcion 
     clasificaciones.pasos = this.pasos 
     clasificaciones.clasificado = this.clasificado 
    return clasificaciones
  }

  @manyToMany(() => TbClasificacion, {
    localKey: 'id',
    pivotForeignKey: 'tcc_clasificaciones_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tcc_clasificacion_id', 
    pivotColumns: ['tcc_estado'],
    pivotTable: 'tbl_clasificacion_clasificaciones'
  })
  public clasificacion: ManyToMany<typeof TbClasificacion>


}
