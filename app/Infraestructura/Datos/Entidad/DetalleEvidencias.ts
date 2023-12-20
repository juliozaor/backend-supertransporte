import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import { DetalleEvidencia } from '../../../Dominio/Datos/Entidades/DetalleEvidencias';
export class TblDetalleDatosEvidencias extends BaseModel {
  @column({ columnName: 'dde_id' }) public id?: number;
  @column({ columnName: 'dde_dato_evidencia_id' }) public datoEvidenciaId: number;
  @column({ columnName: 'dde_anio_activo_id' }) public anioActivoId: number;
  @column({ columnName: 'dde_reporte_id' }) public reporteId: number;
  @column({ columnName: 'dde_fecha_actualizacion' }) public fechaActualizacion: DateTime;
  @column({ columnName: 'dde_documento' }) public documento?: string;
  @column({ columnName: 'dde_ruta' }) public ruta?: string;
  @column({ columnName: 'dde_nombredoc_original' }) public nombredocOriginal?: string;
  @column({ columnName: 'dde_valor' }) public valor?: string;
  @column({ columnName: 'dde_estado' }) public estado?: boolean;
  @column({ columnName: 'dde_cumple' }) public cumple?: number;
  @column({ columnName: 'dde_observacion_cumple' }) public observacionCumple?: string;
  @column({ columnName: 'dde_corresponde' }) public corresponde?: number;
  @column({ columnName: 'dde_observacion_corresponde' }) public observacionCorresponde?: string;




  public establecerDetalleEvidenciaDb(detalleEvidencia: DetalleEvidencia) {
    this.id = detalleEvidencia.id
    this.datoEvidenciaId = detalleEvidencia.datoEvidenciaId
    this.estado = detalleEvidencia.estado
    this.anioActivoId = detalleEvidencia.anioActivoId
    this.reporteId = detalleEvidencia.reporteId
    this.fechaActualizacion = detalleEvidencia.fechaActualizacion
    this.documento = detalleEvidencia.documento
    this.ruta = detalleEvidencia.ruta
    this.valor = detalleEvidencia.valor
    this.nombredocOriginal = detalleEvidencia.nombredocOriginal
    this.cumple = detalleEvidencia.cumple
    this.observacionCumple = detalleEvidencia.observacionCumple
    this.corresponde = detalleEvidencia.corresponde
    this.observacionCorresponde = detalleEvidencia.observacionCorresponde

  }

  public estableceDetalleEvidenciaConId(detalleEvidencia: DetalleEvidencia) {
    this.datoEvidenciaId = detalleEvidencia.datoEvidenciaId
    this.estado = detalleEvidencia.estado
    this.anioActivoId = detalleEvidencia.anioActivoId
    this.reporteId = detalleEvidencia.reporteId
    this.fechaActualizacion = detalleEvidencia.fechaActualizacion
    this.documento = detalleEvidencia.documento
    this.ruta = detalleEvidencia.ruta
    this.valor = detalleEvidencia.valor
    this.nombredocOriginal = detalleEvidencia.nombredocOriginal
    this.cumple = detalleEvidencia.cumple
    this.observacionCumple = detalleEvidencia.observacionCumple
    this.corresponde = detalleEvidencia.corresponde
    this.observacionCorresponde = detalleEvidencia.observacionCorresponde
  }


  public obtenerDetalleEvidencia(): DetalleEvidencia {
    const detalleEvidencia = new DetalleEvidencia()
    detalleEvidencia.datoEvidenciaId = this.datoEvidenciaId
    detalleEvidencia.estado = this.estado
    detalleEvidencia.anioActivoId = this.anioActivoId
    detalleEvidencia.reporteId = this.reporteId
    detalleEvidencia.fechaActualizacion = this.fechaActualizacion
    detalleEvidencia.documento = this.documento
    detalleEvidencia.ruta = this.ruta
    detalleEvidencia.valor = this.valor
    detalleEvidencia.nombredocOriginal = this.nombredocOriginal
    detalleEvidencia.cumple = this.cumple
    detalleEvidencia.observacionCumple = this.observacionCumple
    detalleEvidencia.corresponde = this.corresponde
    detalleEvidencia.observacionCorresponde = this.observacionCorresponde
    return detalleEvidencia
  }

  public estableceVerificacion(detalleEvidencia: DetalleEvidencia) {
    this.cumple= detalleEvidencia.cumple
    this.observacionCumple= detalleEvidencia.observacionCumple
    this.corresponde= detalleEvidencia.corresponde
    this.observacionCorresponde= detalleEvidencia.observacionCorresponde
  }

}

