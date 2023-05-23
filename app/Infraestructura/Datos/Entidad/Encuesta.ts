
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm';
import { Encuesta } from 'App/Dominio/Datos/Entidades/Encuesta';
import Reporte from './Reporte';

export default class Encuestas extends BaseModel {
  @column({ isPrimary: true, columnName: 'id_encuesta' })
  public id: number

@column({ columnName: 'nombre' }) public nombre:string;
@column({ columnName: 'descripcion' }) public descripcion:string;
@column({ columnName: 'fecha_inicio' }) public fechaInicio:DateTime;
@column({ columnName: 'fecha_fin' }) public fechaFin:DateTime;
@column({ columnName: 'usuario_creacion' }) public usuarioCreacion:string;
@column({ columnName: 'fecha_creacion' }) public fechaCreacion:DateTime;
  
  public establecerEncuestaDb (encuesta: Encuesta) {
    this.id = encuesta.id
    this.nombre = encuesta.nombre
    this.descripcion = encuesta.descripcion
    this.fechaInicio = encuesta.fechaInicio
    this.fechaFin = encuesta.fechaFin
    this.usuarioCreacion = encuesta.usuarioCreacion
    this.fechaCreacion = encuesta.fechaCreacion
  }

  public estableceEncuestaConId (encuesta: Encuesta) {
    this.nombre = encuesta.nombre
    this.descripcion = encuesta.descripcion
    this.fechaInicio = encuesta.fechaInicio
    this.fechaFin = encuesta.fechaFin
    this.usuarioCreacion = encuesta.usuarioCreacion
    this.fechaCreacion = encuesta.fechaCreacion
  }

  public obtenerEncuesta (): Encuesta {
    const encuesta = new Encuesta()
    encuesta.id = this.id
    encuesta.descripcion = this.descripcion
    encuesta.fechaInicio = this.fechaInicio
    encuesta.fechaFin = this.fechaFin
    encuesta.usuarioCreacion = this.usuarioCreacion
    encuesta.fechaCreacion = this.fechaCreacion
    return encuesta
  }

  @hasMany(() => Reporte)
  public reportes: HasMany<typeof Reporte>

}
