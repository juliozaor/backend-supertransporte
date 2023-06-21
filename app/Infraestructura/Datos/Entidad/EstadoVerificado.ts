
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { EstadosVerificado } from 'App/Dominio/Datos/Entidades/EstadosVerificado';
export default class TblEstadosVerificado extends BaseModel {
  public static table = 'tbl_estados_verificado';
  @column({ isPrimary: true, columnName: 'esd_id' })
  public id: number

  @column({ columnName: 'esd_nombre' }) public nombre: string;
  @column({ columnName: 'esd_estado' }) public estado: boolean;


 /*  public establecerClasificacionDb(clasificacion: Clasificacion) {
    this.id = clasificacion.id
  }

  public estableceClasificacionConId(clasificacion: Clasificacion) {
  }

  */
public obtenerEstadosVerificado(): EstadosVerificado {
  const estadosVerificado = new EstadosVerificado()
  estadosVerificado.id = this.id
  estadosVerificado.nombre = this.nombre
  estadosVerificado.estado = this.estado
  return estadosVerificado
}

}
