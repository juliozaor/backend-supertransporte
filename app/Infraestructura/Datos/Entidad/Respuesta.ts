
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import Preguntas from './Pregunta';
import Reporte from './Reporte';

export default class Respuestas extends BaseModel {
  @column({ isPrimary: true, columnName: 'id_respuesta' })
  public id?: number
  @column({ columnName: 'id_pregunta' }) public idPregunta: number;
  @column({ columnName: 'valor' }) public valor: string;
  @column({ columnName: 'documento' }) public documento?: string;
  @column({ columnName: 'usuario_actualizacion' }) public usuarioActualizacion: string;
  @column({ columnName: 'fecha_actualizacion' }) public fechaActualizacion: DateTime;
  @column({ columnName: 'id_reporte' }) public idReporte: number;
  @column({ columnName: 'ruta' }) public ruta?: string;
  @column({ columnName: 'nombredoc_original' }) public nombredocOriginal?: string;
  @column({ columnName: 'observacion' }) public observacion?: string;
  @column({ columnName: 'cumple' }) public cumple?: number;
  @column({ columnName: 'observacion_cumple' }) public observacionCumple?: string;
  @column({ columnName: 'corresponde' }) public corresponde?: number;
  @column({ columnName: 'observacion_corresponde' }) public observacionCorresponde?: string;

  public establecerRespuestaDb(respuesta: Respuesta) {
    this.id = respuesta.id
    this.idPregunta = respuesta.idPregunta
    this.valor = respuesta.valor
    this.documento = respuesta.documento
    this.usuarioActualizacion = respuesta.usuarioActualizacion
    this.fechaActualizacion = respuesta.fechaActualizacion
    this.idReporte = respuesta.idReporte
    this.ruta = respuesta.ruta
    this.nombredocOriginal = respuesta.nombredocOriginal
    this.observacion= respuesta.observacion
    this.cumple= respuesta.cumple
    this.observacionCumple= respuesta.observacionCumple
    this.corresponde= respuesta.corresponde
    this.observacionCorresponde= respuesta.observacionCorresponde
  }

  public estableceRespuestaConId(respuesta: Respuesta) {
    this.idPregunta = respuesta.idPregunta
    this.valor = respuesta.valor
    this.documento = respuesta.documento
    this.usuarioActualizacion = respuesta.usuarioActualizacion
    this.fechaActualizacion = respuesta.fechaActualizacion
    this.idReporte = respuesta.idReporte
    this.ruta = respuesta.ruta
    this.nombredocOriginal = respuesta.nombredocOriginal
    this.observacion= respuesta.observacion
    this.cumple= respuesta.cumple
    this.observacionCumple= respuesta.observacionCumple
    this.corresponde= respuesta.corresponde
    this.observacionCorresponde= respuesta.observacionCorresponde
  }

  public estableceVerificacion(respuesta: Respuesta) {
    this.cumple= respuesta.cumple
    this.observacionCumple= respuesta.observacionCumple
    this.corresponde= respuesta.corresponde
    this.observacionCorresponde= respuesta.observacionCorresponde
  }

  public obtenerRespuesta(): Respuesta {
    const respuesta = new Respuesta()
    respuesta.id = this.id
    respuesta.idPregunta = this.idPregunta
    respuesta.valor = this.valor
    respuesta.documento = this.documento
    respuesta.usuarioActualizacion = this.usuarioActualizacion
    respuesta.fechaActualizacion = this.fechaActualizacion
    respuesta.idReporte = this.idReporte
    respuesta.ruta = this.ruta
    respuesta.nombredocOriginal = this.nombredocOriginal
    respuesta.observacion = this.observacion
    respuesta.cumple = this.cumple
    respuesta.observacionCumple = this.observacionCumple
    respuesta.corresponde = this.corresponde
    respuesta.observacionCorresponde = this.observacionCorresponde
    return respuesta
  }


  @hasMany(() => Reporte, {
    localKey: 'idReporte',
    foreignKey: 'id',
  })
  public reporte: HasMany<typeof Reporte>


}
