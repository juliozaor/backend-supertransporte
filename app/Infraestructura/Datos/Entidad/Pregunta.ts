
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { Pregunta } from 'App/Dominio/Datos/Entidades/Pregunta';
import Encuestas from './Encuesta';
import TbClasificacion from './Clasificacion';
import TblTiposPregunta from './TiposPregunta';
import Respuestas from './Respuesta';

export default class Preguntas extends BaseModel {
  public static table = 'preguntas';
  @column({ isPrimary: true, columnName: 'id_pregunta' })
  public id: number

  @column({ columnName: 'pregunta' }) public pregunta: string;
  @column({ columnName: 'estado' }) public estado: number;
  @column({ columnName: 'usuario_creacion' }) public usuarioCreacion: string;
  @column({ columnName: 'fecha_creacion' }) public fechaCreacion: DateTime;
  @column({ columnName: 'id_clasificacion' }) public idClasificacion: number;
  @column({ columnName: 'tipo_evidencia' }) public tipoEvidencia: string;
  @column({ columnName: 'id_encuesta' }) public idEncuesta: number;
  @column({ columnName: 'secuencia' }) public secuencia: string;

  @column({ columnName: 'tipo_pregunta_id' }) public tipoPreguntaId: number;
  @column({ columnName: 'adjuntable' }) public adjuntable: boolean;
  @column({ columnName: 'adjuntable_obligatorio' }) public adjuntableObligatorio: boolean;
  @column({ columnName: 'obligatoria' }) public obligatoria: boolean
  @column({ columnName: 'orden' }) public orden: number;
  @column({ columnName: 'tamanio' }) public tamanio?: number;

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
    this.tipoPreguntaId = pregunta.tipoPreguntaId
    this.adjuntable = pregunta.adjuntable
    this.adjuntableObligatorio = pregunta.adjuntableObligatorio
    this.obligatoria = pregunta.obligatoria
    this.orden = pregunta.orden
    this.tamanio = pregunta.tamanio
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
    this.tipoPreguntaId = pregunta.tipoPreguntaId
    this.adjuntable = pregunta.adjuntable
    this.adjuntableObligatorio = pregunta.adjuntableObligatorio
    this.obligatoria = pregunta.obligatoria
    this.orden = pregunta.orden
    this.tamanio = pregunta.tamanio
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
    pregunta.tipoPreguntaId = this.tipoPreguntaId 
    pregunta.adjuntable = this.adjuntable 
    pregunta.adjuntableObligatorio = this.adjuntableObligatorio 
    pregunta.obligatoria = this.obligatoria 
    pregunta.orden = this.orden 
    pregunta.tamanio = this.tamanio 
    return pregunta
  }



  @belongsTo(() => Encuestas, {
    localKey: 'id',
    foreignKey: 'idEncuesta',
  })
  public encuesta: BelongsTo<typeof Encuestas>

  @belongsTo(() => TbClasificacion, {
    localKey: 'id',
    foreignKey: 'idClasificacion',
  })
  public clasificacion: BelongsTo<typeof TbClasificacion>

  @belongsTo(() => TblTiposPregunta, {
    localKey: 'id',
    foreignKey: 'tipoPreguntaId',
  })
  public tiposPregunta: BelongsTo<typeof TblTiposPregunta>

  
  @hasMany(() => Respuestas, {
    localKey: 'id',
    foreignKey: 'idPregunta',
  })
  public respuesta: HasMany<typeof Respuestas>



}
