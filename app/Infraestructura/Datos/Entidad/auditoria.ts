import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { Auditoria } from 'App/Dominio/Datos/Entidades/Auditoria';
import { DateTime } from 'luxon';

export default class TblAuditorias extends BaseModel {
  public static table = 'tbl_auditorias';
  @column({ isPrimary: true, columnName: 'aud_id' })
  public id?: number

  @column({ columnName: 'aud_accion' }) public accion: string;
  @column({ columnName: 'aud_modulo' }) public modulo: string;
  @column({ columnName: 'aud_json_anterior' }) public jsonAnterior: JSON;
  @column({ columnName: 'aud_json_nuevo' }) public jsonNuevo: JSON;
  @column({ columnName: 'aud_usuario' }) public usuario: string;
  @column({ columnName: 'aud_vigilado' }) public vigilado: string;
  @column({ columnName: 'aud_descripcion' }) public descripcion: string;

  @column.dateTime({ autoCreate: true, columnName: 'aud_fecha_creacion' })
  public creacion: DateTime


  public establecerAuditoriaDb(auditoria: Auditoria) {
    this.id = auditoria.id
    this.accion = auditoria.accion
    this.modulo = auditoria.modulo
    this.jsonAnterior = auditoria.jsonAnterior
    this.jsonNuevo = auditoria.jsonNuevo
    this.usuario = auditoria.usuario
    this.vigilado = auditoria.vigilado
    this.descripcion = auditoria.descripcion
  }

  public estableceAuditoriaConId(auditoria: Auditoria) {
    this.accion = auditoria.accion
    this.modulo = auditoria.modulo
    this.jsonAnterior = auditoria.jsonAnterior
    this.jsonNuevo = auditoria.jsonNuevo
    this.usuario = auditoria.usuario
    this.vigilado = auditoria.vigilado
    this.descripcion = auditoria.descripcion
  }

  public obtenerAuditoria(): Auditoria {
    const auditoria = new Auditoria()
    auditoria.id = this.id 
    auditoria.accion = this.accion 
    auditoria.modulo = this.modulo 
    auditoria.jsonAnterior = this.jsonAnterior 
    auditoria.jsonNuevo = this.jsonNuevo 
    auditoria.usuario = this.usuario 
    auditoria.vigilado = this.vigilado 
    auditoria.descripcion = this.descripcion
    return auditoria
  }



}
