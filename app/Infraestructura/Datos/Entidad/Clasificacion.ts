
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm';
import { Clasificacion } from 'App/Dominio/Datos/Entidades/Clasificacion';
import Preguntas from './Pregunta';

export default class TbClasificacion extends BaseModel {
  public static table = 'tb_clasificacion';
  @column({ isPrimary: true, columnName: 'id_clasificacion' })
  public id: number

@column({ columnName: 'nombre' }) public nombre:string;
@column({ columnName: 'estado' }) public estado:number;
@column({ columnName: 'usuario_creacion' }) public usuarioCreacion:string;
@column({ columnName: 'fecha_creacion' }) public fechaCreacion:DateTime;
  
  public establecerClasificacionDb (clasificacion: Clasificacion) {
    this.id = clasificacion.id
    this.nombre = clasificacion.nombre
    this.estado = clasificacion.estado
    this.usuarioCreacion = clasificacion.usuarioCreacion
    this.fechaCreacion = clasificacion.fechaCreacion
  }

  public estableceClasificacionConId (clasificacion: Clasificacion) {
    this.nombre = clasificacion.nombre
    this.estado = clasificacion.estado
    this.usuarioCreacion = clasificacion.usuarioCreacion
    this.fechaCreacion = clasificacion.fechaCreacion
  }

  public obtenerClasificacion (): Clasificacion {
    const clasificacion = new Clasificacion()
    clasificacion.id = this.id
    clasificacion.estado = this.estado
    clasificacion.usuarioCreacion = this.usuarioCreacion
    clasificacion.fechaCreacion = this.fechaCreacion
    return clasificacion
  }

  @hasMany(() => Preguntas, {
    localKey: 'id',
    foreignKey: 'idClasificacion',
  })
  public pregunta: HasMany<typeof Preguntas>

}
