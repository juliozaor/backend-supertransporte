import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { EmpresaVigilado } from 'App/Dominio/Datos/Entidades/EmpresaVigilado';
import { DateTime } from 'luxon';
export class TblEmpresaVigilados extends BaseModel {
  @column({ columnName: 'tev_id' }) public id?: number;
  @column({ columnName: 'tev_empresa' }) public idEmpresa: string;
  @column({ columnName: 'tev_vigilado' }) public idVigilado: string;
  @column({ columnName: 'tev_token' }) public token: string;
  @column({ columnName: 'tev_estado' }) public estado: boolean;
  @column({ columnName: 'tev_fecha_inicial' }) public fechaInicial: Date;
  @column({ columnName: 'tev_fecha_final' }) public fechaFinal: Date;

  @column.dateTime({ autoCreate: true, columnName: 'tev_created_at' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'tev_updated_at' })
  public actualizacion: DateTime
  


  public establecerEmpresaVigilado(empresaVigilado: EmpresaVigilado) {
    this.id = empresaVigilado.id
    this.idEmpresa = empresaVigilado.idEmpresa
    this.idVigilado = empresaVigilado.idVigilado
    this.token = empresaVigilado.token
    this.estado = empresaVigilado.estado
    this.fechaInicial = empresaVigilado.fechaInicial
    this.fechaFinal = empresaVigilado.fechaFinal

  }

  public estableceEmpresaVigiladoConId(empresaVigilado: EmpresaVigilado) {
    this.idEmpresa = empresaVigilado.idEmpresa
    this.idVigilado = empresaVigilado.idVigilado
    this.token = empresaVigilado.token
    this.estado = empresaVigilado.estado
    this.fechaInicial = empresaVigilado.fechaInicial
    this.fechaFinal = empresaVigilado.fechaFinal

  }

  public establecerEstado() {
    this.estado = !this.estado

  }


  public obtenerEmpresaVigilado(): EmpresaVigilado {
    const empresaVigilado = new EmpresaVigilado()
    empresaVigilado.idEmpresa = this.idEmpresa
    empresaVigilado.idVigilado = this.idVigilado
    empresaVigilado.token = this.token
    empresaVigilado.estado = this.estado
    empresaVigilado.fechaInicial = this.fechaInicial
    empresaVigilado.fechaFinal = this.fechaFinal
    return empresaVigilado
  }



}

