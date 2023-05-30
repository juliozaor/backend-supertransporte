import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import TblFilasColumnas from './FilasColumnas';

export default class TblDetallesClasificaciones extends BaseModel {
  public static table = 'tbl_detalle_clasificaciones';
  @column({ isPrimary: true, columnName: 'tdc_id' })
  public id: number

@column({ columnName: 'tdc_valor' }) public valor:string;
@column({ columnName: 'tdc_fila_columna_id' }) public filaColumnaId:number;
@column({ columnName: 'tdc_usuario_id' }) public usuarioId:number;

/* @belongsTo (() => TblFilasColumnas, {
  localKey: 'id',
  foreignKey: 'filaColumnaId'
})

public detallesFilas: BelongsTo<typeof TblFilasColumnas> */

}
