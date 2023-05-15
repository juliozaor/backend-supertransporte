/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import { CargaArchivo } from 'App/Dominio/Datos/Entidades/CargaArchivo';
import Tblarchivos from 'App/Infraestructura/Datos/Entidad/Archivo';
import TblEstadoCargas from './EstadoCarga';
export default class TblCargaDatos extends BaseModel {

  @column({ isPrimary: true, columnName: 'car_id' }) public id: string

  @column({ columnName: 'car_nombre' }) public nombre: string

  @column({ columnName: 'car_estado' }) public estado: boolean

  @column({ columnName: 'car_fecha_inicial' }) public fechaInicial: DateTime
  @column({ columnName: 'car_fecha_final' }) public fechaFinal: DateTime
  @column({ columnName: 'car_usuario_id' }) public usuario: string
  @column({ columnName: 'car_archivo_id' }) public tipoArchivo: string
  @column({ columnName: 'car_registros_encontrados' }) public registrosEncontrados: number
  @column({ columnName: 'car_estado_proceso_id' }) public estadoProceso: number
  @column({ columnName: 'car_registros_fallidos' }) public registrosFallidos: number
  @column({ columnName: 'car_registros_insertados' }) public registrosInsertados: number
  @column({ columnName: 'car_empresa_id' }) public empresa: string


  @column.dateTime({ autoCreate: true, columnName: 'car_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'car_actualizacion' }) public updatedAt: DateTime

  public establecerCargaArcivoDb(cargaArchivo: CargaArchivo) {


    this.id = cargaArchivo.id
    this.nombre = cargaArchivo.nombre
    this.fechaInicial = cargaArchivo.fechaInicial
    this.fechaFinal = cargaArchivo.fechaFinal
    this.usuario = cargaArchivo.usuario
    this.tipoArchivo = cargaArchivo.tipoArchivo
    this.estadoProceso = cargaArchivo.estadoProceso
    this.registrosEncontrados = cargaArchivo.registrosEncontrados ?? 0
    this.registrosFallidos = cargaArchivo.registrosFallidos ?? 0
    this.registrosInsertados = cargaArchivo.registrosInsertados ?? 0
    this.estado = cargaArchivo.estado ?? true
    this.empresa = cargaArchivo.empresa ?? ''
  }

  public establecerCargaArcivoConId(cargaArchivo: CargaArchivo) {
    this.nombre = cargaArchivo.nombre
    this.fechaInicial = cargaArchivo.fechaInicial
    this.fechaFinal = cargaArchivo.fechaFinal
    this.usuario = cargaArchivo.usuario
    this.tipoArchivo = cargaArchivo.tipoArchivo
    this.estadoProceso = cargaArchivo.estadoProceso
    this.registrosEncontrados = cargaArchivo.registrosEncontrados ?? 0
    this.registrosFallidos = cargaArchivo.registrosFallidos ?? 0
    this.registrosInsertados = cargaArchivo.registrosInsertados ?? 0
    this.estado = cargaArchivo.estado ?? true
    this.empresa = cargaArchivo.empresa ?? ''
  }

  public obtenerCargaArcivo(): CargaArchivo {
    const cargaArchivo = new CargaArchivo()
    cargaArchivo.nombre = this.nombre
    cargaArchivo.fechaInicial = this.fechaInicial
    cargaArchivo.fechaFinal = this.fechaFinal
    cargaArchivo.usuario = this.usuario
    cargaArchivo.tipoArchivo = this.tipoArchivo
    cargaArchivo.estadoProceso = this.estadoProceso
    cargaArchivo.registrosEncontrados = this.registrosEncontrados
    cargaArchivo.registrosFallidos = this.registrosFallidos
    cargaArchivo.registrosInsertados = this.registrosInsertados
    cargaArchivo.estado = this.estado
    cargaArchivo.empresa = this.empresa
    return cargaArchivo
  }

  public actualizarCargaArchivoConId(estado: number) {
    this.estadoProceso = estado
  }

  @belongsTo(() => Tblarchivos, {
    localKey: 'id',
    foreignKey: 'tipoArchivo'
  })
  public archivo: BelongsTo<typeof Tblarchivos>


  @belongsTo(() => TblEstadoCargas, {
    localKey: 'id',
    foreignKey: 'estadoProceso'
  })
  public estadoCarga: BelongsTo<typeof TblEstadoCargas>




}
