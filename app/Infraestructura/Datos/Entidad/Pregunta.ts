
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { Pregunta } from 'App/Dominio/Datos/Entidades/Pregunta';
import Encuestas from './Encuesta';
import TbClasificacion from './Clasificacion';

export default class Preguntas extends BaseModel {
  @column({ isPrimary: true, columnName: 'id_pregunta' })
  public id: number

  @column({ columnName: 'pregunta' }) public pregunta: string;
  @column({ columnName: 'estado' }) public estado: number;
  @column({ columnName: 'usuario_creacion' }) public usuarioCreacion: string;
  @column({ columnName: 'fecha_creacion' }) public fechaCreacion: DateTime;
  @column({ columnName: 'idClasificacion' }) public idClasificacion: number;
  @column({ columnName: 'tipo_evidencia' }) public tipoEvidencia: string;
  @column({ columnName: 'id_encuesta' }) public idEncuesta: number;
  @column({ columnName: 'secuencia' }) public secuencia: string;

  public establecerPreguntaDb(pregunta: Pregunta) {
    this.id = pregunta.id
    this.pregunta = pregunta.pregunta
    this.estado = pregunta.estado
    this.usuarioCreacion = pregunta.usuarioCreacion
    this.fechaCreacion = pregunta.fechaCreacion
    this.idClasificacion = pregunta.idClasificacion
    this.tipoEvidencia = pregunta.tipoEvidencia
    this.idEncuesta = pregunta.idEncuesta
    this.secuencia = pregunta.secuencia
  }

  public establecePreguntaConId(pregunta: Pregunta) {
    this.pregunta = pregunta.pregunta
    this.estado = pregunta.estado
    this.usuarioCreacion = pregunta.usuarioCreacion
    this.fechaCreacion = pregunta.fechaCreacion
    this.idClasificacion = pregunta.idClasificacion
    this.tipoEvidencia = pregunta.tipoEvidencia
    this.idEncuesta = pregunta.idEncuesta
    this.secuencia = pregunta.secuencia
  }

  public obtenerPregunta(): Pregunta {
    const pregunta = new Pregunta()
    pregunta.id = this.id
    pregunta.pregunta = this.pregunta
    pregunta.estado = this.estado
    pregunta.usuarioCreacion = this.usuarioCreacion
    pregunta.fechaCreacion = this.fechaCreacion
    pregunta.idClasificacion = this.idClasificacion
    pregunta.tipoEvidencia = this.tipoEvidencia
    pregunta.idEncuesta = this.idEncuesta
    pregunta.secuencia = this.secuencia
    return pregunta
  }

  @hasMany(() => Encuestas, {
    localKey: 'idEncuesta',
    foreignKey: 'id',
  })
  public encuesta: HasMany<typeof Encuestas>

  @hasMany(() => TbClasificacion, {
    localKey: 'idClasificacion',
    foreignKey: 'id',
  })
  public clasificacion: HasMany<typeof TbClasificacion>


}
