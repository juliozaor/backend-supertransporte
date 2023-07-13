
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasMany, ManyToMany, belongsTo, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import { ReporteI } from 'App/Dominio/Datos/Entidades/Reporte';
import Encuestas from './Encuesta';
import TblUsuarios from './Usuario';
import TblEstadosVerificado from './EstadoVerificado';
import TblEstadoVigilado from './EstadoVigilado';
const { format } = require('date-fns');

export default class Reporte extends BaseModel {
  public static table = 'reporte';

  @column({ isPrimary: true, columnName: 'id_reporte' })
  public id?: number

  @column({ columnName: 'id_encuesta' }) public idEncuesta: number;
  @column({ columnName: 'envio_st' }) public envioSt: string;
  @column({ columnName: 'fecha_enviost' }) public fechaEnviost?: DateTime;
  @column({ columnName: 'usuario_creacion' }) public usuarioCreacion?: string;
  @column({ columnName: 'razon_social_rues' }) public razonSocialRues: string;
  @column({ columnName: 'nit_rues' }) public nitRues: string;
  @column({ columnName: 'login_vigilado' }) public loginVigilado: string;
  @column({ columnName: 'asignado' }) public asignado?: boolean;
  @column({ columnName: 'ultimo_usuario_asignado' }) public ultimoUsuarioAsignado?: string;
  @column({ columnName: 'estado_verificacion_id' }) public estadoVerificacionId?: number;
  @column({ columnName: 'asignador' }) public asignador?: string;
  @column({ columnName: 'fecha_asignacion' }) public fechaAsignacion?: DateTime;
  @column({ columnName: 'anio_vigencia' }) public anioVigencia?: number;

  @column.dateTime({ autoCreate: true , columnName: 'fecha_creacion'}) public fechaCreacion: DateTime

  public establecerReporteDb(reporte: ReporteI) {
    this.id = reporte.id
    this.idEncuesta = reporte.idEncuesta
    this.envioSt = reporte.envioSt
    this.fechaEnviost = reporte.fechaEnviost
    this.usuarioCreacion = reporte.usuarioCreacion
    this.razonSocialRues = reporte.razonSocialRues
    this.nitRues = reporte.nitRues
    this.loginVigilado = reporte.loginVigilado
    this.asignado = reporte.asignado
    this.ultimoUsuarioAsignado = reporte.ultimoUsuarioAsignado
    this.estadoVerificacionId = reporte.estadoVerificacionId
    this.anioVigencia = reporte.anioVigencia
  }

  public estableceReporteConId(reporte: ReporteI) {
    this.idEncuesta = reporte.idEncuesta
    this.envioSt = reporte.envioSt
    this.fechaEnviost = reporte.fechaEnviost
    this.usuarioCreacion = reporte.usuarioCreacion
    this.razonSocialRues = reporte.razonSocialRues
    this.nitRues = reporte.nitRues
    this.loginVigilado = reporte.loginVigilado
    this.asignado = reporte.asignado
    this.ultimoUsuarioAsignado = reporte.ultimoUsuarioAsignado
    this.estadoVerificacionId = reporte.estadoVerificacionId
    this.anioVigencia = reporte.anioVigencia
  }

  public establecerVerificador(asignado: boolean = true, usuarioAsignado: string = '', asignador: string = '') {
    this.asignado = asignado
    this.ultimoUsuarioAsignado = usuarioAsignado
    this.asignador = asignador
    this.fechaAsignacion = (!asignado)?null: format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  public establecerEstadoVerificado(estado: number) {
    this.estadoVerificacionId = estado
  }

 
  public obtenerReporte(): ReporteI {
    const reporte = new ReporteI()
    reporte.id = this.id 
    reporte.idEncuesta = this.idEncuesta 
    reporte.envioSt = this.envioSt 
    reporte.fechaEnviost = this.fechaEnviost 
    reporte.usuarioCreacion = this.usuarioCreacion 
    reporte.razonSocialRues = this.razonSocialRues 
    reporte.nitRues = this.nitRues 
    reporte.loginVigilado = this.loginVigilado 
    reporte.asignado = this.asignado 
    reporte.ultimoUsuarioAsignado = this.ultimoUsuarioAsignado 
    reporte.estadoVerificacionId = this.estadoVerificacionId
    reporte.anioVigencia = this.anioVigencia
    return reporte
  }

  @belongsTo(() => Encuestas, {
    localKey: 'id',
    foreignKey: 'idEncuesta',
  })
  public encuesta: BelongsTo<typeof Encuestas>

  @belongsTo(() => TblUsuarios, {
    localKey: 'usuario',
    foreignKey: 'loginVigilado',
  })
  public usuario: BelongsTo<typeof TblUsuarios>

  @manyToMany(() => TblEstadosVerificado, {
    localKey: 'id',
    pivotForeignKey: 'rev_reporte_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'rev_estado_verificado_id', 
    pivotColumns: ['rev_creacion'],
    pivotTable: 'tbl_reporte_estado_verificados'
  })
  public reporteEstadoVerificado: ManyToMany<typeof TblEstadosVerificado>

  @belongsTo(() => TblEstadoVigilado, {
    localKey: 'id',
    foreignKey: 'estadoVerificacionId',
  })
  public estadoVigilado: BelongsTo<typeof TblEstadoVigilado>

  @belongsTo(() => TblEstadosVerificado, {
    localKey: 'id',
    foreignKey: 'estadoVerificacionId',
  })
  public estadoVerificado: BelongsTo<typeof TblEstadosVerificado>

}
