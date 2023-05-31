
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { ReporteI } from 'App/Dominio/Datos/Entidades/Reporte';
import Encuestas from './Encuesta';
import TblUsuarios from './Usuario';

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
  }

  public estableceReporteConId(reporte: ReporteI) {
    this.idEncuesta = reporte.idEncuesta
    this.envioSt = reporte.envioSt
    this.fechaEnviost = reporte.fechaEnviost
    this.usuarioCreacion = reporte.usuarioCreacion
    this.razonSocialRues = reporte.razonSocialRues
    this.nitRues = reporte.nitRues
    this.loginVigilado = reporte.loginVigilado
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

}
