/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { Funcionalidad } from 'App/Dominio/Datos/Entidades/Autorizacion/Funcionalidad';
export default class TblFuncionalidades extends BaseModel {
  public static readonly table = 'tbl_funcionalidades'

  @column({ isPrimary: true, columnName: 'fun_id' }) public id: string

  @column({ columnName: 'fun_nombre' }) public nombre: string

  @column({ columnName: 'fun_estado' }) public estado: boolean

  @column.dateTime({ autoCreate: true, columnName: 'fun_creado' }) public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fun_actualizado' }) public actualizacion: DateTime

  public establecerFuncionalidadDb (rol:Funcionalidad):void{
    this.id = rol.id
    this.nombre = rol.nombre
    this.estado = rol.estado
    this.creacion = rol.creacion;
    this.actualizacion = rol.actualizacion;
  }

  public obtenerRol ():Funcionalidad{
    return new Funcionalidad(
      this.id,
      this.nombre,
      this.estado,
      this.creacion,
      this.actualizacion
    )
  }
}
