import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DetalleDatos } from 'App/Dominio/Datos/Entidades/DetalleDatos';
import { DateTime } from 'luxon';
export class TblDetalleDatos extends BaseModel {
  @column({ columnName: 'ddt_id' }) public id?: number;
  @column({ columnName: 'ddt_dato_indicador_id' }) public datoIndicadorId: number;
  @column({ columnName: 'ddt_estado' }) public estado?: boolean;
  @column({ columnName: 'ddt_valor' }) public valor: number;
  @column({ columnName: 'ddt_anio_activo_id' }) public anioActivoId: number;
  @column({ columnName: 'ddt_reporte_id' }) public reporteId: number;
  @column({ columnName: 'ddt_fecha_actualizacion' }) public fechaActualizacion: DateTime;
  @column({ columnName: 'ddt_documento' }) public documento?: string;
  @column({ columnName: 'ddt_ruta' }) public ruta?: string;
  @column({ columnName: 'ddt_nombredoc_original' }) public nombredocOriginal?: string;
  @column({ columnName: 'ddt_observacion' }) public observacion?: string;


  public establecerDetalleDatosDb(detalleDatos: DetalleDatos) {
    this.id = detalleDatos.id
    this.datoIndicadorId = detalleDatos.datoIndicadorId
    this.estado = detalleDatos.estado
    this.valor = detalleDatos.valor
    this.anioActivoId = detalleDatos.anioActivoId
    this.reporteId = detalleDatos.reporteId
    this.fechaActualizacion = detalleDatos.fechaActualizacion
    this.documento = detalleDatos.documento
    this.ruta = detalleDatos.ruta
    this.nombredocOriginal = detalleDatos.nombredocOriginal
    this.observacion = detalleDatos.observacion

  }

  public estableceDetalleDatosConId(detalleDatos: DetalleDatos) {
    this.datoIndicadorId = detalleDatos.datoIndicadorId
    this.estado = detalleDatos.estado
    this.valor = detalleDatos.valor
    this.anioActivoId = detalleDatos.anioActivoId
    this.reporteId = detalleDatos.reporteId
    this.fechaActualizacion = detalleDatos.fechaActualizacion
    this.documento = detalleDatos.documento
    this.ruta = detalleDatos.ruta
    this.nombredocOriginal = detalleDatos.nombredocOriginal
    this.observacion = detalleDatos.observacion

  }


  public obtenerDetalleDatos(): DetalleDatos {
    const detalleDatos = new DetalleDatos()
    detalleDatos.datoIndicadorId = this.datoIndicadorId 
    detalleDatos.estado = this.estado 
    detalleDatos.valor = this.valor 
    detalleDatos.anioActivoId = this.anioActivoId 
    detalleDatos.reporteId = this.reporteId 
    detalleDatos.fechaActualizacion = this.fechaActualizacion 
    detalleDatos.documento = this.documento 
    detalleDatos.ruta = this.ruta 
    detalleDatos.nombredocOriginal = this.nombredocOriginal 
    detalleDatos.observacion = this.observacion 
    return detalleDatos
  }



}

