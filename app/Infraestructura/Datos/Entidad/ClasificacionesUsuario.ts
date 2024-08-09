
import { DateTime } from 'luxon';
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm';
import { ClasificacionesUsuario } from 'App/Dominio/Datos/Entidades/ClasificacionesUsuario';
import TblClasificaciones from './Clasificaciones';

export default class TblClasificacionesUsuario extends BaseModel {
  public static table = 'tbl_clasificacion_usuarios';
  @column({ isPrimary: true, columnName: 'clu_id' })
  public id?: number

  @column({ columnName: 'clu_usuario_id' }) public usuarioId: string;
  @column({ columnName: 'clu_clasificacion_id' }) public clasificacionId: number;
  @column({ columnName: 'estado' }) public estado: boolean;
  @column({ columnName: 'clu_vehiculos' }) public vehiculos: number;
  @column({ columnName: 'clu_conductores' }) public conductores: number;
  @column({ columnName: 'clu_vigencia' }) public vigencia: number;

  public establecerClasificacionesUsuarioDb(clasificacionesUsuario: ClasificacionesUsuario) {
    this.id = clasificacionesUsuario.id
    this.usuarioId = clasificacionesUsuario.usuarioId
    this.clasificacionId = clasificacionesUsuario.clasificacionId
    this.estado = clasificacionesUsuario.estado
    this.vehiculos = clasificacionesUsuario.vehiculos
    this.conductores = clasificacionesUsuario.conductores
    this.vigencia = clasificacionesUsuario.vigencia
  }

  public estableceClasificacionesUsuarioConId(clasificacionesUsuario: ClasificacionesUsuario) {
    this.usuarioId = clasificacionesUsuario.usuarioId
    this.clasificacionId = clasificacionesUsuario.clasificacionId
    this.estado = clasificacionesUsuario.estado
    this.vehiculos = clasificacionesUsuario.vehiculos
    this.conductores = clasificacionesUsuario.conductores
    this.vigencia = clasificacionesUsuario.vigencia

  }

  public obtenerClasificacionesUsuario(): ClasificacionesUsuario {
    const clasificacionesUsuario = new ClasificacionesUsuario()
    clasificacionesUsuario.usuarioId = this.usuarioId
    clasificacionesUsuario.clasificacionId = this.clasificacionId
    clasificacionesUsuario.estado = this.estado
    clasificacionesUsuario.vehiculos = this.vehiculos
    clasificacionesUsuario.conductores = this.conductores
    clasificacionesUsuario.vigencia = this.vigencia
    return clasificacionesUsuario
  }

  
  @hasOne(() => TblClasificaciones, {
    localKey: 'clasificacionId',
    foreignKey: 'id',
  })
  public clasificacion: HasOne<typeof TblClasificaciones>


}
