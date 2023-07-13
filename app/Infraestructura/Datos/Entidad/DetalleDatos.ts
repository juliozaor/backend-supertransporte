import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
export class TblDetalleDatos extends BaseModel {
  @column({ columnName: 'ddt_id' })
  public id?: number;
  @column({ columnName: 'ddt_dato_indicador_id' })
  public datoIndicadorId: number; 
  @column({ columnName: 'ddt_estado' })
  public estado: boolean; 
  @column({ columnName: 'ddt_valor' })
  public valor: number; 
  @column({ columnName: 'ddt_anio_activo_id' })
  public anioActivoId: number; 
  @column({ columnName: 'ddt_reporte_id' })
  public reporteId: number; 

}

