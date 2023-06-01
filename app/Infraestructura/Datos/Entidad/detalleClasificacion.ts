import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import TblFilasColumnas from './FilasColumnas';
import { DetalleClasificacion } from '../../../Dominio/Datos/Entidades/DetalleClasificacion';

export default class TblDetallesClasificaciones extends BaseModel {
  public static table = 'tbl_detalle_clasificaciones';
  @column({ isPrimary: true, columnName: 'tdc_id' })
  public id?: number

@column({ columnName: 'tdc_valor' }) public valor:string;
@column({ columnName: 'tdc_fila_columna_id' }) public filaColumnaId:number;
@column({ columnName: 'tdc_usuario_id' }) public usuarioId:string;

public establecerDetalleDetalleClasificacionDb (detalleClasificacion:DetalleClasificacion) {
  this.id = detalleClasificacion.id
  this.valor = detalleClasificacion.valor
  this.filaColumnaId = detalleClasificacion.filaColumnaId
  this.usuarioId = detalleClasificacion.usuarioId
}

public estableceDetalleDetalleClasificacionConId (detalleClasificacion:DetalleClasificacion) {
  this.valor = detalleClasificacion.valor
  this.filaColumnaId = detalleClasificacion.filaColumnaId
  this.usuarioId = detalleClasificacion.usuarioId
}

public obtenerDetalleDetalleClasificacion ():DetalleClasificacion {
  const detalleClasificacion = new DetalleClasificacion()
  detalleClasificacion.id = this.id 
  detalleClasificacion.valor = this.valor 
  detalleClasificacion.filaColumnaId = this.filaColumnaId 
  detalleClasificacion.usuarioId = this.usuarioId 
  return detalleClasificacion
}

/* @belongsTo (() => TblFilasColumnas, {
  localKey: 'id',
  foreignKey: 'filaColumnaId'
})

public detallesFilas: BelongsTo<typeof TblFilasColumnas> */

}
