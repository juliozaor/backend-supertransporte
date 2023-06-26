
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm';
import { Encuesta } from 'App/Dominio/Datos/Entidades/Encuesta';
import Reporte from './Reporte';
import Preguntas from './Pregunta';

export default class Encuestas extends BaseModel {
  public static table = 'encuestas';
  
  @column({ isPrimary: true, columnName: 'id_encuesta' })
  public id: number

@column({ columnName: 'nombre' }) public nombre:string;
@column({ columnName: 'descripcion' }) public descripcion:string;
@column({ columnName: 'fecha_inicio' }) public fechaInicio:DateTime;
@column({ columnName: 'fecha_fin' }) public fechaFin:DateTime;
@column({ columnName: 'usuario_creacion' }) public usuarioCreacion:string;
@column({ columnName: 'fecha_creacion' }) public fechaCreacion:DateTime;
@column({ columnName: 'categorizable' }) public categorizable?:boolean;
@column({ columnName: 'observacion' }) public observacion?:boolean;
@column({ columnName: 'logueo' }) public logueo?:boolean;

  
  public establecerEncuestaDb (encuesta: Encuesta) {
    this.id = encuesta.id
    this.nombre = encuesta.nombre
    this.descripcion = encuesta.descripcion
    this.fechaInicio = encuesta.fechaInicio
    this.fechaFin = encuesta.fechaFin
    this.usuarioCreacion = encuesta.usuarioCreacion
    this.fechaCreacion = encuesta.fechaCreacion
    this.categorizable = encuesta.categorizable
    this.observacion = encuesta.observacion
    this.logueo = encuesta.logueo
  }

  public estableceEncuestaConId (encuesta: Encuesta) {
    this.nombre = encuesta.nombre
    this.descripcion = encuesta.descripcion
    this.fechaInicio = encuesta.fechaInicio
    this.fechaFin = encuesta.fechaFin
    this.usuarioCreacion = encuesta.usuarioCreacion
    this.fechaCreacion = encuesta.fechaCreacion
    this.categorizable = encuesta.categorizable
    this.observacion = encuesta.observacion
    this.logueo = encuesta.logueo
  }

  public obtenerEncuesta (): Encuesta {
    const encuesta = new Encuesta()
    encuesta.id = this.id
    encuesta.descripcion = this.descripcion
    encuesta.fechaInicio = this.fechaInicio
    encuesta.fechaFin = this.fechaFin
    encuesta.usuarioCreacion = this.usuarioCreacion
    encuesta.fechaCreacion = this.fechaCreacion
    encuesta.categorizable = this.categorizable
    encuesta.observacion = this.observacion
    encuesta.logueo = this.logueo
    return encuesta
  }

  @hasMany(() => Reporte, {
    localKey: 'id',
    foreignKey: 'idEncuesta',
  })
  public reportes: HasMany<typeof Reporte>

  @hasMany(() => Preguntas, {
    localKey: 'id',
    foreignKey: 'idEncuesta',
  })
  public pregunta: HasMany<typeof Preguntas>

  


}
